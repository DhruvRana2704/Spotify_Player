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
window.addEventListener("keypress",(evt)=>{
    console.log(evt.key)
    if (evt.key == " ") {
        if(audio.paused || audio.currentTime<=0 )
            {   
                console.log(songIndex   )
                audio.play();
                masterPlay.classList.remove("fa-circle-play");
                masterPlay.classList.add("fa-circle-pause");
                gif.style.opacity=1;
    
            }
         
            else
            {
                audio.pause();
                masterPlay.classList.add("fa-circle-play");
                masterPlay.classList.remove("fa-circle-pause");
                gif.style.opacity=0;
            }
        
    }
    if (evt.key=="l") {
        console.log("Right Key Pressed")
        // audio.currentTime=(audio.currentTime/audio.duration)*100+5;
        audio.currentTime+=5;
    }
    else if (evt.key=="j") {
        console.log("Left Key Pressed")
        // audio.currentTime=(audio.currentTime/audio.duration)*100+5;
        audio.currentTime-=5;
    }   


})
let back=document.getElementById("back");
let fwd=document.getElementById("fwd");
audio.currentTime=0
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
    {songName:"HanumanKind",filePath:"Songs/10.mp3",cover:"Cover/10.png"}
]


masterPlay.addEventListener("click",()=>
{
    if(audio.paused || audio.currentTime<=0 )
    {   
        console.log(songIndex   )
        audio.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity=1;
        console.log("Index",songIndex)
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


audio.addEventListener('timeupdate',()=>{
    
    if(parseInt((audio.currentTime/audio.duration)*100)==100)
    {
        
        setTimeout(()=>{
            songIndex++;
            audio.src=`songs/${songIndex+1}.mp3`
        audio.play()
        allPlay();
        btn[songIndex].classList.add("fa-circle-pause")
        btn[songIndex].classList.remove("fa-circle-play")
        songNameBottom.value=songs[songIndex].songName;
        songNameBottom.innerText=songs[songIndex].songName;
        masterPlay.classList.add("fa-circle-pause")
        masterPlay.classList.remove("fa-circle-play")},2000)
       
        
    }
        progress=parseInt((audio.currentTime/audio.duration)*100)
        progressBar.value=progress;
})

progressBar.addEventListener('change',(element)=>{
    audio.currentTime=parseInt(element.target.value*audio.duration/100);
})

songItem.forEach((element,i)=>{

    element.getElementsByTagName("img")[0].src=songs[i].cover;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
    
})

const allPlay=()=>{
    audio.currentTime=0;
    btn.forEach((element)=>{
        element.classList.add("fa-circle-play")
        element.classList.remove("fa-circle-pause")
})}

btn.forEach((element,i)=>{
    element.addEventListener("click",(evt)=>{
        songIndex=parseInt(evt.target.id);
        if(evt.target.classList.contains("fa-circle-pause"))
            {
                let pos=audio.currentTime;
                count+=2;
                console.log(count)
                if(count%2==0)
                    {
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
        evt.target.classList.add("fa-circle-pause")
        evt.target.classList.remove("fa-circle-play")
        gif.style.opacity=1;
        masterPlay.classList.add("fa-circle-pause")
        masterPlay.classList.remove("fa-circle-play")
        audio.src=`Songs/${(songIndex+1)}.mp3`;    
        audio.play();
       
        songNameBottom.value=songs[i].songName;
        songNameBottom.innerText=songs[i].songName;
})

})

fwd.addEventListener("click",(evt)=>{
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
    console.log("This is the latest Song Index",songIndex)
    allPlay();
    btn[songIndex].classList.add("fa-circle-pause")
    btn[songIndex].classList.remove("fa-circle-play")
    songNameBottom.value=songs[songIndex].songName;
    songNameBottom.innerText=songs[songIndex].songName;
    masterPlay.classList.add("fa-circle-pause")
    masterPlay.classList.remove("fa-circle-play")
    
})

back.addEventListener("click",(evt)=>{
    console.log("Here I am",songIndex)
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
    btn[songIndex].classList.add("fa-circle-pause")
    btn[songIndex].classList.remove("fa-circle-play")
    songNameBottom.value=songs[songIndex].songName;
    songNameBottom.innerText=songs[songIndex].songName;
    masterPlay.classList.add("fa-circle-pause")
    masterPlay.classList.remove("fa-circle-play")
    
})
  