class Calendar {

    constructor() {
        this.monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.month = this.monthList[new Date().getMonth()];
        this.day = this.dayList[new Date().getDay()];
        this.date = new Date().getDate();
    }

    render() {

    }
    
    updateTimeUI() {
        this.month = new Date().getMonth() + 1;
        this.day = this.dayList[new Date().getDay()];
        this.date = new Date().getDate();
    }
}

class CreatedTask {}

class CompleteTast {}

class Task {}

class AddTask {}

class App {}

const calendar = new Calendar();