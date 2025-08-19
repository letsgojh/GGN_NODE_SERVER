function replacer(_key, value) {
    if (value instanceof Map) {
        return {
            __type: "Map",
            value: Array.from(value.entries())
        };
    }
    return value;
}
export function mapToJson(map) {
    return JSON.stringify({
        __type: "Map",
        value: Array.from(map.entries()),
    }, replacer, 2);
}
