const listDiv = document.getElementById("list-div")
let listCount = 0
let taskId = ""
let inputValue = ""



function handleAddItem(e) {
    inputValue = e.target.value
    listCount ++
    taskId = "task" + listCount
    document.querySelectorAll(".task").forEach((task) => task.addEventListener("click", handleCrossOut))
    renderList()
    inputValue = ""
    document.getElementById("taskA").value= ""
}

function handleCrossOut(e) {
    let targetIdEl = document.getElementById(e.target.id)
    if (e.target.id[0] === "b") {
        targetIdEl = document.getElementById(e.target.id.substr(3))
        if (targetIdEl.classList.contains("cross-out")) {
            targetIdEl.classList.remove("cross-out")
        } else {
            targetIdEl.classList.add("cross-out")}
    } else {
        if (targetIdEl.classList.contains("cross-out")) {
            targetIdEl.classList.add("cross-out")
        } else {
            targetIdEl.classList.remove("cross-out")}
}
 }

function renderList() {
    listDiv.innerHTML += `
    <input class="task" id="box${taskId}" type="checkbox">
    <label for="box${taskId}" class="task" id="${taskId}">${inputValue}</label>`
}


document.getElementById("taskA").addEventListener("change", handleAddItem)