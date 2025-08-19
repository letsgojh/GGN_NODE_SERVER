import { existsSync,readdirSync } from "fs";
import { join ,dirname} from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const JSON_DIR = join(__dirname,"../domain/json");

export function fileExists(fileName:string): boolean{
  const ensured = fileName.endsWith(".json") ? fileName : `${fileName}.json`;
  const fullPath = join(JSON_DIR,ensured);
  console.log("파일 경로 확인: ",fullPath);
  return existsSync(fullPath);
}

export function fileInDir(fileName: string):boolean{
  try{
    return readdirSync(JSON_DIR).includes(fileName);
  }catch(err){
    return false;
  }
}