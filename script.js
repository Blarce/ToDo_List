const dom = {
new: document.getElementById('new'),
add: document.getElementById('add'),
tasks: document.getElementById('tasks'),
count: document.getElementById('count')
}

//- Массив задач
const tasks = [];

//-Отслеживаем клик по кнопке Добавить задачу
dom.add.onclick = () => {
    const newTaskText = dom.new.value
    if (newTaskText && isNotHaveTask(newTaskText, tasks)) {
        addTask(newTaskText, tasks)
        dom.new.value = ''
        tasksRender(tasks)
    }
}

//-Функция добавления задачи

function addTask(text, list) {
    const timestamp = Date.now()
    const task = {
        id: timestamp,
        text,
        isComplete: false

    }
    list.push(task)
}

//- Проверка существования задачи в массиве задач
function isNotHaveTask (text, list) {
    let isNotHave = true
    list.forEach((task) => {
        if(task.text === text) {
            alert('Задача уже существует!')
            isNotHave = false
        }
    })

    return isNotHave
}

//- Функция вывода списка задач

function tasksRender(list) {
    let htmlList = ''
    
    list.forEach((task) => {
        const cls = task.isComplete 
        ? 'todo__task todo__task__complete'
        : 'todo__task'
        const checked = task.isComplete 
        ? 'checked' 
        : ''
        const taskHtml = `
        <div id ="${task.id}" class ="${cls}">
                <label class="todo__checkbox">
                    <input type="checkbox" ${checked}>
                    <div class = "todo__checkbox-div"></div>
                </label>
                <div class="todo__task-text">${task.text}</div>
                <div class="todo__task-del">-</div>
            </div>
        `

        htmlList = htmlList + taskHtml
    })

    dom.tasks.innerHTML = htmlList
    renderTasksCount(list)
}

//- Отслеживание клика по чекбоксу задачи

dom.tasks.onclick = (event) => {
    const target = event.target
    const isCheckboxEl = target.classList.contains('todo__checkbox-div')
    const isDeleteEl = target.classList.contains('todo__task-del')
    if (isCheckboxEl) {
        const task = target.parentElement.parentElement
        const taskID = task.getAttribute ('id')
        ChangeTaskStatus(taskID,tasks)
        tasksRender(tasks)
    }
    if (isDeleteEl) {
        const task = target.parentElement
        const taskID = task.getAttribute ('id')
        DeleteTask(taskID, tasks)
        tasksRender(tasks)
    }
}

//- Функция изменения статуса задачи

function ChangeTaskStatus(id, list) {
    list.forEach((task) => {
        if (task.id == id) {
            task.isComplete = !task.isComplete
        }
    })
}

//- Функция удаления задачи

function DeleteTask (id, list) {
    list.forEach((task, idx) => {
        if (task.id == id) {
            list.splice(idx, 1)
        }
    })
}

//- Вывод кол-ва задач

function renderTasksCount(list) {
    dom.count.innerHTML = list.length
}