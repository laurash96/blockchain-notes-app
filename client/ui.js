const taskForm = document.querySelector("#taskForm")
const taskFormUpdate = document.querySelector("#taskFormUpdate")


document.addEventListener("DOMContentLoaded", ()=>{
    App.init()
})

taskForm.addEventListener("submit", e=>{
    e.preventDefault()

    App.createTask(taskForm["title"].value,
    taskForm["description"].value)
})

taskFormUpdate.addEventListener("submit", e=>{
    e.preventDefault()

    App.updateTask(taskFormUpdate["task_id"].value, taskFormUpdate["title"].value,
    taskFormUpdate["description"].value)
})