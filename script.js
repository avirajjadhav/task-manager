const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");
const category = document.getElementById("category");

// Load saved todos from localStorage
const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];

// Save todos to localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Create DOM node for a todo
function createTodoNode(todo, index) {
  const li = document.createElement("li");

  const categorySpan = document.createElement("span");
  categorySpan.textContent = todo.category;

 
  // Checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = !!todo.completed;

  // Text
  const textSpan = document.createElement("span");
  textSpan.textContent = todo.text;
  textSpan.style.margin = "0 10px";

  if (todo.completed) {
    textSpan.style.textDecoration = "line-through";
  }

  // Toggle completion
  checkbox.addEventListener("change", () => {
    todo.completed = checkbox.checked;

    textSpan.style.textDecoration = todo.completed ? "line-through" : "none";

    saveTodos();
  });

  // Edit button
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit-btn");

  editBtn.addEventListener("click", () => {
    const newText = prompt("Edit todo", todo.text);

    if (newText !== null) {
      const trimmedText = newText.trim();

      if (trimmedText) {
        todo.text = trimmedText;
        textSpan.textContent = todo.text;

        saveTodos();
      }
    }
  });

  // Delete button
  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.classList.add("delete-btn");

  delBtn.addEventListener("click", () => {
    todos.splice(index, 1);

    render();
    saveTodos();
  });

  // Add elements to li
  li.appendChild(checkbox);
  li.appendChild(textSpan);
  li.appendChild(categorySpan);
  li.appendChild(editBtn);
  li.appendChild(delBtn);
  

  return li;
}

// Render todo list
function render() {
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const node = createTodoNode(todo, index);

    list.appendChild(node);
  });
}

// Add todo
function addTodo() {
  const text = input.value.trim();
  const selectedCategory = category.value;

  if (!text) {
    return;
  }

  todos.push({
    text: text,
    completed: false,
    category: selectedCategory,
  });

  input.value = "";

  render();
  saveTodos();
}

addBtn.addEventListener("click", addTodo);

render();
