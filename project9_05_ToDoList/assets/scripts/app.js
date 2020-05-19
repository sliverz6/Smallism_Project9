class TaskLog {
    constructor(taskList) {
        this.taskList = taskList;

        this.parsing();
    }

    updateUI(taskList) {
        this.taskNumEl.textContent = `0${taskList.length}`;
    }

    parsing() {
        this.taskNumEl = document.querySelector('.created-number');

        this.taskNumEl.textContent = `0${this.taskList.length}`;
    }
}

class TaskList {
    taskList = [];

    constructor() {
        this.renderHook = document.querySelector('.task');
    }

    addTask(task) {
        this.taskList.push(task);

        this.render();

        App.updateTaskUI(this.taskList);
    }

    deleteTaskHandler(taskEl, taskIndex) {
        this.taskList.splice(taskIndex, 1);
        
        this.renderHook.removeChild(taskEl);

        App.updateTaskUI(this.taskList);
    }

    render() {
        if (this.taskList.length === 0) {
            return;
        }

        this.renderHook.innerHTML = ``;

        this.taskList.forEach((task, idx) => {
            const taskEl = document.createElement('li');
            taskEl.className = 'list-items';
            taskEl.innerHTML = `
                <button class="content__completed"><i class="fas fa-check content__completed__icon"></i></button>
                <p class="content__text">${task.content}</p>
                <button class="remove-task-btn"><i class="fas fa-trash-alt"></i></button>
            `;

            const deleteTaskBtn = taskEl.querySelector('.remove-task-btn');
            deleteTaskBtn.addEventListener('click', this.deleteTaskHandler.bind(this, taskEl, idx));

            this.renderHook.append(taskEl);
        }) 
    }
}

class Task {
    constructor(content) {
        this.content = content;
    }
}

class AddTaskModal {
    constructor() {
        this.renderModal();
        this.renderBackdrop();
    }

    closeModal() {
        const addTaskModalEl = document.querySelector('.add-task-modal');
        addTaskModalEl.remove();
        const backdropEl = document.getElementById('backdrop');
        backdropEl.remove();
    }

    confirmTaskHandler(taskInput) {
        const taskInputValue = taskInput.value;

        if (taskInputValue.trim() === '') {
            alert('할 일을 작성해주세요.');
            return;
        }

        const task = new Task(taskInputValue);
        App.addTaskToList(task);

        this.closeModal();
    }

    renderBackdrop() {
        const backdropEl = document.createElement('div');
        backdropEl.id = 'backdrop';

        backdropEl.addEventListener('click', this.closeModal.bind(this));

        document.body.append(backdropEl);
    }

    renderModal() {
        const addTaskModalEl = document.createElement('section');
        addTaskModalEl.className = 'add-task-modal';
        addTaskModalEl.innerHTML = `
            <input type="text" placeholder="할 일을 작성하세요.">
            <button class="close-add-modal-btn"><i class="fas fa-arrow-left"></i></button>
            <button class="confirm-add-modal-btn"><i class="fas fa-plus"></i></button>
        `;
        
        const closeModalBtn = addTaskModalEl.querySelector('.close-add-modal-btn');
        closeModalBtn.addEventListener('click', this.closeModal.bind(this));
        
        const taskInput = addTaskModalEl.querySelector('input');
        
        const confrimTaskBtn = addTaskModalEl.querySelector('.confirm-add-modal-btn');
        confrimTaskBtn.addEventListener('click', this.confirmTaskHandler.bind(this, taskInput));
        
        document.body.append(addTaskModalEl);
    }
}

class App {
    static init() {
        App.parsing();
        const taskList = new TaskList('task');
        this.taskList = taskList;
        const taskLog = new TaskLog(this.taskList.taskList);
        this.taskLog = taskLog;
    }

    static updateTaskUI(taskList) {
        this.taskLog.updateUI(taskList);
    }

    static addTaskToList(task) {
        this.taskList.addTask(task);
    }

    static startAddTaskHandler() {
        new AddTaskModal();
    }

    static parsing() {
        const startAddTaskBtn = document.querySelector('.add-task-btn');

        startAddTaskBtn.addEventListener('click', App.startAddTaskHandler);
    }
}

App.init();