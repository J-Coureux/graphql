export const checkPath = (data) => {
    //console.log(data)
    //console.log("[1] :", data[1])
    // Split the input data after 'piscine' to get the potential path
    const tmp = data.split('piscine')[1];
    //console.log("tmp :", tmp)
    // Check if there are any '/' characters in the extracted part
    if (tmp && (tmp.match(/\//g) || []).length > 0) {
        return false;
    }
    
    // Get the last part of the split path
    const tmp2 = data.split('/')[data.split('/').length - 1];
    
    // Check if the last part is exactly "checkpoint"
    if (tmp2 === "checkpoint") {
        // If it is "checkpoint", consider it as an invalid path
        return false;
    }
    
    // If none of the above conditions are met, consider the path as valid
    return true;
}


export const checkPaht2 = (path) => {
    const arr = path.split('/')[path.split('/').length-1]
    if (arr === "div-01") {
        return true
    }
    return false
}