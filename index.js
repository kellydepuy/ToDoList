// ***** Global Variables *****
const listDiv = document.getElementById("list-div")
let listCount = 1

// ***** Event Listeners *****
document.getElementById("taskA").addEventListener("change", handleAddItem)
document.querySelectorAll(".task").forEach((task) => task.addEventListener("click", handleCrossOut)) 
document.getElementById("clear-button").addEventListener("click", handleClearCompleted)

// ***** Setting Up List Count Variable *****
// List ount variable is used to create id's for the tasks and checkboxes.

if (localStorage.getItem("count")) {
    listCount = JSON.parse(localStorage.getItem("count"))
} else {
    localStorage.setItem("count", "1")
    listCount = 1
}

/*This function sets up task in local storage, increments the list count variable,
calls the functions which creates the html needed to render the page, and resets input. */
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

/*This function is called when the user clicks the text or checkboxs and sets the styling
so that the box is checked and the text is crossed out. */

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

 //This function creates the html for any new items added to the list.
 function handleAddHTML(inputValue, id) {
    listDiv.innerHTML += `
    <div class="single-task-container">
        <input class="task box" id="box${id}" type="checkbox">
        <label for="box${id}" class="task" id="${id}">${inputValue}</label>
    </div>`
 }

/*This function is called when the clear completed tasks button is clicked. It gets a list
of keys from local storage and removes the count key. It uses this list to iterate through
local storage, pulling ids as it does, and using those ids to search for elements with
class "cross-out". If the element contains that class, it is removed from local storage
and html. There is a bug in here that is creating inconsistent results when the button is pressed. */

 function handleClearCompleted(e) {
    const keys = Object.keys(localStorage)
    const countIndex = keys.indexOf("count")
    keys.splice(countIndex, 1)

    for (let i = 0; i < localStorage.length - 1; i++) {
        let currentTask = JSON.parse(localStorage.getItem(keys[i]))
        let currentTaskEl =document.getElementById(currentTask.id)
       if (currentTaskEl.classList.contains("cross-out")) {
        localStorage.removeItem(JSON.stringify(currentTask.id))
        currentTaskEl.remove()
        document.getElementById(`box${currentTask.id}`).remove()
       }
    } 
 }

 /*This function gathers a list of keys from local storage and uses that list to pull the
 id and value for each item, which is then inserted into the html and creates the list. This
 runs once at start up to create the list based on items stored in local storage. */

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