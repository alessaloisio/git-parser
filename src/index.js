"use strict";

import { resolve } from "path";
import { readFileSync, readdirSync } from "fs";
import zlib from "zlib";

export class GitParser {
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

  stage() {
    return this.recursiveStage(this.lastCommit);
  }

  recursiveStage(commit, result = {}) {
    const objectDir = commit.slice(0, 2);
    const objectFile = commit.slice(2);

    const content = decryptFile(
      resolve(this.path, "objects", objectDir, objectFile)
    );

    console.log(content);
    if (content.commit.length > 0) {
      this.recursiveStage(content.commit, result);
    }

    return result;
  }
}

const getFileContent = (path, str = true) => {
  let buf;

  try {
    buf = readFileSync(path);
  } catch (e) {
    throw new Error(`"${path}" file not found.`);
  }

  return str ? buf.toString() : buf;
};

const getFilesDir = path => {
  let files;

  try {
    files = readdirSync(path);
  } catch (e) {
    throw new Error(`"${path}" not file found.`);
  }

  return files;
};

const decryptFile = path => {
  const obj = {};
  const compressed = getFileContent(path, false);
  const content = zlib.inflateSync(compressed).toString();

  console.log("content decrypted", content);
  obj.commit = getCommit(content);

  return obj;
};

const getCommit = content => {
  const regex = /commit (?<status>.+) (?<commit>\w+)/;
  const matchObj = content.match(regex);
  return matchObj !== null ? matchObj.groups.commit : "";
};

const codeToStatus = code => {
  const map = {
    A: "Added",
    C: "Copied",
    D: "Deleted",
    M: "Modified",
    R: "Renamed",
    T: "Type-Change",
    U: "Unmerged",
    X: "Unknown",
    B: "Broken"
  };

  return map[code.charAt(0)];
};
