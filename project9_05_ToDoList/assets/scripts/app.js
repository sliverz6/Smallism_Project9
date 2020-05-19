class LocalStorageHelper {
    static tasks = 'TASK-LIST';

    static updateStatusTask(taskId, value) {
        const taskList =LocalStorageHelper.getTask();

        const targetIndex = taskList.findIndex(task => task.id === taskId);
        taskList[targetIndex].isComplete = value;

        localStorage.setItem(this.tasks, JSON.stringify(taskList));
    }

    static getTask() {
        let taskList;
        if (localStorage.getItem(this.tasks) === null) {
            taskList = [];
        } else {
            taskList = JSON.parse(localStorage.getItem(this.tasks));
        }

        return taskList;
    }

    static AddTask(task) {
       const taskList = LocalStorageHelper.getTask(); 
       taskList.push(task);
       localStorage.setItem(this.tasks, JSON.stringify(taskList));
    }

    static removeTask(taskId) {
        const taskList = LocalStorageHelper.getTask();

        taskList.forEach((tsk, idx) => {
            if (tsk.id === taskId) {
                taskList.splice(idx, 1);
            }
        });

        localStorage.setItem(this.tasks, JSON.stringify(taskList));
    }
}

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
        this.taskNumEl.textContent = taskList.length >= 10 ? 
            `${taskList.length}` : 
            `0${taskList.length}`;

        let completeTaskNum = 0;
        for (const task of taskList) {
            if (task.isComplete === true) {
                completeTaskNum++;
            }
        }

        this.completeTaskNumEl.textContent = completeTaskNum >= 10 ?
            `${completeTaskNum}` :
            `0${completeTaskNum}`;
    }

}

class TaskList {
    taskList = [];

    constructor() {
        this.renderHook = document.querySelector('.task');
        this.taskList = LocalStorageHelper.getTask();
        this.render();
    }

    addTask(task) {
        this.taskList.push(task);

        LocalStorageHelper.AddTask(task);

        this.render();

        App.updateTaskUI(this.taskList);
    }

    completeTaskHandler(btn, task, taskContentEl) {
        const taskIndex = this.taskList.findIndex(tsk => tsk.id === task.id);
        let isComplete;
        
        if (!this.taskList[taskIndex].isComplete) {
            this.taskList[taskIndex].isComplete = true;
            isComplete = true;
            btn.innerHTML = `<i class="fas fa-check"></i>`;
            taskContentEl.classList.add('clicked');
        } else {
            this.taskList[taskIndex].isComplete = false;
            isComplete = false;
            btn.innerHTML = ``;
            taskContentEl.classList.remove('clicked');
        }

        LocalStorageHelper.updateStatusTask(task.id, isComplete);
        App.updateTaskUI(this.taskList);
    }

    deleteTaskHandler(taskEl, task) {
        const taskIndex = this.taskList.findIndex(tsk => tsk.id === task.id);
        this.taskList.splice(taskIndex, 1);
        
        this.renderHook.removeChild(taskEl);

        LocalStorageHelper.removeTask(task.id);

        App.updateTaskUI(this.taskList);
    }

    render() {
        this.renderHook.innerHTML = ``;

        this.taskList.forEach(task => {
            const taskEl = document.createElement('li');
            taskEl.className = 'task-list';
            let taskContentArea; 
            
            if (task.isComplete) {
                taskContentArea = `
                    <div class="task-list__contents clicked">
                        <button class="content__completed"><i class="fas fa-check"></i></button>
                        <p class="content__text">${task.content}</p>
                    </div> 
                `;
            } else {
                taskContentArea = `
                    <div class="task-list__contents">
                        <button class="content__completed"></button>
                        <p class="content__text">${task.content}</p>
                    </div>
                `;
            }
            taskEl.innerHTML = `
                ${taskContentArea}
                <button class="remove-task-btn"><i class="fas fa-trash-alt"></i></button>
            `;

            const completeTaskBtn = taskEl.querySelector('.content__completed')
            const taskContent = taskEl.querySelector('.task-list__contents');
            taskContent.addEventListener(
                'click', 
                this.completeTaskHandler.bind(this, completeTaskBtn, task, taskContent)
            );

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
            <h2 class="add-task-modal__title">To-do</h2>
            <input type="text" placeholder="Write your task.">
            <button class="close-add-modal-btn"><i class="fas fa-arrow-left"></i></button>
            <button class="confirm-add-modal-btn"><i class="fas fa-plus"></i></button>
        `;
        
        const closeModalBtn = addTaskModalEl.querySelector('.close-add-modal-btn');
        closeModalBtn.addEventListener('click', this.closeModal.bind(this));
        
        const taskInput = addTaskModalEl.querySelector('input');
        taskInput.addEventListener('keydown', event => {
            if (event.keyCode === 13) {
                this.confirmTaskHandler(taskInput);
            }
        })
        
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
        if (document.querySelector('.add-task-modal')) {
            return;
        }

        new AddTaskModal();
        document.querySelector('.add-task-modal input').focus();
    }

    static parsing() {
        const startAddTaskBtn = document.querySelector('.add-task-btn');

        startAddTaskBtn.addEventListener('click', App.startAddTaskHandler);

        new Calendar();
    }
}

App.init();