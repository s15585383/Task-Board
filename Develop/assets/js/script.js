// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 0;

// Todo: create a function to generate a unique task id
function generateTaskId() {
    ++nextId
    localStorage.setItem("nextId", JSON.stringify(nextId))
    return nextId
}

// Todo: create a function to create a task card
function createTaskCard(task) {

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const todoCards = $("todo-cards")
    todoCards.empty()
    const inProgressCards = $("in-progress-cards")
    inProgressCards.empty()
    const doneCards = $("done-cards")
    doneCards.empty()
    for (let i = 0; i < taskList.length; i++) {
        const task = taskList[i];
    }
    // invoke createTaskCard to add it to the corresponding elements

}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    const taskTitle = $("#Task-title").val()
    const taskDueDate = $("#Task-due-date").val()
    const taskDescription = $("#Task-description").val()
    const newTask = {
        status: "to-do",
        taskTitle,
        id: generateTaskId(),
        taskDueDate,
        taskDescription
    }
    taskList.push(newTask)
    localStorage.setItem("tasks", JSON.stringify(taskList))
    renderTaskList()
    // const savedTasks = localStorage.getItem("tasks")
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    $('#addtask').on("click", handleAddTask)


    $('#Task-due-date').datepicker({
        dateFormat: 'dd-mm-yy',
        altField: '#Task-due-date',
        altFormat: 'yy-mm-dd',
        changeYear: true,
        changeMonth: true,
    });
});
