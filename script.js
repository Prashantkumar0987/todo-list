const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

function updateTaskStats() {
    const task = taskList.querySelectorAll("li");
    const total = task.length;
    let completed = 0;
    task.forEach((task) => {
        if (task.querySelector("span").classList.contains("completed")) {
            completed++;
        }
    });
    const pending = total - completed;
    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;
}

addBtn.addEventListener("click", function () {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    // Create li
    const li = document.createElement("li");

    // Create task text
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    // Create Complete button
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";

    // Complete button functionality
    completeBtn.addEventListener("click", function () {
        taskSpan.classList.toggle("completed");
        updateTaskStats();
    });

    const editBtn = document.createElement("button");

    editBtn.textContent = "Edit";

    editBtn.addEventListener("click", function () {
        const newTaskText = prompt("Edit your task:", taskSpan.textContent);
        if (newTaskText !== null && newTaskText.trim() !== "") {
            taskSpan.textContent = newTaskText;
        }
    });

    // Create Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    // Delete button functionality
    deleteBtn.addEventListener("click", function () {
        li.remove();
        updateTaskStats();
    });

    // Add everything to li
    li.appendChild(taskSpan);
    li.appendChild(completeBtn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);


    // Add li to task list
    taskList.appendChild(li);
    updateTaskStats();
    taskInput.value = "";
});