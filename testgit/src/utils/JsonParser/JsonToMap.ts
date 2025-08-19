function reviver(_key: any, value: any){
  if(value && value.__type == "Map"){
    return new Map(value.value.map(([k,v]:[any,any])=>[k,v]))
  }
  return value;
}

export function jsonToMap<K,V>(jsonString:string):Map<K,V>{
  return JSON.parse(jsonString,reviver);
}