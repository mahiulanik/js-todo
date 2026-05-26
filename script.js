const inputBox = document.getElementById("input-box");
const activeList = document.getElementById("active-list");
const completedList = document.getElementById("completed-list");
const activeCount = document.getElementById("active-count");
const completedCount = document.getElementById("completed-count");

function createTaskElement(taskText, isCompleted = false) {
  let li = document.createElement("li");
  li.textContent = taskText;
  if (isCompleted) {
    li.classList.add("checked");
  }
  let span = document.createElement("span");
  span.innerHTML = "\u00d7";
  li.appendChild(span);
  return li;
}

function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
    return;
  }
  let li = createTaskElement(inputBox.value);
  activeList.appendChild(li);
  inputBox.value = "";
  saveData();
  updateCounter();
}

inputBox.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

function updateCounter() {
  const activeTasks = activeList.querySelectorAll("li:not(.empty-msg)");
  const completedTasks = completedList.querySelectorAll("li:not(.empty-msg)");

  activeCount.innerHTML = activeTasks.length;
  completedCount.innerHTML = completedTasks.length;

  // Active list
  if (activeTasks.length === 0) {
    activeList.innerHTML =
      '<li class="empty-msg">No tasks yet — add one above!</li>';
  } else {
    const existingMsg = activeList.querySelector(".empty-msg");
    if (existingMsg) existingMsg.remove();
  }

  // Completed list
  if (completedTasks.length === 0) {
    completedList.innerHTML =
      '<li class="empty-msg">No completed tasks yet</li>';
  } else {
    const existingMsg = completedList.querySelector(".empty-msg");
    if (existingMsg) existingMsg.remove();
  }
}

document.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    if (e.target.parentElement.id === "active-list") {
      e.target.classList.add("checked");
      completedList.appendChild(e.target);
    } else {
      e.target.classList.remove("checked");
      activeList.appendChild(e.target);
    }
    saveData();
    updateCounter();
  } else if (
    e.target.tagName === "SPAN" &&
    e.target.parentElement.tagName === "LI"
  ) {
    e.target.parentElement.remove();
    saveData();
    updateCounter();
  }
});

function saveData() {
  localStorage.setItem("activeTasks", activeList.innerHTML);
  localStorage.setItem("completedTasks", completedList.innerHTML);
}

function showTask() {
  activeList.innerHTML = localStorage.getItem("activeTasks") || "";
  completedList.innerHTML = localStorage.getItem("completedTasks") || "";
}

showTask();
updateCounter();
