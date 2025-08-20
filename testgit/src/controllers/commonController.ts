import { Request, Response } from 'express';
<<<<<<< HEAD
import {calculateGrade,Grade} from '../service/common/calculateGrade.ts'
import {getSaturation} from '../service/common/saturation.ts'
import {getConsume} from '../service/common/consume.ts'
=======
import {calculateGrade_Income, calculateGrade_Pop,Grade_Income,Grade_Pop} from '../service/common/calculateGrade.ts'
import {getSaturation} from '../service/common/saturation.ts'
import {getConsume} from '../service/common/consume.ts'
import { IncomePerRentService } from '../service/common/RentPerIncome.ts';
>>>>>>> fabc089f1f5ac97fc7ad2816dc0559a771749ede

/**
 * GET 
 * - description : 인구수(유동,직장,상주) / 점포수 들고오는 메서드
 * - gu,dong,name 형태의 쿼리로 request 구성
 * - svcCode : 점포수 집계에 적용할 업종 코드(카페/편의점 등)
 */
export async function getPopPerStore(req : Request, res : Response){
    try{
        const {gu, dong, name} = req.query as {
            gu : string;
            dong: string;
            name : string;
        }
<<<<<<< HEAD
        const ans : Grade = await calculateGrade(gu,dong,name,await getSaturation(gu,dong,name))
=======
        const ans : Grade_Pop = await calculateGrade_Pop(gu,dong,name,await getSaturation(gu,dong,name))
>>>>>>> fabc089f1f5ac97fc7ad2816dc0559a771749ede
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
        }
<<<<<<< HEAD
        const ans : Grade = await calculateGrade(gu,dong,name,await getConsume(gu,dong,name))
=======
        const ans : Grade_Pop = await calculateGrade_Pop(gu,dong,name,await getConsume(gu,dong,name))
>>>>>>> fabc089f1f5ac97fc7ad2816dc0559a771749ede
        res.json(ans)
    }catch(err){
        if(err){
            console.error('등급 판정 중 오류, 오류 메세지 : ', err)
            throw err
        }
    }
<<<<<<< HEAD
}
=======
}

export async function getIncomePerRentService(req : Request, res : Response){
    try{
        const {gu} = req.query as {
            gu : string
        }
        const ans : Grade_Income = await calculateGrade_Income(await IncomePerRentService(gu))
        res.json(ans)
    }catch(err){
        if(err){
            console.error('등급 판정 중 오류, 오류 메세지 : ', err)
            throw err
        }
    }
}
>>>>>>> fabc089f1f5ac97fc7ad2816dc0559a771749ede
