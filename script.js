const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

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
    });

    // Create Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    // Delete button functionality
    deleteBtn.addEventListener("click", function () {
        li.remove();
    });

    // Add everything to li
    li.appendChild(taskSpan);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    // Add li to task list
    taskList.appendChild(li);

    // Clear input
    taskInput.value = "";
});