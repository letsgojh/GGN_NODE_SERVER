import { Request, Response } from 'express';
import {calculateGrade,Grade} from '../service/common/calculateGrade.ts'
import {getSaturation} from '../service/common/saturation.ts'
import {getConsume} from '../service/common/consume.ts'
import { getCategory,Category } from '../service/common/industry/category.ts';
import { pushSummationMarketCount_commercial, 
    pushSummationMarketCount_hinterland,
 } from '../service/common/bigData/marketCount.ts';

 import { pushSummationEstimateIncome_commercial, 
    pushSummationEstimateIncome_hinterland,
 } from '../service/common/bigData/estimateIncome.ts';
import { displayPartsToString } from 'typescript';
/**
 * GET 
 * - description : 인구수(유동,직장,상주) / 점포수 들고오는 메서드
 * - gu,dong,name 형태의 쿼리로 request 구성
 * - svcCode : 점포수 집계에 적용할 업종 코드(카페/편의점 등)
 */

let cache : any = null;

export async function getMarketCountCommercial(req : Request , res : Response){
  if (!cache) return res.status(404).json({ message: "데이터 없음" });
    res.json(cache)
}

export async function getMarketCountHinterland(req : Request , res : Response){
      if (!cache) return res.status(404).json({ message: "데이터 없음" });
/*
  // Object → Map 복원
  const restored = cache.map((m: any) => ({
    districtName: m.districtName,
    list: new Map(Object.entries(m.list)),
    }))*/
   res.json(cache)
}
export async function getEstimateIncomeCommercial(req : Request , res : Response){
      if (!cache) return res.status(404).json({ message: "데이터 없음" });
    res.json(cache)
}
export async function getEstimateIncomeHinterland(req : Request , res : Response){
      if (!cache) return res.status(404).json({ message: "데이터 없음" });
    res.json(cache)
}


export async function postMarketCountCommercial(req : Request , res : Response){
  const result = await pushSummationMarketCount_commercial();

  // Map → Object 변환 (JSON 직렬화용)
  const jsonReady = result.map(r => ({
    districtName: r.districtName,
    list: Object.fromEntries(r.list),
  }));

  cache = jsonReady; // JSON 형태로 저장
  res.json({ message: "저장 완료", data: jsonReady });
}

export async function postMarketCountHinterland(req : Request , res : Response){
  const result = await pushSummationMarketCount_hinterland();

  // Map → Object 변환 (JSON 직렬화용)
  const jsonReady = result.map(r => ({
    districtName: r.districtName,
    list: Object.fromEntries(r.list),
  }));

  cache = jsonReady; // JSON 형태로 저장
  res.json({ message: "저장 완료", data: jsonReady });
}
export async function postEstimateIncomeCommercial(req : Request , res : Response){
      const result = await pushSummationEstimateIncome_commercial();

  // Map → Object 변환 (JSON 직렬화용)
  const jsonReady = result.map(r => ({
    districtName: r.districtName,
    list: Object.fromEntries(r.list),
  }));

  cache = jsonReady; // JSON 형태로 저장
  res.json({ message: "저장 완료", data: jsonReady });
}
export async function postEstimateIncomeHinterland(req : Request , res : Response){
          const result = await pushSummationEstimateIncome_hinterland();

  // Map → Object 변환 (JSON 직렬화용)
  const jsonReady = result.map(r => ({
    districtName: r.districtName,
    list: Object.fromEntries(r.list),
  }));

  cache = jsonReady; // JSON 형태로 저장
  res.json({ message: "저장 완료", data: jsonReady });
}

//대분류 업종을 넣으면 소분류 리스트로 반환
//ex) "오락" 넣으면 [당구장,골프장,볼링장..] 반환
export async function getIndustry(req : Request, res : Response){
    try{
        const {category} = req.query as {
            category : string;
        }
        const ans : Category | null = await getCategory(category)
        //res.json(ans)
        res.send(ans)
    }catch(err){
        if(err){
            console.error('업종 매핑 중 오류 메시지 : ', err)
            throw err
        }
    }
}

