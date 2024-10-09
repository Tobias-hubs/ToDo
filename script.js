// Selectors
const form = document.querySelector("form").addEventListener("submit", handleSubmitForm);
const ul = document.querySelector("ul").addEventListener("click", handleClickDeleteOrCheck);
const clearAll = document.getElementById("clearAll");
if (clearAll) {
    clearAll.addEventListener("click", handleClearAll);
}
const completedCount = document.getElementById("completedCount");




const todos = [];

// Events 

function handleSubmitForm(e) {
    e.preventDefault();
    const input = document.querySelector("input");
    const errorMessage = document.getElementById("errorMessage");
    if (input.value != "") {
        addTodo(input.value);
        input.value = "";
        errorMessage.textContent = "";
    } else {
        errorMessage.textContent = "Input must not be empty";
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
    li.innerHTML = ` 
<span class="todo-item">${todo}</span> 
<button class="delete-button" name="deleteButton"></i></button>
                    `;
    li.classList.add("todo-list-item", "fade-in-slide-up");
    ul.appendChild(li);

    li.querySelector(".todo-item").addEventListener("click", checkTodo);

    todos.push({ text: todo, completed: false });

    adjustPadding();

}

function adjustPadding() {

    const listItems = document.querySelectorAll('ul li');

    // V shape on Text in li 
    let maxLength = 0;
    listItems.forEach(item => {
        const textLength = item.textContent.length;
        if (textLength > maxLength) {
            maxLength = textLength;
        }
    });

    // Shift text based on maxLength
    listItems.forEach(item => {
        const currentLength = item.textContent.length;
        const padding = (maxLength - currentLength) * 5;
        item.style.paddingLeft = `${padding}px`;
    });
}


function checkTodo(e) {
    const item = e.target;
    const index = Array.from(item.parentNode.parentNode.children).indexOf(item.parentNode);

    setTimeout(() => {
        item.classList.toggle("completed");
        todos[index].completed = !todos[index].completed;

        updateCompletedCount();
    }, 300);    

}






function deleteTodo(e) {
    const item = e.target.parentNode;
    const index = Array.from(item.parentNode.children).indexOf(item);

    todos.splice(index, 1);
    item.remove();
    updateCompletedCount();
}

function updateCompletedCount() {

    const completedCount = todos.filter(todo => todo.completed).length;


    document.getElementById("completedCount").innerText = completedCount;
}




document.getElementById('myForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const inputField = document.getElementById('todo-input');
    const errorMessage = document.getElementById('errorMessage');

    if (inputField.value.trim() === '') {
        errorMessage.classList.remove('hidden');
        errorMessage.classList.add('blink');

        setTimeout(() => {
            errorMessage.classList.remove('blink');
        }, 1500);

    } else {
        errorMessage.classList.add('hidden');
        errorMessage.classList.remove('blink');
    }
});