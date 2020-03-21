"use strict";

import { readFileSync, readdirSync } from "fs";

export const getFileContent = (path, str = true) => {
  let buf;

  try {
    buf = readFileSync(path);
  } catch (e) {
    throw new Error(`"${path}" file not found.`);
  }

  return str ? buf.toString() : buf;
};

export const getFilesDir = path => {
  let files;

  try {
    files = readdirSync(path);
  } catch (e) {
    throw new Error(`"${path}" not file found.`);
  }

  return files;
};
