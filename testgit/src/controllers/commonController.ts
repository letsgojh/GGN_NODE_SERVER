import { Request, Response } from 'express';
import {calculateGrade,Grade} from '../service/common/calculateGrade.ts'
import {getSaturation} from '../service/common/saturation.ts'
import {getConsume} from '../service/common/consume.ts'
import { getCategory,Category } from '../domain/industry/category.ts';
import { IncomePerRentService } from '../service/common/RentPerIncome.ts';
/**
 * GET 
 * - description : 인구수(유동,직장,상주) / 점포수 들고오는 메서드
 * - gu,dong,name 형태의 쿼리로 request 구성
 * - svcCode : 점포수 집계에 적용할 업종 코드(카페/편의점 등)
 */

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

export async function getResidentPopPerStore(req : Request, res : Response){
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

export async function getIncomePerRent(req: Request, res:Response){
    try{
        const{ gu,industry} = req.query as{
            gu: string;
            industry: string;
        }
        const ans: number = await IncomePerRentService(gu);
        res.json(ans);
    }catch(err){
        if(err){
            console.error('등급 판정 중 오류, 오류 메세지 : ',err);
            throw err;
        }
    }
}