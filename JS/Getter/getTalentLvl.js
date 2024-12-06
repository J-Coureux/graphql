import { checkPaht2 } from "../Function/checkPath.js"


export const GetTalentLvl = (datas) => {
    const res = {}

    for (let i = 1; i <= 128; i++) {
        res[i] = 0

        for (let y = 0; y < datas.length; y++) {
            if (datas[y].level === i) {
                if (checkPaht2(datas[y].event.path)) {
                    res[i] = res[i]+1
                }
            }
        }
    }

    return res
}