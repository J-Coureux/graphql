import { checkPath } from "../Function/checkPath.js"

export const getLvl = (datas) => {
    let lvl = 0

    datas.forEach(data => {
        // check if the row of the data sent has a value "level" inside the property type (in this case : transaction { type })
        // && if the property ammount is superior than the lvl variable
        // && check the value of the property path, to see if it has a correct path
        if (data.type === "level" && data.amount > lvl && checkPath(data.path)) {
            lvl = data.amount
        }
    })
    return lvl
}