// Function to fetch data asynchronously
export const fetchDatas = async (url, auth) => {
    // Create a new Headers object
    const headerData = new Headers()
    
    // Append Authorization header with Basic authentication
    headerData.append('Authorization', 'Basic ' + auth)
    
    // Send a POST request to the specified URL with the headers
    return await fetch(url, {
        headers: headerData,
        method: 'POST'
    })
    .then(async data => {
        // Convert the response to JSON
        return data.json()
    })
    .catch(err => {
        // Log any errors that occur during the fetch operation
        console.error(err)
    })
}

// Function to fetch GraphQL query asynchronously
export const fetcheDatasUser = async (url, JWT, query) => {
    
    // Create a new Headers object
    const headerDatas = new Headers()
    
    // Append Authorization header with JWT token
    headerDatas.append('Authorization', JWT)
    
    // Send a POST request to the specified URL with the headers and query body
    return await fetch(url, {
        headers: headerDatas,
        method: 'POST',
        body: JSON.stringify({ "query": query })
    })
    .then(datas => {
        // Convert the response to JSON
        return datas.json()
    })
    .catch(err => {
        // Log any errors that occur during the fetch operation
        console.error(err)
    })
}