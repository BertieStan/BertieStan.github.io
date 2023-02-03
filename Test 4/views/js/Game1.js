let playBtn = document.getElementById('play-btn')
let body = document.querySelector('body')
let gameTitle = document.getElementById('game-title')
let gameTitlePill = document.getElementById('game-title-pill-2')


//animation
window.onload = function () {
    setInterval(() => {
        gameTitlePill.style.visibility = 'visible'
    }, 1000);
    setInterval(() => {
        gameTitlePill.style.visibility = 'hidden'
    }, 2000)
}


//game page

//function Load() {
//    location.replace('gamePage.html')
//}