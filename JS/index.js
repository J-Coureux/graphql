import { fetchDatas } from "./Getter/FetchData.js"
import { Logged } from "./logged.js"

document.getElementById('login-button').addEventListener('click', async () => {
    const email = document.getElementById('email-field').value
    const password = document.getElementById('password-field').value
    const data = await fetchDatas('https://zone01normandie.org/api/auth/signin', btoa(`${email}:${password}`))
    if(typeof(data) !== "string"){
        document.getElementById('error-message').innerHTML = data.error
        return
    }
    Logged(data)

    console.log("connected")
})