"use strict";

const path = require("path");

class GitParser {
  constructor(opts = {}) {
    this.path = opts.path || "./.git";
    this.currentBranch = opts.branch || "master";

    this.verifyPath();
  }

  verifyPath() {
    console.log(this.path);
  }

  branch() {
    console.log("show branches");
  }

  stage() {
    console.log("show stages");
  }
}

module.exports = GitParser;
