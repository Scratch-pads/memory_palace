const disableButtons = (...args) => {
    const buttons_ids = [...args]

    buttons_ids.forEach(element => {
        document.getElementById(element).classList.replace("clickablePassive", "paused")
        document.getElementById(element).classList.remove("clickable")
    })
}
const enableButtons = (...args) => {
    const button_ids = [...args]

    button_ids.forEach(element => {
        document.getElementById(element).classList.replace("paused", "clickablePassive")
        document.getElementById(element).classList.add("clickable")
    })
}
export {enableButtons, disableButtons};