export async function getFloatPopPerStore(req : Request, res : Response){
    try{
        const {gu, dong, name, industry} = req.query as {
            gu : string;
            dong: string;
            name : string;
            industry : string;
        }
        const ans : Grade = await calculateGrade(gu,dong,name,await getSaturation(gu,dong,name,industry))
        res.json(ans)
    }catch(err){
        if(err){
            console.error('등급 판정 중 오류, 오류 메세지 : ', err)
            throw err
        }
    }
}

export async function getCompanyPopPerStore(req : Request, res : Response){
    try{
        const {gu, dong, name} = req.query as {
            gu : string;
            dong: string;
            name : string;
            industry : string;
        }
        const ans : Grade = await calculateGrade(gu,dong,name,await getSaturation(gu,dong,name))
        res.json(ans)
    }catch(err){
        if(err){
            console.error('등급 판정 중 오류, 오류 메세지 : ', err)
            throw err
        }
    }
}

export async function getResidentPopPerStore(req : Request, res : Response){
    try{
        const {gu, dong, name} = req.query as {
            gu : string;
            dong: string;
            name : string;
            industry : string;
        }
        const ans : Grade = await calculateGrade(gu,dong,name,await getSaturation(gu,dong,name))
        res.json(ans)
    }catch(err){
        if(err){
            console.error('등급 판정 중 오류, 오류 메세지 : ', err)
            throw err
        }
    }
}


export async function getPopPerStore(req : Request, res : Response){
    try{
        const {gu, dong, name,industry} = req.query as {
            gu : string;
            dong: string;
            name : string;
            industry : string;
        }
        const ans : Grade = await calculateGrade(gu,dong,name,await getSaturation(gu,dong,name,industry))
        res.json(ans)
    }catch(err){
        if(err){
            console.error('등급 판정 중 오류, 오류 메세지 : ', err)
            throw err
        }
    }
}

export async function getIncomePerFloatPop(req : Request, res : Response){
    try{
        const {gu, dong, name} = req.query as {
            gu : string;
            dong: string;
            name : string;
            industry : string;

        }
        const ans : Grade = await calculateGrade(gu,dong,name,await getConsume(gu,dong,name))
        res.json(ans)
    }catch(err){
        if(err){
            console.error('등급 판정 중 오류, 오류 메세지 : ', err)
            throw err
        }
    }
}
export async function getIncomePerCompanyPop(req : Request, res : Response){
    try{
        const {gu, dong, name} = req.query as {
            gu : string;
            dong: string;
            name : string;
            industry : string;

        }
        const ans : Grade = await calculateGrade(gu,dong,name,await getConsume(gu,dong,name))
        res.json(ans)
    }catch(err){
        if(err){
            console.error('등급 판정 중 오류, 오류 메세지 : ', err)
            throw err
        }
    }
}
export async function getIncomePerResidentPop(req : Request, res : Response){
    try{
        const {gu, dong, name} = req.query as {
            gu : string;
            dong: string;
            name : string;
            industry : string;

        }
        const ans : Grade = await calculateGrade(gu,dong,name,await getConsume(gu,dong,name))
        res.json(ans)
    }catch(err){
        if(err){
            console.error('등급 판정 중 오류, 오류 메세지 : ', err)
            throw err
        }
    }
}

export async function getIncomePerPop(req : Request, res : Response){
    try{
        const {gu, dong, name} = req.query as {
            gu : string;
            dong: string;
            name : string;
            industry : string;

        }
        const ans : Grade = await calculateGrade(gu,dong,name,await getConsume(gu,dong,name))
        res.json(ans)
    }catch(err){
        if(err){
            console.error('등급 판정 중 오류, 오류 메세지 : ', err)
            throw err
        }
    }
}