document.addEventListener("DOMContentLoaded", function () {
  var savedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (savedTasks) {
    var taskList = document.getElementById("taskList");
    taskList.innerHTML = savedTasks;
  }
});

function addTask() {
  var taskInput = document.getElementById("taskInput");
  var taskList = document.getElementById("taskList");

  if (taskInput.value.trim() !== "") {
    var li = document.createElement("li");
    li.innerHTML = `
        <input type="checkbox" onchange="toggleDone(this)">
        <span>${taskInput.value}</span>
        <div class='buttons-container'>
            <button class='important-btn' onclick="markAsImportant(this)">Important</button>
            <button class='del-btn' onclick="deleteTask(this)">Delete</button>
        </div>
      `;
    taskList.insertBefore(li, taskList.childNodes[0]);
    taskInput.value = "";
    saveTasks();

    taskInput.focus();
  }
}

function toggleDone(checkbox) {
    var span = checkbox.parentNode.querySelector("span");
    span.classList.toggle("done");

    saveTasks();
  }

function markAsImportant(button) {
  var taskList = document.getElementById("taskList");
  var li = button.parentNode.parentNode;

  taskList.insertBefore(li, taskList.childNodes[0]);

  saveTasks();
  taskInput.focus();
}

function deleteTask(button) {
  button.parentNode.parentNode.remove();

  saveTasks();
  taskInput.focus();
}

function saveTasks() {
  var taskList = document.getElementById("taskList");
  var tasks = taskList.innerHTML;

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

document
  .getElementById("taskInput")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask();
    }
  });
