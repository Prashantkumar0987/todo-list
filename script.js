const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

let tasks = [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskStats() {
    const taskElements = taskList.querySelectorAll("li");

    const total = taskElements.length;
    let completed = 0;

    taskElements.forEach(function (task) {
        if (task.querySelector(".completed")) {
            completed++;
        }
    });

    const pending = total - completed;

    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;
}

function createTaskElement(task) {
    const li = document.createElement("li");

    const taskSpan = document.createElement("span");
    taskSpan.textContent = task.text;

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";

    completeBtn.addEventListener("click", function () {
        task.completed = !task.completed;

        taskSpan.classList.toggle("completed");

        saveTasks();
        updateTaskStats();
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    editBtn.addEventListener("click", function () {
        const newTask = prompt(
            "Edit your task:",
            taskSpan.textContent
        );

        if (newTask !== null && newTask.trim() !== "") {
            task.text = newTask.trim();
            taskSpan.textContent = task.text;

            saveTasks();
        }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function () {
        const index = tasks.indexOf(task);

        tasks.splice(index, 1);

        saveTasks();

        li.remove();

        updateTaskStats();
    });

    if (task.completed) {
        taskSpan.classList.add("completed");
    }

    li.appendChild(taskSpan);
    li.appendChild(completeBtn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    return li;
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task) {
        const li = createTaskElement(task);
        taskList.appendChild(li);
    });

    updateTaskStats();
}

addBtn.addEventListener("click", function () {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();

    renderTasks();

    taskInput.value = "";
});

const savedTasks = localStorage.getItem("tasks");

if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    renderTasks();
}