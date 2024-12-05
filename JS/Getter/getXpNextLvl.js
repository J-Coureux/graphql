import { EXPUnity } from "../Const/EXPUnity.js"

export const getXpNextLvl = (nextLevel, rounded) => {
    let res = ''

    for (let i = 0; i < EXPUnity.length; i++) {
        if (i < EXPUnity.length-1) {
            if (nextLevel/(1000**i) > 1 && nextLevel/(1000**i) < 1000) {
                if (nextLevel/(1000**i) < 100) {
                    res = `${(nextLevel/(1000**i)).toFixed(rounded)} ${EXPUnity[i]}`
                } else {
                    res = `${(nextLevel/(1000**i)).toFixed(rounded - 1)} ${EXPUnity[i]}`
                }
            }
        } else {
            if (nextLevel/(1000**i) > 1) {
                if (nextLevel/(1000**i) < 100) {
                    res = `${(nextLevel/(1000**i)).toFixed(rounded)} ${EXPUnity[i]}`
                } else {
                    res = `${(nextLevel/(1000**i)).toFixed(rounded - 1)} ${EXPUnity[i]}`
                }
            }
        }
    }
    return res
}