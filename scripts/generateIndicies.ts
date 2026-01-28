import {posix as path} from "path";
import * as fs from "fs/promises"

const ROOT_DIR = path.join(process.cwd(), "src");
const PRIVATE_ANNOTATION = "@private"

async function getAllChildDirectories(directory: string) {
  const stuff = await fs.readdir(directory)
  const results: string[] = [];
  for (const thing of stuff) {
    const thingFullPath = path.join(directory, thing);
    if ((await fs.lstat(thingFullPath)).isDirectory()) {
      results.push(thingFullPath)
    }
  }
  return results;
}

function isLinePrivate(lines: string[], lineNumber: number) {
  return lines[lineNumber - 1].includes(PRIVATE_ANNOTATION);
}

function isLineExport(lines: string[], lineNumber: number) {
  return lines[lineNumber].startsWith("export");
}

const identifierPattern = /.*\s([\S]+)\s?[:=]/
function getIdentifier(file: string, line: string) {
  const matches = line.match(identifierPattern)
  if (!matches) {
    throw new Error(`Unable to get identifier for ${file}:${line}`)
  }
  return matches[1];
}
