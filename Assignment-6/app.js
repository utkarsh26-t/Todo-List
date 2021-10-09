const todoContainer = document.querySelector('#todoContainer');
const inp = document.querySelector('input');
const addButton = document.querySelector('#btn');

addButton.addEventListener('click',() => {


    const todoText = inp.value;
    if(todoText === ""){
        alert('Empty todo');
        return;
    }
    //Adding Todo to local Storage
    saveLocalTodos(inp.value);
    //--end--
    
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const check = document.createElement('input');
    check.setAttribute('type','checkbox');
    check.classList.add('complete');
    todoDiv.append(check);
    check.addEventListener('change',()=>{
        newTodo.classList.toggle('done');
    });

    const newTodo = document.createElement('h4');
    newTodo.innerText = todoText;
    newTodo.classList.add('todo_item')
    todoDiv.append(newTodo);

    const edit = document.createElement('button');
    edit.innerHTML = '<i class="fas fa-pen">';
    edit.classList.add('edit');
    todoDiv.append(edit);
    edit.addEventListener('click',()=>{
        todoDiv.remove();
        inp.focus();
    })

    const trash_btn = document.createElement('button');
    trash_btn.innerHTML = '<i class="fas fa-trash"></i>';
    trash_btn.classList.add('trash');
    todoDiv.append(trash_btn);
    trash_btn.addEventListener('click',()=>{
        todoDiv.classList.add('fall');
        todoDiv.addEventListener('transitionend',()=>{
            todoDiv.remove();
        })
    })

    const moveUp = document.createElement('button');
    moveUp.innerHTML = '<i class="fas fa-angle-up"></i>';
    moveUp.classList.add('up');
    todoDiv.append(moveUp);
    moveUp.addEventListener('click',()=>{
        let prevSib = moveUp.parentElement.previousElementSibling.children[1];
        let temp = prevSib.innerText;
        prevSib.innerText = newTodo.innerText;
        newTodo.innerText = temp;
    })

    const moveDown = document.createElement('button');
    moveDown.innerHTML = '<i class="fas fa-angle-down"></i>';
    moveDown.classList.add('down');
    todoDiv.append(moveDown);
    moveDown.addEventListener('click',()=>{
        let nextSib = moveUp.parentElement.nextElementSibling.children[1];
        let temp = nextSib.innerText;
        nextSib.innerText = newTodo.innerText;
        newTodo.innerText = temp;
    })

    todoContainer.append(todoDiv);
    inp.value = "";
});

function saveLocalTodos(todo){
    //Checking-- If already have thing in there?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    if(todos.indexOf(todo) !== -1){
        return;
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

