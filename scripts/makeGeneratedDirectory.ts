import {mkdirSync} from "node:fs";
import * as process from "node:process";
import {posix as path} from "path";

mkdirSync(path.join(process.cwd(), "src", "generated"))
