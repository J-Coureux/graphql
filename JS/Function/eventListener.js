export const CreateEventListener = (data) => {
    document.getElementById('logout').addEventListener('click', () => {
        location.reload()
    })

    document.getElementById('gitea').addEventListener('click', () => {
        window.open(`https://zone01normandie.org/git/${data.data.user[0].login}`)
    })

    document.getElementById('giteaSVG').addEventListener('click', () => {
        window.open(`https://zone01normandie.org/git/${data.data.user[0].login}`)
    })
}