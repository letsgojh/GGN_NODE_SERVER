function reviver(_key, value) {
    if (value && value.__type == "Map") {
        return new Map(value.value.map(([k, v]) => [k, v]));
    }
    return value;
}
export function jsonToMap(jsonString) {
    return JSON.parse(jsonString, reviver);
}
