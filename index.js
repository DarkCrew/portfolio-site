import i18n from './translate.js';

let lang = 'en';
let theme = 'dark';

function setLocalStorage() {
    localStorage.setItem('lang', lang);
    localStorage.setItem('theme', theme);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    lang = localStorage.getItem('lang');
    getTranslate(lang);
    theme = localStorage.getItem('theme');
    changeLoadTheme(theme);
}
window.addEventListener('load', getLocalStorage);

/* Burger menu */
(function(){
    const bntBurgerMenu = document.querySelector('.header-burger-menu');
    const headerNav = document.querySelector('.header-nav');
    const headerNavLinks = document.querySelectorAll('.header-nav-link');

    bntBurgerMenu.addEventListener('click', function(){
        headerNav.classList.toggle('header-nav-active');
        if(bntBurgerMenu.classList.contains('active')){
            bntBurgerMenu.classList.remove('active');
            document.body.style.overflow = 'visible';
        }else{
            setTimeout(function(){
                bntBurgerMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
            }, 600);
        }
    });

    if(window.innerWidth <= 768) {
        for (let i = 0; i < headerNavLinks.length; i++){
            headerNavLinks[i].addEventListener('click', () => {
                bntBurgerMenu.classList.remove('active');
                headerNav.classList.remove('header-nav-active');
                document.body.style.overflow = 'visible';
            })
        }
    }
}());


/* Change images */
const portfolioBtns = document.querySelector('.portfolio-buttons-wrapper');
const portfolioBtn = document.querySelectorAll('.portfolio-button');
const portfolioImages = document.querySelectorAll('.portfolio-photo');

portfolioBtns.addEventListener('click', changeImage);

function changeImage(event) {
    if(event.target.classList.contains('portfolio-button')){
        portfolioBtn.forEach(elem => elem.classList.remove('portfolio-button-active'));
        portfolioImages.forEach((img, index) => img.src = `./assets/img/${event.target.dataset.season}/${index + 1}.jpg`);
        event.target.classList.add('portfolio-button-active');
    }
}


/* Change language */

const check = document.querySelectorAll('.header-language-settings input[name="header-language-choice"]');
check[0].addEventListener('click', changeLanguage);
check[1].addEventListener('click', changeLanguage);

function getTranslate(language) {
    const wordsToTranslate = document.querySelectorAll('[data-i18]');

    if (language === 'ru'){
        check[1].checked = true;
        wordsToTranslate.forEach((elem) => elem.textContent = i18n.ru[`${elem.dataset.i18}`]);
    }else if(language === 'en'){
        check[0].checked = true;
        wordsToTranslate.forEach((elem) => elem.textContent = i18n.en[`${elem.dataset.i18}`]);
    }else{
        console.log('I dont know this language!');
    }
};
function changeLanguage(){
    for(let i = 0; i < check.length; i++){
        if (check[0].checked){
            getTranslate('en'); 
            lang = 'en';   
        }else if(check[1].checked){
            getTranslate('ru');
            lang = 'ru';
        }
        else{
            console.log('I dont know this language!');
        }
    }
}


/* Change theme */
var changeThemeArrayNames = [
    '.header-nav-link','.body','.header-language-ru input[type="radio"]',
    '.header-language-en input[type="radio"]','.header-logo','.header','.hero','.hero-button',
    '.header-theme','.title-wrapper','.section-title','.portfolio-button','.order-shooting-button',
    '.contacts','.footer-social-item','.contact-input','.contact-button','.header-nav',
    '.header-burger-menu',
];

function changeLoadTheme(theme){
    if (theme == 'dark'){
        changeThemeArrayNames.forEach((element) => {
            let changeClassTheme = document.querySelectorAll(element);
            changeClassTheme.forEach(element => element.classList.remove('light-theme'));
        });
    }else if (theme == 'light'){
        changeThemeArrayNames.forEach((element) => {
            let changeClassTheme = document.querySelectorAll(element);
            changeClassTheme.forEach(element => element.classList.add('light-theme'));
        });
    }
}

const headerThemeButton = document.querySelector('.header-theme');
headerThemeButton.addEventListener('click', function(){
    if (theme == 'dark'){
        theme = 'light';
    }else if (theme = 'light'){
        theme = 'dark';
    }
    changeThemeArrayNames.forEach((element) => {
        let changeClassTheme = document.querySelectorAll(element);
        changeClassTheme.forEach(element => element.classList.toggle('light-theme'));
    });
});

/* Preload Images */

