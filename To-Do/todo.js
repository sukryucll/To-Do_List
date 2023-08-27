//Tüm Elementleri Seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(e){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}
function clearAllTodos(e){
    if (confirm("Tüm Todoları Silmek İstediğinize Emin Misiniz ?")){
        while(todoList.firstElementChild != null){
            todoList.firstElementChild.remove();
        }
        localStorage.removeItem("todos");
        showAlert("success","Tüm To-Do'lar Başarıyla Temizlendi")
    }
}
function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue)=== -1){
            listItem.setAttribute("style","display : none !important");
        }
        else{
            listItem.setAttribute("style","display : block");
        }
    })
}
function deleteTodo(e){
    if (e.target.className == "fa fa-remove"){
    e.target.parentElement.parentElement.remove();
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    showAlert("info","Başarıyla Silindi")
    }

}
function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo,index){
        if (deletetodo === todo){
            todos.splice(index,1);
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos))
}
function loadAllTodosToUI(){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){
    addTodoToUI(todo);
    })
}
function addTodo(e){
    const newTodo = todoInput.value.trim();

    if (newTodo === ""){
        showAlert("danger","Lütfen Bir To-Do Giriniz !")
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","To-Do Başarıyla Eklendi")
    }

    e.preventDefault();
}
function getTodosFromStorage(){
    let todos;
    if (localStorage.getItem("todos")=== null){
        todos=[];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function addTodoToStorage(newTodo){

    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
    

}
function showAlert(type,message){
                 /* div class="alert alert-primary" role="alert">
                    This is a primary alert—check it out!
                    </div> */
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    setTimeout(function(){
        alert.remove();
    },1200)
    firstCardBody.appendChild(alert);

}
function addTodoToUI(newTodo){
    {/* <li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li */}
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.className = "delete-item";
    link.href = "#";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";
    listItem.className = "list-group-item d-flex justify-content-between";
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
    todoList.appendChild(listItem);
    todoInput.value ="";
}