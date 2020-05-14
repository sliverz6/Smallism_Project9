class Calendar {
    constructor() {
        this.dayList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        this.month = new Date().getMonth() + 1;
        this.day = dayList[new Date().getDay()];
        this.date = new Date().getDate();
    }

    render() {

    }
    
    updateTimeUI() {
        this.month = new Date().getMonth() + 1;
        this.day = dayList[new Date().getDay()];
        this.date = new Date().getDate();
    }
}

class CreatedTask {}

class CompleteTast {}

class Task {}

class AddTask {}

class App {}

const calendar = new Calendar();