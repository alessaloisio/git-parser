"use strict";

export default class GitDiff {
  constructor(current, previous) {
    this.current = current;
    this.previous = previous;
    this.diff = detectDiff(this.current, this.previous);
  }

  find(path = "/") {
    return recursiveFind(this.diff, path.split(".").reverse());
  }
}

const detectDiff = (current, prev, i = 0) => {
  const result = {};

  Object.keys(current.files).map(file => {
    const c = current.files[file];
    const p = prev.files[file];

    switch (c.type) {
      case "blob":
        if (p) {
          if (c.content !== p.content) {
            c.status = "M";
            result[file] = c;
          }
          delete prev.files[file];
        } else {
          c.status = "NF";
          result[file] = c;
        }
        break;
      case "tree":
        if (p) {
          const diff = detectDiff(c, p, i + 1);
          if (Object.keys(diff).length > 0) {
            result[file] = diff;
          } else {
            delete prev.files[file];
          }
        } else {
          result[file] = c.files;
        }
        break;
    }
  });

  if (i === 0) appendWithStatus(result, prev.files, "R");

  return result;
};

const appendWithStatus = (target, obj, status) => {
  Object.keys(obj).map(file => {
    if (obj[file].type === "tree") {
      if (typeof target[file] === "undefined") target[file] = {};
      appendWithStatus(target[file], obj[file].files, status);
    } else {
      obj[file].status = status;
      target[file] = obj[file];
    }
  });
};

const recursiveFind = (obj, path) => {
  const dir = path.pop();
  const element = obj[dir];

  if (element) {
    if (path.length > 0) {
      const result = recursiveFind(element, path);
      if (result) return result;
    } else {
      return element;
    }
  }

  return false;
};
