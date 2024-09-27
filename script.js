// Selectors
const form = document.querySelector("form").addEventListener("submit", handleSubmitForm);
const ul = document.querySelector("ul").addEventListener("click", handleClickDeleteOrCheck);
const clearAll = document.getElementById("clearAll").addEventListener("click", handleClearAll);
const completedCount = document.getElementById("completedCount");

const todos = []; 

// Events 
function handleSubmitForm(e) {
    e.preventDefault(); 
    const input = document.querySelector("input");
    const errorMessage = document.getElementById("errorMessage");
    if (input.value !="") {
        addTodo(input.value);
input.value = "";
errorMessage.textContent = ""; 
} else { 
    errorMessage.textContent = "Du måste skriva något!";
}
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
    const ul = document.querySelector("ul");
    const li = document.createElement("li");
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
    const item = e.target.parentNode;
    const index = Array.from(item.parentNode.children).indexOf(item);
    
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
    const item = e.target.parentNode; 
    const index = Array.from(item.parentNode.children).indexOf(item); //Komplettering
    
    todos.splice(index, 1); //Komplettering 
    item.remove();
    updateCompletedCount();
 } 

 function updateCompletedCount() { 
   
    const completedCount = todos.filter(todo => todo.completed).length;

 
    document.getElementById("completedCount").innerText = completedCount;
}   