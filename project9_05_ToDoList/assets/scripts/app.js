class Calendar {
    constructor() {
        this.monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.dayOfWeekList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.date = new Date();
        this.month = this.monthList[this.date.getMonth()];
        this.day = this.date.getDate();
        this.dayOfWeek = this.dayOfWeekList[this.date.getDay()];
    }
    
    render() {
        const dateEl = document.querySelector('.date');
        dateEl.innerHTML = `${this.dayOfWeek}, <span>${this.day} ${this.month}<span>`;
        dateEl.lastElementChild.className = 'r-font-weight';
    }
}

class TaskLog {}

class TaskList {}

class Task {}

class AddTaskModal {
    render() {
        this.addTaskModalEl = document.querySelector('.add-task-modal');
        this.closeModalBtnEl = this.addTaskModalEl.children[1];
        this.backdropEl = document.getElementById('backdrop');

        this.addTaskModalEl.classList.add('visible');
        this.backdropEl.classList.add('visible');

        this.backdropEl.addEventListener('click', this.closeTaskModal.bind(this));
        this.closeModalBtnEl.addEventListener('click', this.closeTaskModal.bind(this));
    }

    closeTaskModal() {
        this.backdropEl.classList.remove('visible');
        this.addTaskModalEl.classList.remove('visible');
    }
}

class AddTaskBtn {
    constructor() {
        this.addTastBtnEl = document.querySelector('.add-task-btn');

        this.addTastBtnEl.addEventListener('click', this.addTaskHandler);
    }

    addTaskHandler() {
        App.startTaskModal();
    }
}

class App {
    static startTaskModal () {
        this.addTaskModal.render();
    }

    static init() {
        this.addTaskModal = new AddTaskModal();
        this.addTaskBtn = new AddTaskBtn();
        this.calendar = new Calendar();

        this.calendar.render();
    }
}

App.init();