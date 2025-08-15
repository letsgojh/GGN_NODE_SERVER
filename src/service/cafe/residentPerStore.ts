import { calcPerStoreMetrix, residentNumerator, AreaFilter } from '../common/index.ts';
import { CAFE_SVC } from './svcCode.ts';

export function residentPerStoreCafe(area: AreaFilter) {
  return calcPerStoreMetrix({ area, svcCode: CAFE_SVC, numeratorFetcher: residentNumerator });
}
