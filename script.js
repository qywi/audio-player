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
const download = document.querySelector(".download");
const audio = document.querySelector(".audio");

const songs = ["It's Goind Down Now", "Take Me Out", "Just The Two Of Us"];
const creators = ["Persona 3 Reload", "Franz Ferdinand", "Sagan girl"];
const imgArr = ["assets/music_img/persona3.jpg", "assets/music_img/Take_Me_Out.jpg", "assets/music_img/just_the_two_of_us.jpg"];
const songsMp3 = ["assets/music/It's_Goind_Down_Now.opus", "assets/music/Take_Me_Out.opus", "assets/music/Just_The_Two_Of_Us.opus"];
const timeArr = ["3:06", "3:57", "4:19"]
const color = ["#01aefb", "#f39904", "#ae3850"]

let songIndex = 0;

function loadSong(song, artist, imgg, mp3, time, color) {
    song_artist.innerHTML = artist;
    song_title.innerHTML = song;
    audio.src = `${mp3}`;
    img.style.backgroundImage = `url(${imgg})`;
    background.style.backgroundImage = `url(${imgg})`;
    time_bar.innerHTML = time;
    time_bar.style.color  = color;
    song_artist.style.color  = color;
}

backward.addEventListener('click', () => {
    if (songIndex === 0) {
        songIndex = songs.length - 1;
    }
    else songIndex--;

    loadSong(songs[songIndex], creators[songIndex], imgArr[songIndex], songsMp3[songIndex], timeArr[songIndex], color[songIndex])
    playSong()
    return songIndex;
})

forward.addEventListener('click', () => {
    if (songIndex === songs.length - 1) {
        songIndex = 0;
    }
    else songIndex++;

    loadSong(songs[songIndex], creators[songIndex], imgArr[songIndex], songsMp3[songIndex], timeArr[songIndex], color[songIndex])
    playSong()
    return songIndex;
})

function playSong() {
    play.classList.add('playing');
    audio.play();
    play.src = 'assets/icon/pause.png'
}

function pauseSong() {
    play.classList.remove('playing');
    audio.pause();
    play.src = 'assets/icon/play.png'
}

play.addEventListener('click', () => {
    const isPlaying = play.classList.contains('playing');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
})

function updateProgress() {
    const duration = audio.duration;
    const currentTime = audio.currentTime;

    if (duration > 0) {
        const progressPercent = (currentTime / duration) * 100;
        progres.style.width = `${progressPercent}%`;
    }
}

audio.addEventListener('timeupdate', () => {
    updateProgress();

    if (time) {
        time.textContent = formatTime(audio.currentTime);
    }
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = Math.floor(seconds % 60);
    return `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

progres_bar.addEventListener('click', setProgress);

audio.addEventListener('ended', () => {
    if (songIndex === songs.length - 1) {
        songIndex = 0;
    }
    else songIndex++;

    loadSong(songs[songIndex], creators[songIndex], imgArr[songIndex], songsMp3[songIndex], timeArr[songIndex], color[songIndex])
    playSong()
    return songIndex;
})

download.addEventListener('click', () => {
    const songSrc = audio.src;
    const link = document.createElement('a'); 

    link.href = songSrc; 
    link.download = songSrc.split('/').pop(); 
    link.click();
});

loadSong(songs[songIndex], creators[songIndex], imgArr[songIndex], songsMp3[songIndex], timeArr[songIndex], color[songIndex])