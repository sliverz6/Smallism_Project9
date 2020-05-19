class Calendar {
    constructor() {
        this.dateEl = document.querySelector('.date');

        this.dayOfWeekList = ['Sunday', 'Monday', 'Tuseday', 'Wednesday', 'Thursday', 'friday', 'saturday'];
        this.monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        this.updateDate();
    }

    updateDate() {
        const date = new Date();
        const dayOfWeek = this.dayOfWeekList[date.getDay()];
        const month = this.monthList[date.getMonth()];
        const day = date.getDate();

        // Tursay,<span class="r-font-weight">14 May</span>
        this.dateEl.innerHTML = `${dayOfWeek}, <span class="r-font-weight">${day} ${month}</span>`;
    }
}

class TaskLog {
    constructor(taskList) {
        this.taskList = taskList;

        this.taskNumEl = document.querySelector('.created-number');
        this.completeTaskNumEl = document.querySelector('.completed-number');

        this.updateUI(taskList);
    }

    updateUI(taskList) {
        this.taskNumEl.textContent = `0${taskList.length}`;

        let completeTaskNum = 0;
        for (const task of taskList) {
            if (task.isComplete === true) {
                completeTaskNum++;
            }
        }
        this.completeTaskNumEl.textContent = `0${completeTaskNum}`;
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

    completeTaskHandler(btn, task) {
        const taskIndex = this.taskList.findIndex(tsk => tsk.id === task.id);

        if (!this.taskList[taskIndex].isComplete) {
            this.taskList[taskIndex].isComplete = true;
            btn.innerHTML = `<i class="fas fa-check content__completed__icon"></i>`;
        } else {
            this.taskList[taskIndex].isComplete = false;
            btn.innerHTML = ``;
        }

        App.updateTaskUI(this.taskList);
    }

    deleteTaskHandler(taskEl, task) {
        const taskIndex = this.taskList.findIndex(tsk => tsk.id === task.id);
        this.taskList.splice(taskIndex, 1);
        
        this.renderHook.removeChild(taskEl);

        App.updateTaskUI(this.taskList);
    }

    render() {
        if (this.taskList.length === 0) {
            return;
        }

        this.renderHook.innerHTML = ``;

        this.taskList.forEach(task => {
            const taskEl = document.createElement('li');
            taskEl.className = 'list-items';
            const taskCheckBtn = task.isComplete === true ? 
                ` <button class="content__completed"><i class="fas fa-check content__completed__icon"></i></button>` :
                `<button class="content__completed"></button>`;
            taskEl.innerHTML = `
                ${taskCheckBtn}
                <p class="content__text">${task.content}</p>
                <button class="remove-task-btn"><i class="fas fa-trash-alt"></i></button>
            `;

            const completeTaskBtn = taskEl.querySelector('.content__completed')
            completeTaskBtn.addEventListener('click', this.completeTaskHandler.bind(this, completeTaskBtn, task));

            const deleteTaskBtn = taskEl.querySelector('.remove-task-btn');
            deleteTaskBtn.addEventListener('click', this.deleteTaskHandler.bind(this, taskEl, task));

            this.renderHook.append(taskEl);
        }) 
    }
}

class Task {
    constructor(content, isComplete, id) {
        this.content = content;
        this.isComplete = isComplete;
        this.id = id;
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

        const task = new Task(taskInputValue, false, Math.random());
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

        new Calendar();
    }
}

App.init();