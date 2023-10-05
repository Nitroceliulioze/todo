document.addEventListener("DOMContentLoaded", function () {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (savedTasks) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = savedTasks;
  }

  document.getElementById("taskInput").focus();
});

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");
  const taskInSpan = document.querySelectorAll("span");

  if (taskInput.value.trim() !== "") {
    let taskExists = false;

    taskInSpan.forEach(span => {
      console.log(span)
      if (span.innerHTML === taskInput.value.trim()) {
        taskExists = true;
        
        alert('You cannot add the same task')
      }
    });

    if (!taskExists) {
      const li = document.createElement("li");
      li.innerHTML = `
          <input type="checkbox" onchange="toggleDone(this)">
          <span>${taskInput.value}</span>
          <div class='buttons-container'>
              <button onclick="markAsImportant(this)">Important</button>
              <button onclick="deleteTask(this)">Delete</button>
          </div>
        `;

      taskList.insertBefore(li, taskList.childNodes[0]);
    }

    taskInput.value = "";
    saveTasks();

    taskInput.focus();
  }
}

function toggleDone(checkbox) {
  const span = checkbox.parentNode.querySelector("span");
  span.classList.toggle("done");

  saveTasks();
}

function markAsImportant(button) {
  const taskList = document.getElementById("taskList");
  const li = button.parentNode.parentNode;

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
  const taskList = document.getElementById("taskList");
  const tasks = taskList.innerHTML;

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
