// Selectors
const input = document.querySelector(".todo-input");
const button = document.querySelector(".todo-button");
const list = document.querySelector(".todo-list");

// EventListeners
button.addEventListener("click", addTodo);

// functions
function addTodo(event){
    event.preventDefault();

    // div
    let div = document.createElement("div");
    div.classList.add("todo");

    // list item
    let item = document.createElement("li");
    item.innerText = input.value;
    item.classList.add("todo-item");
    div.appendChild(item);

    // Check mark button
    complete_button = document.createElement("button");
    complete_button.innerHTML = "<i class='fas fa-check'></i>";
    complete_button.setAttribute("class", "complete-btn");
    div.appendChild(complete_button);

    // delete button
    trash_button = document.createElement("button");
    trash_button.innerHTML = "<i class='fas fa-trash'></i>";
    trash_button.setAttribute("class", "trash-btn");
    div.appendChild(trash_button);

    list.appendChild(div);
    input.value = ""; // clear the input field
}