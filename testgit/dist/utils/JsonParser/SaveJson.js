import { mkdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const JSON_DIR = join(__dirname, "../../domain/json");
export function saveJson(fileName, jsonString) {
    mkdirSync(JSON_DIR, { recursive: true });
    const ensured = fileName.endsWith(".json") ? fileName : `${fileName}.json`;
    const filePath = join(JSON_DIR, ensured);
    writeFileSync(filePath, jsonString, { encoding: "utf-8" });
}
;
