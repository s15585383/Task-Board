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
    //  Take task details (id, title, description, due date) as input.
    const newTaskCard = $("<div>")
    newTaskCard.attr('id', task.id)
    newTaskCard.addClass("draggable")
    const newTitle = $("<h3>").text(task.taskTitle)
    const newTaskDescription = $("<p>").text(task.taskDescription)
    const newDueDate = $("<p>").text(task.taskDueDate)
    const newDeleteButton = $('<button>')
        .text('Delete')
        .attr('data-task-id', task.id);
    // const newDeleteButton = $("<button>").text("Delete")
    newDeleteButton.on("click", handleDeleteTask)
    const dayOfTaskDue = dayjs(task.taskDueDate)
    const currentDate = dayjs()
    const dateDiff = dayOfTaskDue.diff(currentDate, 'd')
    if (dateDiff < 0) {
        newTaskCard.addClass("bg-danger")
    }
    else if (dateDiff >= 0 || dateDiff <= 2) {
        newTaskCard.addClass("bg-warning")
    }
    else {
        newTaskCard.addClass(".bg-light")
    }
    newTaskCard.append(newTitle, newTaskDescription, newDueDate, newDeleteButton)
    //  Generate HTML for a task card using the task details.
    //  Return the generated task card HTML.
    return newTaskCard
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const todoCards = $("#todo-cards")
    todoCards.empty()
    const inProgressCards = $("#in-progress-cards")
    inProgressCards.empty()
    const doneCards = $("#done-cards")
    doneCards.empty()
    for (let i = 0; i < taskList.length; i++) {
        const task = taskList[i];
        if (task.status === "to-do") {
            const taskCard = createTaskCard(task)
            console.log(taskCard)
            todoCards.append(taskCard)
        }
        if (task.status === "in-progress") {
            const taskCard = createTaskCard(task)
            console.log(taskCard)
            inProgressCards.append(taskCard)
        }
        if (task.status === "done") {
            const taskCard = createTaskCard(task)
            console.log(taskCard)
            doneCards.append(taskCard)
        }
    }
    $(".draggable").draggable({
        snap: ".droppable", snapMode: "inner"
    })
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
    event.preventDefault()
    const taskId = $(this).attr('data-task-id');
    console.log("task id is ", taskId)
    taskList = taskList.filter((task) => task.id !== parseInt(taskId));
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    console.log(event)
    console.log(ui)
    const status = event.target.id
    const draggedTaskId = ui.draggable[0].id
    // const found = taskList.find((task) => task.id === Number(draggedTaskId));
    for (const task of taskList) {
        if (task.id === Number(draggedTaskId)) {
            task.status = status
        }
    }
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList()
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    $(".droppable").droppable({
        drop: handleDrop,
        accept: ".draggable"
    })
    $('#addtask').on("click", handleAddTask)


    $('#Task-due-date').datepicker({
        dateFormat: 'dd-mm-yy',
        altField: '#Task-due-date',
        altFormat: 'yy-mm-dd',
        changeYear: true,
        changeMonth: true,
    });
    renderTaskList()
});
