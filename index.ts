import { argv } from "process";

const day = argv[2];
const part = argv[3];
const inputFile = argv[4] ?? "input";
const importPath = `${import.meta.dir}/days/${day}`;

const dayModule = await import(importPath);

const inputLines = await Bun.file(`${importPath}/${inputFile}`).text();
console.log(dayModule[`part${part}`](inputLines));
