const play = document.querySelector(".play");
const backward = document.querySelector(".backward");
const forward = document.querySelector(".forward");
const background = document.querySelector(".background");
const img = document.querySelector(".img");
const song_artist = document.querySelector(".song-artist");
const song_title = document.querySelector(".song-title");
const time_bar = document.querySelector(".time-bar");
const time = document.querySelector(".time");
const progres_bar = document.querySelector(".progres-bar");
const progres = document.querySelector(".progres");
const sliderThumb = document.querySelector(".slider-thumb");
const download = document.querySelector(".download");
const audio = document.querySelector(".audio");

const songs = ["It's Goind Down Now", "Take Me Out", "Just The Two Of Us"];
const creators = ["Persona 3 Reload", "Franz Ferdinand", "Sagan girl"];
const imgArr = ["assets/music_img/persona3.jpg", "assets/music_img/Take_Me_Out.jpg", "assets/music_img/just_the_two_of_us.jpg"];
const songsMp3 = ["assets/music/It's_Goind_Down_Now.opus", "assets/music/Take_Me_Out.opus", "assets/music/Just_The_Two_Of_Us.opus"];
const timeArr = ["3:06", "3:57", "4:19"];
const color = ["#01aefb", "#f39904", "#ae3850"];

let songIndex = 0;
let isDragging = false;
let wasPlaying = false;

function loadSong(song, artist, imgg, mp3, time, color) {
    song_artist.innerHTML = artist;
    song_title.innerHTML = song;
    audio.src = mp3;
    img.style.backgroundImage = `url(${imgg})`;
    background.style.backgroundImage = `url(${imgg})`;
    time_bar.innerHTML = time;
    time_bar.style.color = color;
    song_artist.style.color = color;
    sliderThumb.style.backgroundColor = color;
}

function playSong() {
    play.classList.add('playing');
    audio.play();
    play.src = 'assets/icon/pause.png';
}

function pauseSong() {
    play.classList.remove('playing');
    audio.pause();
    play.src = 'assets/icon/play.png';
}

backward.addEventListener('click', () => {
    if (songIndex === 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex--;
    }
    loadSong(songs[songIndex], creators[songIndex], imgArr[songIndex], songsMp3[songIndex], timeArr[songIndex], color[songIndex]);
    playSong();
});

forward.addEventListener('click', () => {
    if (songIndex === songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex++;
    }
    loadSong(songs[songIndex], creators[songIndex], imgArr[songIndex], songsMp3[songIndex], timeArr[songIndex], color[songIndex]);
    playSong();
});

play.addEventListener('click', () => {
    const isPlaying = play.classList.contains('playing');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

function updateProgressBar(currentTime, duration) {
    const progressPercent = (currentTime / duration) * 100;
    progres.style.width = `${progressPercent}%`;
    sliderThumb.style.left = `${progressPercent}%`;
}

audio.addEventListener('timeupdate', () => {
    if (!isDragging) {
        updateProgressBar(audio.currentTime, audio.duration);
    }
    if (time) {
        time.textContent = formatTime(audio.currentTime);
    }
});

progres_bar.addEventListener('click', (e) => {
    const width = progres_bar.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
});

sliderThumb.addEventListener('mousedown', () => {
    isDragging = true;
    wasPlaying = !audio.paused;
    pauseSong();
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const rect = progres_bar.getBoundingClientRect();
        const width = progres_bar.clientWidth;
        let clickX = e.clientX - rect.left;

        if (clickX < 0) clickX = 0;
        if (clickX > width) clickX = width;

        const duration = audio.duration;
        const newTime = (clickX / width) * duration;

        updateProgressBar(newTime, duration);
        audio.currentTime = newTime;
    }
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        if (wasPlaying) {
            playSong();
        }
    }
});

audio.addEventListener('ended', () => {
    if (songIndex === songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex++;
    }
    loadSong(songs[songIndex], creators[songIndex], imgArr[songIndex], songsMp3[songIndex], timeArr[songIndex], color[songIndex]);
    playSong();
});

download.addEventListener('click', () => {
    const songSrc = audio.src;
    const link = document.createElement('a');
    link.href = songSrc;
    link.download = songSrc.split('/').pop();
    link.click();
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = Math.floor(seconds % 60);
    return `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
}

loadSong(songs[songIndex], creators[songIndex], imgArr[songIndex], songsMp3[songIndex], timeArr[songIndex], color[songIndex]);
