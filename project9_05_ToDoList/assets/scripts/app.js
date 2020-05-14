class Calendar {
    constructor() {
        this.monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.dayOfWeekList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.month = this.monthList[new Date().getMonth()];
        this.dayOfWeek = this.dayOfWeekList[new Date().getDay()];
        this.day = new Date().getDate();
    }

    render() {
        const dateEl = document.querySelector('.date');
        dateEl.innerHTML = `${this.dayOfWeek}, <span>${this.day} ${this.month}<span>`;
    }
    
    updateTimeUI() {
        this.month = this.monthList[new Date().getMonth()];
        this.dayOfWeek = this.dayList[new Date().getDay()];
        this.day = new Date().getDate();
        this.render();
    }
}

class CreatedTask {}

class CompleteTast {}

class Task {}

class AddTask {}

class App {}

const calendar = new Calendar();
calendar.render();