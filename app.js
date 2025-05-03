// Selectors
const input = document.querySelector(".todo-input"); // input field
const add_btn = document.querySelector(".add-btn"); // add button
const list = document.querySelector(".todo-list"); // list of todos
const filterOption = document.querySelector(".filter-todo"); // filter select menu

// EventListeners
document.addEventListener("DOMContentLoaded", getTodos);
add_btn.addEventListener("click", addTodo);
list.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

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
    
    // add the todo to localStorage
    saveLocalTodos(input.value);
    // complete button
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

function deleteCheck (event) {
    const item = event.target;

    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        // Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", () => {
            todo.remove();
        });
    }
    else if (item.classList[0] === "complete-btn"){
        item.parentElement.classList.toggle("completed");
    }
}

function filterTodo(event){
    const filter = event.target;
    const todos = list.childNodes;
    todos.forEach(todo => {
        switch(filter.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed"))
                    todo.style.display = "flex";
                else
                    todo.style.display = "none";
                break;
            case "incompleted":
                if(!todo.classList.contains("completed"))
                    todo.style.display = "flex";
                else
                    todo.style.display = "none";
                break;
            default:
                break;
        }
    });
}

function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null)
        todos = [];
    else
        todos = JSON.parse(localStorage.getItem("todos"));

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null)
        todos = [];
    else
        todos = JSON.parse(localStorage.getItem("todos"));
        
    let todoIndex = todos.indexOf(todo.childNodes[0].innerText);
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem("todos") === null)
        todos = [];
    else
        todos = JSON.parse(localStorage.getItem("todos"));

    todos.forEach((todo) => {
        let div = document.createElement("div");
        div.classList.add("todo");

        let item = document.createElement("li");
        item.innerText = todo;
        item.classList.add("todo-item");

        div.appendChild(item);

        const complete_button = document.createElement("button");
        complete_button.innerHTML = `<i class="fas fa-check"></i>`;
        complete_button.classList.add("complete-btn");
        div.appendChild(complete_button);

        const trash_button = document.createElement("button");
        trash_button.innerHTML = `<i class="fas fa-trash"></i>`;
        trash_button.classList.add("trash-btn");
        div.appendChild(trash_button);

        list.appendChild(div);
    })
}