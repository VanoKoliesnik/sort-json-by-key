#!/usr/bin/env node

const fs = require("fs");
const commander = require("commander");

const packageJSON = require("./package.json");

const program = new commander.Command();

program
	.version(packageJSON.version, "-v --version", "current installed version")
	.requiredOption("-f, --file-path <type>", "path to JSON file")
	.requiredOption("-k, --key <type>", "key to parse")
	.option("-o, --output <type>", "directory to output");

program.parse(process.argv);

const options = program.opts();

const DEFAULT_OUTPUT_DIR = "./";

const FILE_PATH = options.filePath;
const OUTPUT_DIR = options.output ? options.output : DEFAULT_OUTPUT_DIR;
const KEY = options.key;

console.clear();

console.log("~\n~ Checking file\n~");

if (!fs.existsSync(FILE_PATH)) {
	console.warn("~ File doesn't exist\n~");
	console.log("~ Goodbye!");
	process.exit();
}

async function readFile(filePath) {
	try {
		return await fs.promises.readFile(filePath, "utf8");
	} catch (error) {
		console.warn("~ Ooops.. We have some trouble..\n~");
		console.error(error);
		process.exit();
	}
}

async function writeFile(file, data) {
	try {
		return await fs.promises.writeFile(file, data, "utf8");
	} catch (error) {
		console.warn("~ Ooops.. We have some trouble..\n~");
		console.error(error);
		process.exit();
	}
}

console.log("~ Creating variables\n~");

const valuesByKey = new Map();
const keyList = new Set();

console.log("~ Reading file\n~");

const data = readFile(FILE_PATH);

data.then((data) => {
	let parsedData;
	try {
		console.log("~ Parsing data\n~");
		parsedData = JSON.parse(data);
	} catch (error) {
		console.warn("~ Ooops.. We have some trouble..\n~");
		console.error(error);
		process.exit();
	}
	if (!Array.isArray(parsedData)) {
		console.warn("~ Ooops.. It isn't an array of objects..\n~");
		process.exit();
	}

	console.log("~ Sorting data // It may take a while \n~");

	parsedData.forEach((data) => {
		keyList.add(data[KEY]);

		const currentMap = valuesByKey.get(data[KEY]);

		if (valuesByKey.has(data[KEY])) {
			valuesByKey.set(data[KEY], [...currentMap, data]);
		} else {
			valuesByKey.set(data[KEY], [data]);
		}
	});

	if (keyList.size) {
		if (OUTPUT_DIR !== DEFAULT_OUTPUT_DIR) {
			console.log("~ Checking output dir\n~");
			if (!fs.existsSync(`./${OUTPUT_DIR}`)) {
				fs.mkdirSync(OUTPUT_DIR);
			}
		}
		console.log("~ Checking key list size\n~");

		console.log("~ Writing file _keyList.json\n~");
		writeFile(`./${OUTPUT_DIR}/_keyList.json`, JSON.stringify([...keyList]));

		console.log("~ Writing files [key].json\n~");
		[...keyList].forEach((key) => {
			writeFile(
				`./${OUTPUT_DIR}/${key ? key : "_"}.json`,
				JSON.stringify(valuesByKey.get(key))
			);
		});
	} else {
		console.log("~ Key not found\n~");
	}

	console.log("~ All tasks completed:");
	console.log("~ JSON parsed, data sorted, files created, you are cool!");
});
