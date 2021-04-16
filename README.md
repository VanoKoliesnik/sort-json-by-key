# sort-json-by-key
This script will help you parse JSON file by key and sort it to separate files like [key].json. :scroll:

## Example
Imagine you have a file, named `city-list.json`, which contain an array of objects like this:
```json
[
    {
        "id": 3036216,
        "name": "Auga",
        "country": "FR"
    },
    {
        "id":2509475,
        "name":"Villatobas",
        "country":"ES"
    },
    {
        "id":3127817,
        "name":"Bordalba",
        "country":"ES"
    },
    {
        "id":6295630,
        "name":"Earth"
    }
]
```
... and we need to get separate files by  key's value.

`FR.json`
```json
[
    {
        "id": 3036216,
        "name": "Auga",
        "country": "FR"
    }
]
```

`ES.json`
```json
[
    {
        "id":2509475,
        "name":"Villatobas",
        "country":"ES"
    },
    {
        "id":3127817,
        "name":"Bordalba",
        "country":"ES"
    }
]
```

For additional this script will create two files

`_.json` for not found values
```json
[
    {
        "id":6295630,
        "name":"Earth"
    }
]
```

`_keyList.json`
```json
["FR","ES",null]
```

## Installation
```bash
npm i -g sort-json-by-key
```

## Usage
List of all commands
```bash
sort-json-by-key --help
```
Basic usage. Flag `--output` is optional
```bash
sort-json-by-key --file-path <filePath> --key <key> 
```
Extended usage
```bash
sort-json-by-key --file-path <filePath> --key <key> --output <outputDir>
```

## Important 
:warning: Flag `--output` is not required and if it won't be passed, script will execute all outputs in current directory.

## License
<a href="https://github.com/VanoKoliesnik/sort-json-by-key/blob/master/LICENSE" target="_blank">ISC</a> © 2021 VanoKoliesnik