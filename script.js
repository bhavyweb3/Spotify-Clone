console.log("SCRIPT.JS LOADED");

// INITIALIZE VARIABLES

let songIndex = 0;

let audioElement = new Audio();

let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");

let songItems = Array.from(document.getElementsByClassName("songItem"));


// SONG LIST

let songs = [
    {
        songName: "Warriyo - Mortals [NCS Release]",
        filePath: "song/1.mp3",
        coverPath: "covers/1.jpg"
    },

    {
        songName: "Cielo - Huma-Huma",
        filePath: "song/2.mp3",
        coverPath: "covers/2.jpg"
    },

    {
        songName: "DEAF KEV - Invincible [NCS Release]",
        filePath: "song/3.mp3",
        coverPath: "covers/3.jpg"
    },

    {
        songName: "Different Heaven & EH!DE - My Heart [NCS Release]",
        filePath: "song/4.mp3",
        coverPath: "covers/4.jpg"
    },

    {
        songName: "Janji - Heroes Tonight feat. Johnning",
        filePath: "song/5.mp3",
        coverPath: "covers/5.jpg"
    },

    {
        songName: "Rabba - Salam-e-Ishq",
        filePath: "song/6.mp3",
        coverPath: "covers/6.jpg"
    },

    {
        songName: "Friends",
        filePath: "song/7.mp3",
        coverPath: "covers/7.jpg"
    },

    {
        songName: "Cheap Thrills",
        filePath: "song/8.mp3",
        coverPath: "covers/8.jpg"
    },

    {
        songName: "Hymn For The Weekend",
        filePath: "song/9.mp3",
        coverPath: "covers/9.jpg"
    },

    {
        songName: "Attention",
        filePath: "song/10.mp3",
        coverPath: "covers/10.jpg"
    }
];


// LOAD FIRST SONG

audioElement.src = songs[songIndex].filePath;

masterSongName.innerText = songs[songIndex].songName;


// PLAY / PAUSE MASTER BUTTON

masterPlay.addEventListener("click", function () {

    if (audioElement.paused || audioElement.currentTime <= 0) {

        audioElement.play()
            .then(() => {
                console.log("Song is playing");

                masterPlay.classList.remove("fa-circle-play");
                masterPlay.classList.add("fa-circle-pause");

                gif.style.opacity = 1;
            })
            .catch((error) => {
                console.error("Audio playback error:", error);
            });

    } else {

        audioElement.pause();

        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");

        gif.style.opacity = 0;
    }
});


// UPDATE PROGRESS BAR

audioElement.addEventListener("timeupdate", function () {

    if (audioElement.duration) {

        let progress =
            parseInt(
                (audioElement.currentTime / audioElement.duration) * 100
            );

        myProgressBar.value = progress;
    }
});


// CHANGE SONG USING PROGRESS BAR

myProgressBar.addEventListener("input", function () {

    if (audioElement.duration) {

        audioElement.currentTime =
            (myProgressBar.value * audioElement.duration) / 100;
    }
});


// RESET PLAY BUTTON WHEN SONG ENDS

audioElement.addEventListener("ended", function () {

    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");

    gif.style.opacity = 0;

    myProgressBar.value = 0;
});


// SONG ITEM PLAY BUTTONS

let songItemPlays =
    document.getElementsByClassName("songItemPlay");

Array.from(songItemPlays).forEach(function (element) {

    element.addEventListener("click", function (e) {

        let clickedIndex = parseInt(e.target.id);

        console.log("Clicked song:", clickedIndex);

        // Change current song
        songIndex = clickedIndex;

        // Load selected song
        audioElement.src = songs[songIndex].filePath;

        // Update song name
        masterSongName.innerText =
            songs[songIndex].songName;

        // Play selected song
        audioElement.play()
            .then(() => {

                console.log(
                    "Playing:",
                    songs[songIndex].filePath
                );

                masterPlay.classList.remove("fa-circle-play");
                masterPlay.classList.add("fa-circle-pause");

                gif.style.opacity = 1;
            })
            .catch((error) => {

                console.error(
                    "Could not play song:",
                    error
                );
            });

        // Reset all song buttons
        Array.from(songItemPlays).forEach(function (el) {

            el.classList.remove("fa-circle-pause");
            el.classList.add("fa-circle-play");

        });

        // Change clicked button to pause
        element.classList.remove("fa-circle-play");
        element.classList.add("fa-circle-pause");

    });
});


// PREVIOUS BUTTON

document.getElementById("previous").addEventListener("click", function () {

    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    audioElement.src = songs[songIndex].filePath;

    masterSongName.innerText =
        songs[songIndex].songName;

    audioElement.play();

    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");

    gif.style.opacity = 1;

    myProgressBar.value = 0;
});


// NEXT BUTTON

document.getElementById("next").addEventListener("click", function () {

    songIndex++;

    if (songIndex >= songs.length) {
        songIndex = 0;
    }

    audioElement.src = songs[songIndex].filePath;

    masterSongName.innerText =
        songs[songIndex].songName;

    audioElement.play();

    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");

    gif.style.opacity = 1;

    myProgressBar.value = 0;
});


// AUDIO ERROR CHECK

audioElement.addEventListener("error", function () {

    console.error(
        "❌ AUDIO ERROR: Could not load",
        audioElement.src
    );

});