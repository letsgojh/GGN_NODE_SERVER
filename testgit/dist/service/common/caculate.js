export async function judgeByCondition(number) {
    if (number > 1.3) {
        return "유리";
    }
    else if (number >= 1.1 && number <= 1.3) {
        return "적정";
    }
    else {
        return "불리";
    }
}
/*
async function main(){
    const tmp1 : any = await calculateGrade_marketCount_by_Pop("종로구","부암동","자하문터널")
    console.log(`지역 인구 포화도 / 상권 인구 포화도 : ${JSON.stringify(tmp1,null,2)}`)
}
main()
*/ 
