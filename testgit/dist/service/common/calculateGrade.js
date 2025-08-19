import { judgeByCondition } from './caculate.js';
export async function calculateGrade(auto, admin, name, func) {
    //const tmp : getTotalPopPerStore_Param = await getSaturation(auto,admin,name)
    const tmp = func;
    let ans = {
        float: "",
        company: "",
        resident: ""
    };
    ans.float = await judgeByCondition(tmp.TOTAL_FLOATING_POP_PER_STORE);
    ans.company = await judgeByCondition(tmp.TOTAL_COMPANY_POP_PER_STORE);
    ans.resident = await judgeByCondition(tmp.TOTAL_RESIDENT_POP_PER_STORE);
    console.log(ans.float);
    console.log(ans.company);
    console.log(ans.resident);
    return ans;
}
