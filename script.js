const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

window.onload = loadTasks;

addTaskBtn.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return alert("Please enter a task!");

    const task = {
        text: taskText,
        completed: false
    };

    addTaskToDOM(task);
    saveTask(task);
    taskInput.value = "";
}

function addTaskToDOM(task) {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.completed) {
        li.classList.add("completed");
    }

    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        updateTaskStatus(task.text);
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.classList.add("delete-btn");
    delBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        li.remove();
        deleteTask(task.text);
    });

    li.appendChild(delBtn);
    taskList.appendChild(li);
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

function deleteTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskStatus(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map(task => {
        if (task.text === taskText) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
