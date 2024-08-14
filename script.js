console.log("Welcome to spotify");

let songIndex=0;
let audio=new Audio("Songs/1.mp3");
let masterPlay=document.getElementById('masterPlay');
let gif=document.getElementById('gif');
let progressBar=document.getElementById('progressBar');
let songItem=Array.from(document.getElementsByClassName("songItem"));
let btn=Array.from(document.getElementsByClassName("play"));
let songNameBottom=document.getElementsByClassName("songbottom")[0]
let container=document.getElementsByClassName("container")
let curr1=document.getElementById("current1");
let curr=document.getElementById("current");
let dur=document.getElementById("duration");
let dur1=document.getElementById("duration1");
let back=document.getElementById("back");
let fwd=document.getElementById("fwd");
let count=0;
let songs=[
    {songName:"Sajni",filePath:"Songs/1.mp3",cover:"Cover/1.png"},
    {songName:"O Maahi",filePath:"Songs/2.mp3",cover:"Cover/2.png"},
    {songName:"Soulmate",filePath:"Songs/3.mp3",cover:"Cover/3.png"},
    {songName:"Tum Hi Ho",filePath:"Songs/4.mp3",cover:"Cover/4.png"},
    {songName:"Apna Bana Le",filePath:"Songs/5.mp3",cover:"Cover/5.png"},
    {songName:"Ve Kamleya",filePath:"Songs/6.mp3",cover:"Cover/6.png"},
    {songName:"Chaleya",filePath:"Songs/7.mp3",cover:"Cover/7.png"},
    {songName:"Satranga",filePath:"Songs/8.mp3",cover:"Cover/8.png"},
    {songName:"Main Tera Boyfriend",filePath:"Songs/9.mp3",cover:"Cover/9.png"},
    {songName:"Big Dawgs",filePath:"Songs/10.mp3",cover:"Cover/10.png"}
]

audio.currentTime=0

function formatTwoDigits(number) {
    return number.toString().padStart(2, '0');
}

window.addEventListener("keypress",(evt)=>{
    if (evt.key == " ") {       //Play/Pause using spacebar
        if(audio.paused || audio.currentTime<=0)
            {   
                console.log(songIndex)
                audio.play();
                masterPlay.classList.remove("fa-circle-play");
                masterPlay.classList.add("fa-circle-pause");
                gif.style.opacity=1;
                btn[songIndex].classList.add("fa-circle-pause")
                btn[songIndex].classList.remove("fa-circle-play")
                songItem[songIndex].classList.add("green");
                songItem[songIndex].classList.remove("songItem");
    
            }
         
        else{
                audio.pause();
                masterPlay.classList.add("fa-circle-play");
                masterPlay.classList.remove("fa-circle-pause");
                gif.style.opacity=0;
                btn[songIndex].classList.remove("fa-circle-pause")
                btn[songIndex].classList.add("fa-circle-play")
            }
    }

    if (evt.key=="l"){      //Skip 5sec
        audio.currentTime+=5;
    }
    else if (evt.key=="j"){     //Rewind 5sec
        audio.currentTime-=5;
    }   
})

masterPlay.addEventListener("click",()=>
{
    if(audio.paused || audio.currentTime<=0 )
    {   
        songItem[songIndex].classList.add("green");
        songItem[songIndex].classList.remove("songItem");
        
        audio.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity=1;
        btn[songIndex].classList.add("fa-circle-pause")
        btn[songIndex].classList.remove("fa-circle-play")
 
    }
    else
    {
        audio.pause();
        masterPlay.classList.add("fa-circle-play");
        masterPlay.classList.remove("fa-circle-pause");
        gif.style.opacity=0;
       
        
        btn.forEach((element,i)=>{
        element.classList.add("fa-circle-play")
        element.classList.remove("fa-circle-pause")

    })
    }
})

//Updating the time of the song xx:xx
function changeTime()
{
    curr1.innerText=formatTwoDigits(parseInt(audio.currentTime)%60);
    curr.innerText=formatTwoDigits(parseInt((audio.currentTime)/60));
    dur.innerText=formatTwoDigits(parseInt((audio.duration)/60));
    dur1.innerText=formatTwoDigits(parseInt((audio.duration)%60));
}

