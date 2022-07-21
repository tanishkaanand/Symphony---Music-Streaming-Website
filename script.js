console.log("Welcome to Symphony");
//Initialize variables
let songIndex = 0;
let audioElement = new Audio('Songs/moonlight.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let songItems = Array.from(document.getElementsByClassName('songItem'));


let songs = [
    { songName: "Moonlight Sonata No.14 - 1st movement", filePath: "Songs/1.mp3", coverPath: "Songs/covers/Beethoven 2.jpg"},

    { songName: "Beethoven - Für Elise", filePath: "Songs/2.mp3", coverPath: "Songs/covers/Beethoven.png"},

    { songName: "Liszt's Liebestraum No.3", filePath: "Songs/3.mp3", coverPath: "Songs/covers/Liszt's Liebestraum.jpg"},

    { songName: "Grieg's Arietta (Lyric Piece Op.12 No.1)", filePath: "Songs/4.mp3", coverPath: "Songs/covers/Edvard Greig.jpg"},

    { songName: "Fauré's Berceuse (Lullaby) from the Dolly Suite", filePath: "Songs/5.mp3", coverPath: "Songs/covers/Gabriel Faure.jpg"},

    { songName: "Wolfgang Amadeus Mozart - Symphony No. 40", filePath: "Songs/6.mp3", coverPath: "Songs/covers/Mozart.jpg"},

    { songName: "Juventino Rosas - Over the Waves", filePath: "Songs/7.mp3", coverPath: "Songs/covers/Juventino Rosas.jpg"},

    { songName: "Beethoven-Minuet-in-G", filePath: "Songs/8.mp3", coverPath: "Songs/covers/Beethoven.png"},

    { songName: "Grieg's Holberg Suite (3rd movement: Gavotte)", filePath: "Songs/9.mp3", coverPath: "Songs/covers/Edvard Greig.jpg"},
]

songItems.forEach((element,i)=>{
    console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
})

//Handle Play pause Click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');

    }

})
//Listen to Events

audioElement.addEventListener('timeupdate', () => {
    //Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})
    //Manipulate song with seekbar  
myProgressBar.addEventListener('change', ()=>{
       audioElement.currentTime=myProgressBar.value * audioElement.duration/100;
})

//Play all songs 
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
element.addEventListener('click', (e)=>{    
     makeAllPlays();
    songIndex = parseInt(e.target.id);
    e.target.classList.remove('fa-play-circle');
    e.target.classList.add('fa-pause-circle');
    masterSongName.innerText=songs[songIndex].songName;

    audioElement.src = `Songs/${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
   })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=8){
    songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src = `Songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
       songIndex=8;
    }
    else{
        songIndex-=1;
    }
    audioElement.src = `Songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
