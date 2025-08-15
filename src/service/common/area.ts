// src/service/common/area.ts
/**
 * 지역 필터 타입 정의 및 유틸리티 함수
 * 
 * AreaFilter 타입은 구, 동, 상권 이름을 선택적으로 포함할 수 있습니다.
 * makeNameSelectors 함수는 주어진 지역 필터에 따라 이름을 필터링
 * */

export type AreaFilter = {
  gu?: string | undefined; // 구 이름
  dong?: string | undefined; // 동 이름
  trdarName?: string | undefined; // 상권 이름
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