audio.addEventListener('timeupdate',()=>{
    let time=parseInt((audio.currentTime/audio.duration)*100)
    changeTime(); //Updates the time of the song
    //If the song has ended, play the next song
    if(time===100)
    {
        time=0;
        setTimeout(()=>{
        songIndex++;
        audio.src=`Songs/${songIndex+1}.mp3`
        audio.play()
        allPlay();  //Update the pplay button in the song list
        btn[songIndex].classList.add("fa-circle-pause") //Changes the play button for the current palying song
        btn[songIndex].classList.remove("fa-circle-play")
        songItem[songIndex].classList.add("green"); //Adds green background to the current playing song
        songItem[songIndex].classList.remove("songItem");
        masterPlay.classList.add("fa-circle-pause")
        masterPlay.classList.remove("fa-circle-play")
        songNameBottom.value=songs[songIndex+1].songName;
        songNameBottom.innerText=songs[songIndex+1].songName;},2000)
        
    }
    //Update the progress bar as the song progresses
    progress=parseInt((audio.currentTime/audio.duration)*100)
    progressBar.value=progress;
})

//Adding the seek functionality to the progress bar
progressBar.addEventListener('change',(element)=>{
    audio.currentTime=parseInt(element.target.value*audio.duration/100);
})

//Updating the song name and cover image
songItem.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].cover;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
    
})


function classupdate()
{
    btn[songIndex].classList.add("fa-circle-pause")
    btn[songIndex].classList.remove("fa-circle-play")
    songItem[songIndex].classList.add("green");
    songItem[songIndex].classList.remove("songItem");    
    masterPlay.classList.add("fa-circle-pause")
    masterPlay.classList.remove("fa-circle-play")
    songNameBottom.value=songs[songIndex].songName;
    songNameBottom.innerText=songs[songIndex].songName;
}

const allPlay=()=>{
    audio.currentTime=0;
    btn.forEach((element)=>{
        element.classList.add("fa-circle-play")
        element.classList.remove("fa-circle-pause")
        songItem[element.id].classList.remove("green"); //Adds green background to the current playing song
        songItem[element.id].classList.add("songItem");
})}

//Playing the song when the play button is clicked on the song list
btn.forEach((element,i)=>{
    element.addEventListener("click",(evt)=>{
    let pos=audio.currentTime;
    songIndex=parseInt(evt.target.id);
    //If the song is already playing, pause it
    if(evt.target.classList.contains("fa-circle-pause"))
    {
        if(count%2==0)
        {
            count+=2;
           audio.currentTime=pos;
           audio.pause();
           evt.target.classList.add("fa-circle-play")
           evt.target.classList.remove("fa-circle-pause")
           gif.style.opacity=0;
           masterPlay.classList.add("fa-circle-play")
           masterPlay.classList.remove("fa-circle-pause")
           return;
        }
    }
        allPlay();
        audio.src=`Songs/${(songIndex+1)}.mp3`;    
        audio.play();
        
        songItem[songIndex].classList.add("green");
        songItem[songIndex].classList.remove("songItem");
        evt.target.classList.add("fa-circle-pause")
        evt.target.classList.remove("fa-circle-play")
        masterPlay.classList.add("fa-circle-pause")
        masterPlay.classList.remove("fa-circle-play")
        
        gif.style.opacity=1; //Display the gif
        songNameBottom.value=songs[i].songName; //Display the song name at the bottom
        songNameBottom.innerText=songs[i].songName;
})

})

//Playing next song
fwd.addEventListener("click",()=>{
    if(songIndex>=9)
    {
        songIndex=0;
    }
    else
    {
        songIndex++;
    }
    
    audio.src=`Songs/${(songIndex+1)}.mp3`;
    audio.play();
    allPlay();
    classupdate();  
})

//Playing previous song
back.addEventListener("click",()=>{
    if(songIndex<=0)
    {
        songIndex=0;
    }
        
    else
    {
        songIndex--;
        
    }
    audio.src=`Songs/${(songIndex+1)}.mp3`;
    audio.play();
    console.log("This is the latest Song Index",songIndex)
    allPlay();
    classupdate();
})
