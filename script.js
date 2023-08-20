console.log("welcome to clone");

//initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItems'));

let songs=[
    {songName:"I Wanna Be Yours - Arctic Monkeys", filePath:"songs/1.mp3 " , coverPath:"covers/1.webp" },
    {songName:"bad drugs - King Kavelier", filePath:"songs/2.mp3 " , coverPath:"covers/3.webp" },
    {songName:"Dream on - Aeristocerat", filePath:"songs/3.mp3 " , coverPath:"covers/7.webp" },
    {songName:"Arrabella", filePath:"songs/4.mp3 " , coverPath:"covers/1.webp" },
    {songName:"Moonlight - dhruv", filePath:"songs/5.mp3 " , coverPath:"covers/4.webp" },
    {songName:"Summertime Sadness - Lana Del Ray", filePath:"songs/6.mp3 " , coverPath:"covers/6.webp" },
    {songName:"airplane thoughts - dhruv", filePath:"songs/7.mp3 " , coverPath:"covers/4.webp" },
    {songName:"Wonderwall - Oasis", filePath:"songs/8.mp3 " , coverPath:"covers/2.webp" },
    {songName:"Cloudy now (Remasterd) - Blackfield", filePath:"songs/9.mp3 " , coverPath:"covers/5.webp" },
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("span")[0].innerText = songs[i].songName;
})
//audio.Element.play();

//handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle')
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
//listen to events
audioElement.addEventListener('timeupdate', ()=>{
    
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);

    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration ) / 100 ;
}) 

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
        audioElement.src ='songs/$(songIndex+1).mp3';
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
   
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex +=1;
    }
    audioElement.src ='songs/$(songIndex+1).mp3';
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -=1;
    }
    audioElement.src ='songs/$(songIndex+1).mp3';
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})