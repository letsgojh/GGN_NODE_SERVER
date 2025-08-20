function replacer(_key:any, value:any){
  if(value instanceof Map){
    return {
      __type:"Map",
      value: Array.from(value.entries())
    };
  }
  return value;
}


export function mapToJson<K,V>(map:Map<K,V>):string{
  return JSON.stringify({
    __type:"Map",
    value: Array.from(map.entries()),

  },
replacer,2);
}