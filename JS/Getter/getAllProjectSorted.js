import { checkPath } from "../Function/checkPath.js";

export const getAllProjectSorted = (datas) => {
    const allEndProject = []

    datas.forEach(data => {
        if (checkPath(data.path) && data.type === "xp") {
            allEndProject.push(data)
        }
    });

    allEndProject.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    return allEndProject
}