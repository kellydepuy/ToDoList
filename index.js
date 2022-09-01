const listDiv = document.getElementById("list-div")
let listCount = 1

document.getElementById("taskA").addEventListener("change", handleAddItem)
document.querySelectorAll(".task").forEach((task) => task.addEventListener("click", handleCrossOut)) 
document.getElementById("clear-button").addEventListener("click", handleClearCompleted)


if (localStorage.getItem("count")) {
    listCount = JSON.parse(localStorage.getItem("count"))
} else {
    localStorage.setItem("count", "1")
    listCount = 1
}


function handleAddItem(e) {
    listCount ++
    const obj = {
        value: e.target.value,
        id: "task" + listCount
    }
    localStorage.setItem("count", JSON.stringify(listCount))
    localStorage.setItem(`"${obj.id}"`, JSON.stringify(obj))
    handleAddHTML(obj.value, obj.id)
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

 function handleAddHTML(inputValue, id) {
    listDiv.innerHTML += `
    <input class="task box" id="box${id}" type="checkbox">
    <label for="box${id}" class="task" id="${id}">${inputValue}</label>`
 }

 function handleClearCompleted(e) {
    console.log("clicked")
    const keys = Object.keys(localStorage)
    const countIndex = keys.indexOf("count")
    keys.splice(countIndex, 1)

    for (let i = 0; i < localStorage.length - 1; i++) {
        let currentTask = JSON.parse(localStorage.getItem(keys[i]))
        let currentTaskEl =document.getElementById(currentTask.id)
       if (currentTaskEl.classList.contains("cross-out")) {
        console.log(currentTask.id)
        localStorage.removeItem(JSON.stringify(currentTask.id))
        currentTaskEl.remove()
        document.getElementById(`box${currentTask.id}`).remove()
       }
    }
    
 }

function renderList() {
    const keys = Object.keys(localStorage)
    const countIndex = keys.indexOf("count")
    keys.splice(countIndex, 1)
    
    for (let i = 0; i < localStorage.length - 1; i++) {
            const key = JSON.parse(localStorage.getItem(keys[i]))
            const id = key.id
            const inputValue= key.value
            listDiv.innerHTML += `
            <div class="single-task-container">
                <input class="task box" id="box${id}" type="checkbox">
                <label for="box${id}" class="task" id="${id}">${inputValue}</label>
            </div>`
    }
}

renderList()