export type Label = '유리' | '보통' | '불리';

export function getLabel(value: number): Label {
  if (value < 0.9) {
    return '불리';
  } else if (value >=1.3) {
    return '유리';
  } else {
    return '보통';
  }
}