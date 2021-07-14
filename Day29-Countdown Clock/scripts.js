let countDown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    //clear any existing timers
    clearInterval(countDown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);
    // console.log({ now, then });
    countDown = setInterval(() => {
        const secLeft = Math.round((then - Date.now()) / 1000);
        //check for stop

        if (secLeft < 0) {
            clearInterval(countDown);
            return;
        }
        displayTimeLeft(secLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60; //TO REMEMBER!!!
    const display = `${minutes}:${remainderSeconds < 10 ? `0`: ``}${remainderSeconds}`;
    timerDisplay.textContent = display;
    document.title = display;//change the page title to timer
    console.log({ minutes, remainderSeconds });
}

function displayEndTime(timeStamp){
    const end = new Date(timeStamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
     
    endTime.textContent = `Be back at ${hour}:${minutes}`;

}

function startTimer(){
    const seconds = parseInt(this.dataset.time);    //data atr val is text so it has to be parsed
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    console.log(mins);
    timer(mins * 60);
    this.reset();
});