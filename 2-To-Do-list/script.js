/*=========================================
    UIForge To-Do List
    script.js - Part 1
==========================================*/

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const remainingTasks = document.getElementById("remainingTasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/*=========================================
    Save Tasks
==========================================*/
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/*=========================================
    Update Statistics
==========================================*/
function updateStats() {
    const completed = tasks.filter(task => task.completed).length;

    totalTasks.textContent = tasks.length;
    completedTasks.textContent = completed;
    remainingTasks.textContent = tasks.length - completed;
}

/*=========================================
    Render Tasks
==========================================*/
function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");
        li.className = "task";

        const taskLeft = document.createElement("div");
        taskLeft.className = "task-left";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "complete-checkbox";
        checkbox.dataset.index = index;
        checkbox.checked = task.completed;

        const text = document.createElement("span");
        text.className = "task-text";

        if (task.completed) {
            text.classList.add("completed");
        }

        text.textContent = task.text;

        taskLeft.appendChild(checkbox);
        taskLeft.appendChild(text);

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const editBtn = document.createElement("button");
        editBtn.className = "edit-btn";
        editBtn.dataset.index = index;
        editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.dataset.index = index;
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(taskLeft);
        li.appendChild(actions);

        taskList.appendChild(li);

    });

    updateStats();
    saveTasks();

}

/*=========================================
    Add Task
==========================================*/
function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    taskInput.value = "";

    renderTasks();

}

/*=========================================
    Button Click
==========================================*/
addTaskBtn.addEventListener("click", addTask);

/*=========================================
    Press Enter
==========================================*/
taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addTask();
    }

});

/*=========================================
    Initial Load
==========================================*/
renderTasks();
/*=========================================
    PART 2
    Complete, Edit & Delete Tasks
==========================================*/

taskList.addEventListener("click", function (event) {

    // ==========================
    // Complete Task
    // ==========================

    if (event.target.classList.contains("complete-checkbox")) {

        const index = Number(event.target.dataset.index);

        tasks[index].completed = event.target.checked;

        renderTasks();

        return;

    }

    // ==========================
    // Delete Task
    // ==========================

    const deleteButton = event.target.closest(".delete-btn");

    if (deleteButton) {

        const index = Number(deleteButton.dataset.index);

        tasks.splice(index, 1);

        renderTasks();

        return;

    }

    // ==========================
    // Edit Task
    // ==========================

    const editButton = event.target.closest(".edit-btn");

    if (editButton) {

        const index = Number(editButton.dataset.index);

        const newText = prompt(
            "Edit Task",
            tasks[index].text
        );

        if (newText === null) {

            return;

        }

        const value = newText.trim();

        if (value === "") {

            alert("Task cannot be empty.");

            return;

        }

        tasks[index].text = value;

        renderTasks();

    }

});


/*=========================================
    Search Tasks
==========================================*/

const searchTask = document.getElementById("searchTask");

searchTask.addEventListener("input", function () {

    const keyword = this.value.toLowerCase();

    const allTasks = document.querySelectorAll(".task");

    allTasks.forEach(function (task) {

        const text = task
            .querySelector(".task-text")
            .textContent
            .toLowerCase();

        if (text.includes(keyword)) {

            task.style.display = "flex";

        } else {

            task.style.display = "none";

        }

    });

});


/*=========================================
    Filter Buttons
==========================================*/

const filterButtons =
document.querySelectorAll(".filter-btn");

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        filterButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });

        this.classList.add("active");

        const filter = this.dataset.filter;

        const allTasks =
        document.querySelectorAll(".task");

        allTasks.forEach(function (task, index) {

            switch (filter) {

                case "all":

                    task.style.display = "flex";

                    break;

                case "active":

                    task.style.display =
                        tasks[index].completed
                        ? "none"
                        : "flex";

                    break;

                case "completed":

                    task.style.display =
                        tasks[index].completed
                        ? "flex"
                        : "none";

                    break;

            }

        });

    });

});
/*=========================================
    PART 3
    Clear Completed
==========================================*/

const clearCompletedBtn =
document.getElementById("clearCompleted");

clearCompletedBtn.addEventListener("click", function () {

    tasks = tasks.filter(function (task) {

        return !task.completed;

    });

    renderTasks();

});


/*=========================================
    Delete All Tasks
==========================================*/

const deleteAllBtn =
document.getElementById("deleteAll");

deleteAllBtn.addEventListener("click", function () {

    if (tasks.length === 0) {

        alert("There are no tasks to delete.");

        return;

    }

    const confirmDelete = confirm(
        "Delete all tasks?"
    );

    if (confirmDelete) {

        tasks = [];

        renderTasks();

    }

});


/*=========================================
    Scroll To Top Button
==========================================*/

const topBtn =
document.getElementById("topBtn");

window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {

        topBtn.style.display = "flex";

    } else {

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", function () {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/*=========================================
    Keyboard Shortcut
    Ctrl + Enter = Add Task
==========================================*/

document.addEventListener("keydown", function (event) {

    if (event.ctrlKey && event.key === "Enter") {

        addTask();

    }

});


/*=========================================
    Console Message
==========================================*/

console.log("=================================");
console.log(" UIForge To-Do List Loaded");
console.log(" HTML ✓");
console.log(" CSS ✓");
console.log(" JavaScript ✓");
console.log("=================================");