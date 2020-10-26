let counter = 0;
let bestTime = counter;
let status = 0;
let timer;

/*      GRAPHIC     */
let timeFormatter = (time) => {
    let innerTime = time.toFixed(3);
        formattedTime = String(innerTime);
        if (innerTime < 10) {
            formattedTime = '0'+String(innerTime);
        }
    return formattedTime;
}

let container = document.getElementById('container');

/*  Container Lights    */
let lightsDiv = document.createElement('div');
lightsDiv.innerHTML = `<div class="lights"></div>`
container.appendChild(lightsDiv);

/*  Container Lighter   */
let contLights = document.querySelector('.lights');
    for (i = 1; i <= 5; i++) {
        let lighterDiv = document.createElement('div');
        lighterDiv.innerHTML = `<div class="lighter lighter${i}"></div>`
    contLights.appendChild(lighterDiv);
    }

/*  Container Lighter-inside   */
let contLighter = document.querySelectorAll('.lighter');

for (lighterN = 0; lighterN < contLighter.length; lighterN++) {
    for (i = 1; i <= 4; i++) {
        let lighterInDiv = document.createElement('div');
        lighterInDiv.innerHTML = `<div class="light"></div>`
        if (i>2) {lighterInDiv.innerHTML = `<div class="light light-last-${lighterN}"></div>`};
    contLighter[lighterN].appendChild(lighterInDiv);
    };
};

/*  Timer       */
let timerDiv = document.createElement('div');
timerDiv.innerHTML = `
    <p class='base-text'>Click your mouse... bla-bla-bla...</p>
    <p class='base-text counter'>${timeFormatter(counter)}</p>
    <p class='base-text bestTime'>Your best time: ${timeFormatter(bestTime)}</p>
    `;
container.appendChild(timerDiv);
/*------------------------------------------------------------------------*/

/*          LOGIC               */
/*status:
0 - nothing
1 - starting counting
2 - waiting for click
3 - falsestart
*/

let turnLightOn = (num) => {
    let lightOn = document.getElementsByClassName(`light-last-${num}`);
    lightOn[0].style.background = 'red';
    lightOn[1].style.background = 'red';
}

let turnLightOff = () => {
    let lightOff = document.getElementsByClassName(`light`);
    for (i=0; i <= lightOff.length-1; i++) {
    lightOff[i].style.background = '#444';
    }
}


let restartLap = () => {
    turnLightOff();
    let place = document.getElementsByClassName(`counter`);
        place[0].innerText = `${timeFormatter(0)}`;
}
         

let firstClick = () => {
    let i = 0;
    let cuntdown = setInterval(() => {
        turnLightOn(i++);
    }, 1000);
    setTimeout(() => { 
        clearInterval(cuntdown);
        randomCounter();                
    }, 5000);
};


randomCounter = () => {
        let timerDelay = Math.random()*3000;
        setTimeout(() => {
            if (status == 1) {
                status=2;
                intervalTimer('start');
                turnLightOff();
            } else if (status == 3) {
                restartLap();
                status = 0;
            };
        }, timerDelay);
};


intervalTimer = (change) => {
    if (change == 'start') {
    let firstTime = Date.now();
    let place = document.getElementsByClassName(`counter`);
    timer = setInterval(() => {
        counter = Date.now() - firstTime;
        place[0].innerText = `${timeFormatter(counter/1000)}`;
    },1)
    } else if (change == 'stop') {
        clearInterval(timer);
        if (bestTime == 0) {
            bestTime = counter;
        }
        bestTime = Math.min(counter, bestTime);
        showResult();
    }
};


showResult = () => {
    status = 0;
    let place = document.getElementsByClassName(`bestTime`);
        place[0].innerText = `Your best time: ${timeFormatter(bestTime/1000)}`;
    
}



addEventListener('click', function(event) {
    switch (status) {
        case 0:
            restartLap();
            status = 1;
            firstClick();
        break;
        case 1:
            let place = document.getElementsByClassName(`counter`);
            place[0].innerText = `Фальстарт!`;
            status = 3;
        break;
        case 2:
            intervalTimer('stop');
        break;
    }
})

