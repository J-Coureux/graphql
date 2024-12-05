import { checkPath } from "../Function/checkPath.js";

export const getExp = (datas) => {
    let EXPamount = 0
    
    datas.forEach(data => {
        if (checkPath(data.path)) {
            EXPamount += data.amount
        }
    });

    return EXPamount
}