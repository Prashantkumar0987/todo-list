const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const themeToggle = document.getElementById("themeToggle");

const priorityInput = document.getElementById("priorityInput");
const dueDateInput = document.getElementById("dueDateInput");

let tasks = [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskStats() {
    const total = tasks.length;

    const completed = tasks.filter(function (task) {
        return task.completed;
    }).length;

    const pending = total - completed;

    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;
}

function createTaskElement(task) {
    const li = document.createElement("li");

    const taskSpan = document.createElement("span");
    taskSpan.textContent = task.text;

    const taskInfo = document.createElement("div");
    taskInfo.className = "task-info";

    const priorityText = document.createElement("div");
    priorityText.className = "priority";

    priorityText.textContent =
        task.priority.charAt(0).toUpperCase() +
        task.priority.slice(1) +
        " Priority";

    const dateText = document.createElement("div");
    dateText.className = "due-date";

    if (task.dueDate) {
        dateText.textContent = "Due: " + task.dueDate;
    } else {
        dateText.textContent = "No due date";
    }

    taskInfo.appendChild(priorityText);
    taskInfo.appendChild(dateText);

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
        li.classList.add("removing");

        li.addEventListener("animationend", function () {
            const index = tasks.indexOf(task);

            tasks.splice(index, 1);

            saveTasks();

            li.remove();

            updateTaskStats();
        });
    });

    if (task.completed) {
        taskSpan.classList.add("completed");
    }

    const actions = document.createElement("div");
    actions.className = "task-actions";

    actions.appendChild(completeBtn);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(taskSpan);
    li.appendChild(taskInfo);
    li.appendChild(actions);

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
    const priority = priorityInput.value;
    const dueDate = dueDateInput.value;

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false,
        priority: priority,
        dueDate: dueDate
    });

    saveTasks();

    renderTasks();

    taskInput.value = "";
    priorityInput.value = "low";
    dueDateInput.value = "";
});

taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addBtn.click();
    }
});

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeToggle.textContent = "☀️";
        localStorage.setItem("theme", "dark");
    } else {
        themeToggle.textContent = "🌙";
        localStorage.setItem("theme", "light");
    }
});

const savedTasks = localStorage.getItem("tasks");

if (savedTasks) {
    tasks = JSON.parse(savedTasks);

    tasks = tasks.map(function (task) {
        return {
            text: task.text,
            completed: task.completed || false,
            priority: task.priority || "low",
            dueDate: task.dueDate || ""
        };
    });

    saveTasks();
    renderTasks();
}

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
} else {
    document.body.classList.remove("dark");
    themeToggle.textContent = "🌙";
}