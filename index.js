
// ***** Global Variables *****
let tasksObj = {}
let listDiv = document.getElementById("list-div")
let listCount = 1

// ***** Event Listeners *****
document.getElementById("task-input").addEventListener("change", handleAddItem)
listDiv.addEventListener("click", handleCrossOut)
document.getElementById("clear-button").addEventListener("click", handleClearCompleted)

// ***** Functions *****

onStart()

/* The onStart function sets up the app for use. It starts by setting up the count variable, which is used to create IDs
for each task added to the list. It then pulls any previously stored tasks from local storage and stores them in the
tasksObj variable to make them more accessible. Next it creates the html required for each task and adds it to the 
appropriate div. Sadly, there is a bug in here I haven't been able to sort out that causes the input label to lose
it's strikethrough when the page is refreshed, although the checkbox will keep it's check (or not as appropriate).*/

function onStart() {
    let keys = Object.keys(localStorage)
    keys = keys.filter((item) => item != "count")

    if (localStorage.getItem("count")) {
        listCount = JSON.parse(localStorage.getItem("count"))
    } else {
        localStorage.setItem("count", "1")
        listCount = 1
    }

    for (let i = 0; i < localStorage.length - 1; i++) {
        let currentTask = JSON.parse(localStorage.getItem(keys[i]))
        let taskId = keys[i]
        tasksObj = {[taskId]: currentTask, ...tasksObj}
        let { value, id, isCrossedOut } = currentTask
        let checkedVariable = isCrossedOut ? "checked" : ""

        listDiv.innerHTML += `<div class="single-task-container">
            <input class="task box ${isCrossedOut ? "cross-out" : "not-crossed"}" id="box${id}" type="checkbox" ${checkedVariable}>
            <label for="box${id}" class="task task-label" id="${id}">${value}</label>
        </div>`
}
}

/*This function creates the new as an object, stores it in local storage and in tasksObj, increments the list count variable, 
creates the html needed to render the page, and resets the input box. */
function handleAddItem(e) {
    listCount ++
    let obj = {
        value: e.target.value,
        id: `task${listCount}`,
        isCrossedOut: false
    }

    localStorage.setItem("count", JSON.stringify(listCount))
    localStorage.setItem(`${obj.id}`, JSON.stringify(obj))
    tasksObj = {[obj.id]: obj, ...tasksObj}
    document.getElementById("task-input").value= ""
    listDiv.innerHTML += `
    <div class="single-task-container">
        <input class="task box not-crossed" id="box${obj.id}" type="checkbox">
        <label for="box${obj.id}" class="task" id="${obj.id}">${obj.value}</label>
    </div>`
}

/*This function is called when the user clicks a task and sets the styling
so that the box is checked and the text is crossed out. It toggles the isCrossedOut
property in local storage and in tasksObj*/

function handleCrossOut(e) {
    console.log('clicked')
    let currentId = e.target.id[0] === "b" ? e.target.id.substr(3) : e.target.id
    let targetIdEl = document.getElementById(currentId)

        if (e.target.checked) {
            tasksObj[currentId].isCrossedOut = !tasksObj[currentId].isCrossedOut
            targetIdEl.classList.add("cross-out")
            localStorage.setItem(currentId, JSON.stringify(tasksObj[currentId]))
        } else {
            targetIdEl.classList.remove("cross-out")
            localStorage.setItem(currentId, JSON.stringify(tasksObj[currentId]))
            tasksObj[currentId].isCrossedOut = !tasksObj[currentId].isCrossedOut
        }
    }

/*This function is called when the clear completed tasks button is clicked. It gets a list
of keys from tasksObj. It uses this list to cycle through tasksObj, looking for tasks with
an isCrossOut value of true so it can be removed from local storage. tasksObj, and html.*/

 function handleClearCompleted(e) {
    let keys = Object.keys(tasksObj)
    
    for (let i = 0; i < keys.length; i++) {
        let currentTask = tasksObj[keys[i]]
        let currentTaskEl = document.getElementById(currentTask.id)
       if (currentTask.isCrossedOut) {
        localStorage.removeItem(currentTask.id)
        currentTaskEl.remove()
        document.getElementById(`box${currentTask.id}`).remove()
        delete tasksObj[currentTask]
       }
    } 
 }

 /* Improvements to make: 
 
 1) I orginally didn't use tasksObj and instead relied on only local storage, but I thought
 using tasksObj would simplify things. It did make things simplier, but looking over this now I wonder if this is
 creating a more theoretical problem of two sources of truth. After thinking about it more, I believe I should
 switch it back to using only local storage. 
 
 2) Fix the strikethrough bug mentioned above.
 
 3) I also think some of the code could be refactored and the first function separated into two, but 
 I'm not entirely sure it is necessary for such a small app. It is something I may consider in the
 future.
 
 4) I would like to make it so the user can organize the list as they wish, create sub-categories for tasks,
 and remove individual tasks.*/