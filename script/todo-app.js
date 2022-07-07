(function () {
    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');
            
        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        //btndis
        button.setAttribute('disabled', 'disabled')
        function func() {
            if (input.value === "") {
                button.setAttribute('disabled', 'disabled')
            } else {
                button.removeAttribute('disabled', 'disabled')
            }
        }
        input.addEventListener('input', func)
        //btndis

        return {
            form,
            input,
            button,
        };
    }
    
    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem(name, done = false) {
        let item = document.createElement('li');
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = name;
        if (done) {
            item.classList.add(`list-group-item-success`)
        }

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        return {
            item,
            doneButton,
            deleteButton,
        };
    }

    function createTodoApp(container, title = 'Список дел', storage = 'myTodos', todosArray = []) {
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        todosArray.forEach(deal => {
            let newTodoItem = createTodoItem(deal.name, deal.done);
      
            todoList.append(newTodoItem.item);
            newTodoItem.doneButton.addEventListener('click', function() {
                newTodoItem.item.classList.toggle('list-group-item-success');
                for (let todos of todosArray) {
                    if (todos.name === deal.name) {
                        todos.done = todos.done === false ? true : false;
                    }
                }
                localStorage.setItem(storage, JSON.stringify(todosArray));
            });
      
            newTodoItem.deleteButton.addEventListener('click', function() {
                if(confirm('Вы уверены?')) {
                    newTodoItem.item.remove();
                    for (let i in todosArray) {
                        if (todosArray[i].name === deal.name) {
                            todosArray.splice(i, 1)
                        }
                    }
                    localStorage.setItem(storage, JSON.stringify(todosArray));
                }
            })
        });


        todoItemForm.form.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!todoItemForm.input.value) {
                return;
            }
            //btndis
            todoItemForm.button.setAttribute('disabled', 'disabled')
            //btndis
            let todoItem = createTodoItem(todoItemForm.input.value);

            todoItem.doneButton.addEventListener('click', function () {
                todoItem.item.classList.toggle('list-group-item-success')
                for (let todos of todosArray) {
                    if (todos.name === todoItem.item.firstChild.textContent) {
                        todos.done = todos.done === false ? true : false;
                    }
                  }
                localStorage.setItem(storage, JSON.stringify(todosArray));
            });

            todoItem.deleteButton.addEventListener('click', function () {
                if (confirm('Вы уверены?')) {
                    todoItem.item.remove();
                    for (let i in todosArray) {
                        if (todosArray[i].name === todoItem.item.firstChild.textContent) {
                            todosArray.splice(i, 1)
                        }
                    }
                    localStorage.setItem(storage, JSON.stringify(todosArray));
                }
            });

            todoList.append(todoItem.item);
            todosArray.push({ name: todoItemForm.input.value, done: false });
            localStorage.setItem(storage, JSON.stringify(todosArray));

            todoItemForm.input.value = '';
        });
    }
    window.createTodoApp = createTodoApp;
})();