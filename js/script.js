document.addEventListener('keydown', (e) => {
    let dino = document.querySelector('.dino');

    if (e.key === 'ArrowUp') {
        dino.classList.add('animateDino'); 
        setTimeout(() => {
           dino.classList.remove('animateDino');
        }, 700);
    }
    
    if (e.key == 'ArrowLeft') {
        let dinoX = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left = (dinoX - 203) + 'px';
    }
    
    if (e.key === 'ArrowRight') {
        let dinoX = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left = dinoX + 203 + 'px';
    }
});
let music = new Audio('assets/music.mp3');
let gameovermusic = new Audio('assets/gameover.mp3');
music.play();
let score=0;
let cross = true;
let btn = document.getElementsByTagName('button')[0];

btn.addEventListener('click',(e)=>{
    location.reload();
})

setInterval(() => {
    let dino = document.querySelector('.dino');
    let gameOver = document.querySelector('.gameOver');
    let obstical = document.querySelector('.obstical');
    
    let dx = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
    let dy = parseInt(window.getComputedStyle(dino,null).getPropertyValue('top'));
    let ox = parseInt(window.getComputedStyle(obstical,null).getPropertyValue('left'));
    let oy = parseInt(window.getComputedStyle(obstical,null).getPropertyValue('top'));
    
    let offsetX = Math.abs(dx-ox);
    let offsetY =  Math.abs(dy-oy);
    gameovermusic.pause();
    if(offsetX<100 && offsetY<22){
        gameOver.style.display = 'block';
        obstical.classList.remove('animateObs');
        btn.style.display='block';
        let weltext = document.querySelector('.welcome');
        weltext.style.display='none';
        music.pause();
        gameovermusic.play();
        setTimeout(() => {
            gameovermusic.pause();
        }, 1000);
    }else if(offsetX<182 && cross){
            score++;
            updatescore(score)
            cross = false;
            setTimeout(() => {
                cross = true;
            }, 1000);
            setTimeout(() => {      
                let anidur= parseFloat(window.getComputedStyle(obstical,null).getPropertyValue('animation-duration'));
                let newDur = anidur - 0.5;
                obstical.style.animationDuration = newDur + 's'; 
            }, 500);
    }
    
}, 10);

function updatescore(score){
    let scoreDiv = document.querySelector('.score');
    scoreDiv.innerHTML = `Your Score: ${score}`
}


