const video = document.querySelector('video');
const player = document.querySelector('.player');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const playBtn = player.querySelector('.toggle');
const skipBtns = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreenBtn = player.querySelector('.player__fullScreen');

let isChanging = false;

function playVideo(){   //pause and play video
    // if(video.paused){   //you can only check if video is paused
    //     video.play();
    // }else{
    //     video.pause();
    // }
    video[video.paused?'play':'pause']();
}

function updateButton(){
    playBtn.textContent = this.paused ? '►' : '❚ ❚';  //if paused change icon
}

function skipTime(){
    video.currentTime+=parseInt(this.dataset.skip); //I used attributes['data-skip'].value
}

function rangeUpdate(){
    video[this.name] = this.value;  //this.name is the name of property (valume, playbackRatio), and this.value is new value;
}

function progressUpdate(){
    const percent = (video.currentTime/video.duration)*100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    // console.log(e.offsetX); //position on the element 
    const scrubTime = (e.offsetX/progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
 
}

function fullScreenChange(){
    video.requestFullscreen();
}

//pause and play video
playBtn.addEventListener('click', playVideo);   //if clicked a button
video.addEventListener('click', playVideo); //if clicked video

//change the button textContent if video stops 
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', progressUpdate);   //UPDATE progress bar on time update

//skip 25 or -10
skipBtns.forEach(btn => btn.addEventListener('click', skipTime));

//change the volume and playbackRatio
ranges.forEach(elem=>elem.addEventListener('change',()=> isChanging=true));
ranges.forEach(elem=>elem.addEventListener('change', rangeUpdate));

ranges.forEach(elem=>elem.addEventListener('mousemove', rangeUpdate));
ranges.forEach(elem=>elem.addEventListener('mousedown', ()=>isChanging=true));
ranges.forEach(elem=>elem.addEventListener('mouseup', ()=>isChanging=false));
ranges.forEach(elem=>elem.addEventListener('mouseout',()=> isChanging=false));

//change the progress bar
let mouseDown = false;
progress.addEventListener('click',scrub);
progress.addEventListener('mousemove',()=>mouseDown && scrub);//if(mousedown){scrub};
progress.addEventListener('mousedown', ()=>mouseDown= true);
progress.addEventListener('mouseup', ()=>mouseDown = false);

//fullScreen
fullScreenBtn.addEventListener('click', fullScreenChange);