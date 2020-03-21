"use strict";

import { resolve } from "path";
import { inflateSync } from "zlib";

import { getFileContent, getFilesDir } from "../libs/files";
import { mode2type } from "./type";
import GitDiff from "./GitDiff";

export default class GitParser {
  constructor(opts = {}) {
    this.path = opts.path || "./.git";
    this.selectedBranch = opts.branch || "master";

    this.HEAD = this.getHead();
    this.lastCommit = this.getLastCommit();
  }

  getHead() {
    const content = getFileContent(resolve(this.path, "HEAD"));
    return content.trim().slice(content.lastIndexOf("/") + 1);
  }

  getLastCommit() {
    return getFileContent(
      resolve(this.path, "refs/heads", this.selectedBranch)
    ).trim();
  }

  branch() {
    return getFilesDir(resolve(this.path, "refs/heads"));
  }

  stage(commit = null) {
    const currentStage = this.recursiveObject(
      commit ? commit : this.lastCommit
    );

    currentStage.present = {
      commit: currentStage.present,
      files: this.recursiveObject(currentStage.present)
    };

    return currentStage;
  }

  diff() {
    const currentStage = this.stage();

    currentStage.parent = {
      commit: currentStage.parent,
      files: { ...this.stage(currentStage.parent).present.files }
    };

    return new GitDiff(currentStage.present, currentStage.parent);
  }

  recursiveObject(commit) {
    const objectDir = commit.slice(0, 2);
    const objectFile = commit.slice(2);

    const file = resolve(this.path, "objects", objectDir, objectFile);
    const content = this.decryptFile(file);

    return content;
  }

  decryptFile(path) {
    const buffer = inflateSync(getFileContent(path, false));
    const type = buffer.slice(0, buffer.indexOf(32)).toString("utf8");
    const content = buffer.slice(buffer.indexOf(0) + 1);

    let obj = {};

    switch (type) {
      case "commit":
        obj = this.parseCommit(content.toString("utf8"));
        break;
      case "tree":
        obj = this.parseTree(content.toString("hex"));
        break;
      case "blob":
        obj = content.toString();
        break;
      default:
        return null;
    }

    return obj;
  }

  parseCommit(content) {
    const regex = /tree (?<tree>\w*)\s?parent (?<parent>\w*)\s?author (?<author>[\w _\-<>@.]*>).*\s?committer (?<committer>[\w _\-<>@.]*>).*\n\n(?<message>.*)/;
    const matchObj = content.match(regex);

    const obj = {};

    obj.present = matchObj.groups.tree;
    obj.parent = matchObj.groups.parent;
    obj.author = matchObj.groups.author;
    obj.committer = matchObj.groups.committer;
    obj.message = matchObj.groups.message;

    return obj;
  }

  parseTree(content) {
    const regex = /(?<mode>\w*?)20(?<file>\w*?)00(?<oid>\w{40})/g;

    const result = {};

    Array.from(content.matchAll(regex), match => {
      const obj = {};

      obj.mode = Buffer.from(match.groups.mode, "hex").toString("utf8");
      if (obj.mode === "40000") obj.mode = 0 + obj.mode;

      obj.type = mode2type(obj.mode);
      obj.file = Buffer.from(match.groups.file, "hex").toString("utf8");
      obj.oid = match.groups.oid;

      switch (obj.type) {
        case "tree":
          obj.files = this.recursiveObject(obj.oid);
          break;
        case "blob":
          obj.content = this.recursiveObject(obj.oid);
          break;
      }

      result[obj.file] = obj;
    });

    return result;
  }
}
