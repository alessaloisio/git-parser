"use strict";

import { resolve } from "path";
import fs from "fs";

export class GitParser {
  constructor(opts = {}) {
    this.path = opts.path || "./.git";
    this.currentBranch = opts.branch || "master";

    this.verifyPath();
  }

  verifyPath() {
    fs.access(this.path, fs.F_OK, err => {
      if (err) {
        console.error(err);
        return;
      }

      console.log("file exist");
    });
  }

  branch() {
    console.log("show branches");
  }

  stage() {
    console.log("show stages");
  }
}

const codeToStatus = function(code) {
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