function preloadImages() {
    const seasons = ['winter', 'spring', 'summer', 'autumn'];
    seasons.forEach((elem) => {
        for (let i = 1; i <= 6; i++){
            const img = new Image();
            img.src = `./assets/img/${elem}/${i}.jpg`;
        }
    })
};
preloadImages();


/* Animate buttons */

const buttonRiple = document.querySelector('.ripple');

buttonRiple.addEventListener('click', function (e) {
    const x = e.clientX
    const y = e.clientY
  
    const buttonTop = e.target.offsetTop
    const buttonLeft = e.target.offsetLeft
  
    const xInside = x - buttonLeft
    const yInside = y - buttonTop
  
    const circle = document.createElement('span')
    circle.classList.add('circle')
    circle.style.top = yInside + 'px'
    circle.style.left = xInside + 'px'
  
    this.appendChild(circle)
  
    setTimeout(() => circle.remove(), 500)
});


/* Custom video-player */

const progressVideoPlayer = document.querySelector('.progress_video');
const progressVideoVolume = document.querySelector('.progress_volume');
const playerButtonPlay = document.querySelector('.player-button.play');
const playerBigButtonPlay = document.querySelector('.video-button-play');
const playerButtonVolume = document.querySelector('.player-button.volume');
const video = document.querySelector('.player_video');
const videoPoster = document.querySelector('.video-player-container-image');
let videoVolumeValue = video.volume; // current video volume
progressVideoVolume.value = 100; // current progress position of value (max = 100)


progressVideoPlayer.addEventListener('input', changeProgressValue);
progressVideoPlayer.addEventListener('input', setProgressVideo);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('click', toggleVideo);
playerButtonPlay.addEventListener('click', toggleVideo);
playerBigButtonPlay.addEventListener('click', deletePosterAndPlay);
playerButtonVolume.addEventListener('click', muteVideoVolume);
progressVideoVolume.addEventListener('input', changeProgressValue);
progressVideoVolume.addEventListener('input', setProgressVolume);


// functions

function toggleVideo () {
    if(video.paused){
        video.play();
        video.volume = 1;
        playerButtonPlay.classList.add('pause');
        playerBigButtonPlay.classList.add('remove-play');
    }else{
        video.pause();
        playerButtonPlay.classList.remove('pause');
        playerBigButtonPlay.classList.remove('remove-play');
    }
};

function setProgressVideo () {
    video.currentTime = (progressVideoPlayer.value * video.duration) / 100;
}

function setProgressVolume () {
    video.volume = progressVideoVolume.value / 100;
    if (video.volume == 0){
        playerButtonVolume.classList.add('mute');
    }else{
        playerButtonVolume.classList.remove('mute');
    }
}

function muteVideoVolume () {
    playerButtonVolume.classList.toggle('mute');
    if (playerButtonVolume.classList.contains('mute')){
        videoVolumeValue = video.volume; // save value before off volume
        video.volume = 0;
        progressVideoVolume.value = 0;
        progressVideoVolume.style.background = `linear-gradient(to right, rgb(189, 174, 130) 0%, rgb(189, 174, 130) ${0}%, rgb(200, 200, 200) ${0}%, rgb(200, 200, 200) 100%)`;
    }else {
        video.volume = videoVolumeValue;
        progressVideoVolume.value = videoVolumeValue * 100;
        progressVideoVolume.style.background = `linear-gradient(to right, rgb(189, 174, 130) 0%, rgb(189, 174, 130) ${videoVolumeValue * 100}%, rgb(200, 200, 200) ${videoVolumeValue * 100}%, rgb(200, 200, 200) 100%)`;
    }
}

function changeProgressValue () {
    const value = this.value;
    this.style.background = `linear-gradient(to right, rgb(189, 174, 130) 0%, rgb(189, 174, 130) ${value}%, rgb(200, 200, 200) ${value}%, rgb(200, 200, 200) 100%)`;
}

function updateProgress () {
    progressVideoPlayer.value = (video.currentTime / video.duration) * 100;
    progressVideoPlayer.style.background = `linear-gradient(to right, rgb(189, 174, 130) 0%, rgb(189, 174, 130) ${progressVideoPlayer.value}%, rgb(200, 200, 200) ${progressVideoPlayer.value}%, rgb(200, 200, 200) 100%)`;
    if ((video.currentTime / video.duration) === 1){
        playerBigButtonPlay.classList.remove('remove-play');
    }
}

function deletePosterAndPlay () {
    if (!videoPoster.classList.contains('close')){
        videoPoster.classList.add('close');
    }
    toggleVideo();
}











