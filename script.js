console.log("Welcome to Spotify");

document.addEventListener('DOMContentLoaded', function() {
    let songIndex = 0;
    let audioElement = new Audio();
    let masterPlay = document.getElementById('masterPlay');
    let myProgressBar = document.getElementById('myProgressBar');
    let gif = document.getElementById('gif');
    let masterSongName = document.getElementById('masterSongName');
    let songItems = Array.from(document.getElementsByClassName('songItem'));

    let songs = [
        { songName: "Husn", filePath: "songs/Husn.mp3", coverPath: "covers/HusnCover.webp" },
        { songName: "Baarishein", filePath: "songs/Baarishein.mp3", coverPath: "covers/BaarisheinCover.webp" },
        { songName: "Alag Aasman", filePath: "songs/Alag-Aasmaan.mp3", coverPath: "covers/Alag-AasmaanCover.jpg" },
        { songName: "Antriksh", filePath: "songs/Antariksh.mp3", coverPath: "covers/AntrikshCover.jpg" },
        { songName: "Gul", filePath: "songs/Gul.mp3", coverPath: "covers/GulCover.jpg" },
        { songName: "Riha", filePath: "songs/Riha.mp3", coverPath: "covers/RihaCover.jpg" },
    ]

    songItems.forEach((element, i) => {
        element.getElementsByTagName("img")[0].src = songs[i].coverPath;
        element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    })

    masterPlay.addEventListener('click', () => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.src = songs[songIndex].filePath;
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
        } else {
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        }
    });

    audioElement.addEventListener('timeupdate', () => {
        progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        myProgressBar.value = progress;
    });

    myProgressBar.addEventListener('change', () => {
        audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
    });

    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
        element.addEventListener('click', (e) => {
            songIndex = index;
            audioElement.src = songs[songIndex].filePath;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        });
    });

    document.getElementById('next').addEventListener('click', () => {
        songIndex = (songIndex + 1) % songs.length;
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });

    document.getElementById('previous').addEventListener('click', () => {
        songIndex = (songIndex - 1 + songs.length) % songs.length;
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});
