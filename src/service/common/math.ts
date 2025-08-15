/**
 * 평균구하는것과 소수점 반올림을 위한 함수들
 * 
 */


export const getAverage = (numbers: number[]): number => {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

export const round=(value: number, decimals: number): number => {
  if (decimals < 0) {
    throw new Error("Decimals must be a non-negative integer");
  }
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}