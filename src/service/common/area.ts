export type AreaFilter = {
  gu?: string; // 구 이름
  dong?: string; // 동 이름
  trdarName?: string; // 상권 이름
}

const has = (s? : string)=> (v?: string) =>!s || (v? v.includes(s):false);
export function makeNameSelectors(area: AreaFilter) {
  const { gu, dong, trdarName } = area;
  const inRegion=(name?: string) => {
    return (dong ? has(dong)(name) : gu?has(gu)(name) : true);
  }
  const inInterest = (name?: string) =>
      (trdarName ? has(trdarName)(name): true) || 
      (!trdarName && dong && has(dong)(name)) ||
      (!trdarName && !dong && gu && has(gu)(name))||
      (!trdarName && !dong && !gu);
  return {
    inRegion,
    inInterest,
  };
}