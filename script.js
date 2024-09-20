// Selectors
document.querySelector("form").addEventListener("submit", handleSubmitForm);
document.querySelector("ul").addEventListener("click", handleClickDeleteOrCheck);
document.getElementById("clearAll").addEventListener("click", handleClearAll);
document.getElementById("completedCount");

let todos = []; 

// Events 
function handleSubmitForm(e) {
    e.preventDefault(); 
    let input = document.querySelector("input");
    if (input.value !="")
        addTodo(input.value);
input.value = "";
}

function handleClickDeleteOrCheck(e) {
    if (e.target.name == "checkButton")
        checkTodo(e); 
    if (e.target.name == "deleteButton")
        deleteTodo(e); 

}

function handleClearAll(e) { 
    document.querySelector("ul").innerHTML = "";
    updateCompletedCount();
}

//Helpers
function addTodo(todo) {
    let ul = document.querySelector("ul");
    let li = document.createElement("li");
li.innerHTML =  ` 
<span class="todo-item">${todo}</span>
<button name="checkButton"><i class="fas fa-check-square"></i></button>
<button name="deleteButton"><i class="fas fa-trash"></i></button>
                    `;
                    li.classList.add("todo-list-item");
                    ul.appendChild(li);

                    todos.push({text: todo, completed: false});
}

function checkTodo(e) { 
    let item = e.target.parentNode;
    let index = Array.from(item.parentNode.children).indexOf(item);
    
    if (todos[index].completed) {
        todos[index].completed = false;
        item.style.textDecoration = "none";
    } else {
        todos[index].completed = true;
        item.style.textDecoration = "line-through";
    }
    
    updateCompletedCount(); 
}




function deleteTodo(e) {
    let item = e.target.parentNode; 
    item.remove();
    updateCompletedCount();
 } 

 function updateCompletedCount() { 
   
    let completedCount = todos.filter(todo => todo.completed).length;

 
    document.getElementById("completedCount").innerText = completedCount;
}   