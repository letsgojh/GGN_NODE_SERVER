// LoadJson.ts
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
/**
 * ESM 환경에서 __dirname 대체
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
/**
 * util/jsonParser 기준으로 ../../domain/json 이 실제 읽기 디렉터리
 */
const JSON_DIR = join(__dirname, "../../domain/json");
/**
 * 파일명으로부터 JSON 문자열을 읽어온다.
 * - fileName은 ".json" 유무 상관없이 입력 가능 (없으면 자동으로 붙임)
 */
export function loadJson(fileName) {
    const ensured = fileName.endsWith(".json") ? fileName : `${fileName}.json`;
    const filePath = join(JSON_DIR, ensured);
    return readFileSync(filePath, { encoding: "utf-8" });
}
