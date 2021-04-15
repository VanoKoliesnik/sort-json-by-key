const fs = require("fs");

const FILE_NAME = "city-list.json";
const OUTPUT_DIR = "country";
const KEY = "country";

async function readFile(filePath) {
	try {
		return await fs.promises.readFile(filePath, "utf8");
	} catch (error) {
		console.error(error);
	}
}

async function writeFile(file, data) {
	try {
		return await fs.promises.writeFile(file, data, "utf8");
	} catch (error) {
		console.error(error);
	}
}

const valuesByKey = new Map();
const keyList = new Set();

const data = readFile(FILE_NAME);

data.then((data) => {
	JSON.parse(data).forEach((data) => {
		keyList.add(data[KEY]);

		const currentMap = valuesByKey.get(data[KEY]);

		if (valuesByKey.has(data[KEY])) {
			valuesByKey.set(data[KEY], [...currentMap, data]);
		} else {
			valuesByKey.set(data[KEY], [data]);
		}
	});

	if (!fs.existsSync(`./${OUTPUT_DIR}`)) {
		fs.mkdirSync(OUTPUT_DIR);
	}

	writeFile(`./${OUTPUT_DIR}/_keyList.json`, JSON.stringify([...keyList]));

	[...keyList].forEach((key) => {
		writeFile(
			`./${OUTPUT_DIR}/${key ? key : "_"}.json`,
			JSON.stringify(valuesByKey.get(key))
		);
	});
});
