import { Router } from 'express';
import { getPopPerStore, getIncomePerPop, getFloatPopPerStore, getCompanyPopPerStore, getResidentPopPerStore, getIncomePerFloatPop, getIncomePerCompanyPop, getIncomePerResidentPop, getIndustry, getMarketCountCommercial, getMarketCountHinterland, getEstimateIncomeCommercial, getEstimateIncomeHinterland, postMarketCountCommercial, postMarketCountHinterland, postEstimateIncomeCommercial, postEstimateIncomeHinterland, getIncomePerLent } from '../controllers/commonController.js';
const router = Router();
//대분류 업종에 소분류 업종 어떤 것이 있는지 알고싶다면
router.get('/category', getIndustry);
//대분류 업종별 점포수(상권) post
router.post('/marketCountCommercial', postMarketCountCommercial);
//대분류 업종별 점포수(상권배후지) post
router.post('/marketCountHinterland', postMarketCountHinterland);
//대분류 업종별 추정매출(상권) post
router.post('/estimateIncomeCommercial', postEstimateIncomeCommercial);
//대분류 업종별 추정매출(상권배후지) post
router.post('/estimateIncomeHinterland', postEstimateIncomeHinterland);
//대분류 업종별 점포수(상권) get
router.post('/marketCountCommercial', getMarketCountCommercial);
//대분류 업종별 점포수(상권배후지) get
router.post('/marketCountHinterland', getMarketCountHinterland);
//대분류 업종별 추정매출(상권) get
router.post('/estimateIncomeCommercial', getEstimateIncomeCommercial);
//대분류 업종별 추정매출(상권배후지) get
router.post('/estimateIncomeHinterland', getEstimateIncomeHinterland);
//유동인구 수 / 점포수 반환
router.get('/floatPopPerStore', getFloatPopPerStore);
//직장인구 수 / 점포수 반환
router.get('/companyPopPerStore', getCompanyPopPerStore);
//상주인구 수 / 점포수 반환
router.get('/residentPopPerStore', getResidentPopPerStore);
//인구(유동,직장,상주)인구 수 / 점포수 반환
router.get('/popPerStore', getPopPerStore);
//추정매출 / 유동 인구 수 반환
router.get('/incomePerFloatPop', getIncomePerFloatPop);
//추정매출 / 직장 인구 수 반환
router.get('/incomePerCompanyPop', getIncomePerCompanyPop);
//추정매출 / 상주 인구 수 반환
router.get('/incomePerResidentPop', getIncomePerResidentPop);
//추정매출 / 인구 수 반환
router.get('/incomePerPop', getIncomePerPop);
//추정매출 / 임대료 반환
router.get('/incomePerLent', getIncomePerLent);
//임대료 api와 전체 호출 api 추가해야함
export default router;
