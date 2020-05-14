class Calendar {
    monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    dayOfWeekList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    render() {
        this.date = new Date();
        this.month = this.monthList[this.date.getMonth()];
        this.day = this.date.getDate();
        this.dayOfWeek = this.dayOfWeekList[this.date.getDay()];

        const dateEl = document.querySelector('.date');
        dateEl.innerHTML = `${this.dayOfWeek}, <span>${this.day} ${this.month}<span>`;
    }
}

class CreatedTask {}

class CompleteTast {}

class Task {}

class AddTask {}

class App {
    static init() {
        new Calendar().render();
    }
}

App.init();