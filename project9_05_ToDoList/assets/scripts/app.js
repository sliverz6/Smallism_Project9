class Calendar {
    monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    dayOfWeekList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    getNewTime() {
        this.date = new Date();
        this.month = this.monthList[this.date.getMonth()];
        this.day = this.date.getDate();
        this.dayOfWeek = this.dayOfWeekList[this.date.getDay()];
    }
    
    render() {
        this.getNewTime();
        const dateEl = document.querySelector('.date');
        dateEl.innerHTML = `${this.dayOfWeek}, <span>${this.day} ${this.month}<span>`;
        dateEl.lastElementChild.className = 'r-font-weight';
    }
}

class CreatedTask {}

class CompleteTast {}

class Task {}

class AddTask {
    constructor() {
        // this.addTastBtn = document.
    }

    addNewTast() {
        
    }
}

class App {
    static init() {
        new Calendar().render();
    }
}

App.init();