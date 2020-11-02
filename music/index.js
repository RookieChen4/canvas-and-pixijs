const ApiKey = 'DxLjJAwanMbbuH8qZMLEwu5ckEtnIrJWquNNlVrRae8'
let query = 'japanese'
const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${ApiKey}&orientation=landscape`
let canvas = document.getElementById('canvas')
let container = document.getElementsByClassName('container')[0]
const audio = new Audio();
audio.crossOrigin = 'anonymous';
audio.volume=0.05;

let AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
let audioContext = new AudioContext();//实例化

let analyser = audioContext.createAnalyser();
analyser.fftSize = 256;
let bufferLength = analyser.frequencyBinCount;
let dataArray = new Uint8Array(bufferLength);

canvas.width = canvas.offsetWidth * window.devicePixelRatio;
canvas.height = canvas.offsetHeight * window.devicePixelRatio;
let ctx = canvas.getContext('2d');
let imgList = []
let playList = []

const img = new Image()

let x,y;
function request(url) {
    return fetch(url)
    .then(response => {
        if(response.status != 200) {
            throw new Error('Whoops!')
            return
        }
        return response.json()
    })
}

let playListId = '706754706'
async function getImg() {
    try {
        // imgList = (await request(url)).results
        // container.style.backgroundImage = `url(${imgList[0].urls.full})`;
        await findSong(playListId)
        findSongUrl(playList[0].id)
        draw()
    }catch {
        console.error('get no img!')
    }
}

async function findSong(id) {
    try {
        let url = `http://127.0.0.1:83/api/playlist/detail?id=${id}`
        playList = (await request(url)).playlist.tracks
        img.src = playList[0].al.picUrl
    }catch {
        console.error('get no song!')
    }
}

async function findSongUrl(id) {
    let url = `http://127.0.0.1:83/song/media/outer/url?id=${id}`
    audio.src = url
}



async function renderImg(imgUrl) {
    let img = new Image();
    return new Promise(resolve=>{
        img.onload = function() {
            ctx.drawImage(img,0,0,canvas.width,canvas.height);
            resolve(img)
        }
        img.src = 'https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE3NjU4NX0'
    })
}


let PlayIndex = 0
let fontSize = 36
function renderText() {
    playList.forEach((it,index) => {
        ctx.fillStyle = "white";
        ctx.font = `${fontSize}px Arial`;
        ctx.textBaseline = "middle";
        if(PlayIndex == index) {
            ctx.font = `bold ${fontSize+5}px Arial`;
        }
        ctx.fillText(`0${index}. ${it.name}`, 100, 100 + index*(fontSize+10));
    })
}

let padding = 10
let height = 10
function renderTag() {
    let pwidth = (canvas.width - padding*(playList.length-1)) / playList.length
    let prewidth = 0
    for(let i = 0; i < playList.length; i++) {
        ctx.fillStyle = "white";
        ctx.fillRect(prewidth, canvas.height-height-padding, pwidth, height)
        if(i <= PlayIndex) {
            ctx.fillStyle = "red";
            ctx.fillRect(prewidth, canvas.height-height-padding, pwidth, height)
        }
        prewidth += pwidth
        prewidth += padding
    }
}

let lineWidth = 15
let radius = canvas.width * 0.2
let pointRadius = 20
const PI2 = Math.PI * 2
let progressPercent = 0
let progressPointX = 0;
let progressPointY = 0;
let isOnProgressPoint = false
let moveProgressPoint = false
function renderProgress() {
    ctx.beginPath();
    ctx.strokeStyle = '#e9e9e9';
    ctx.lineWidth = lineWidth; 
    ctx.arc(canvas.width - radius - padding * 10, canvas.height/2, radius,0,PI2); 
    ctx.stroke();


    if(!moveProgressPoint) {
        const { duration, currentTime } = audio;
        progressPercent = (currentTime / duration) * PI2
    }
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = lineWidth; 
    ctx.arc(canvas.width - radius - padding * 10, canvas.height/2, radius,0,progressPercent); 
    ctx.stroke();
    

    progressPointX = canvas.width - radius - padding * 10 + radius*Math.cos(progressPercent)
    progressPointY = canvas.height/2 + radius*Math.sin(progressPercent)
    isOnProgressPoint = isInCircle(progressPointX,progressPointY,pointRadius,...translateMouse(x,y))
    pointRadius = isOnProgressPoint ? 30 : 20 
    ctx.translate(0,0)
    ctx.rotate(0)
    ctx.save()
    ctx.translate(canvas.width - radius - padding * 10,canvas.height/2);
    ctx.rotate(progressPercent);
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(radius, 0, pointRadius,0,PI2); 
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.arc(radius, 0, pointRadius/2,0,PI2); 
    ctx.fill();
    ctx.restore()
}

function renderVisualize() {
    let barWidth = (canvas.width / bufferLength) * 2.5;
    let barHeight;
    let x =0
    for(var i = 0; i < bufferLength; i++) {
        // ctx.fillRect(0,100,200,300);
        barHeight = dataArray[i];
        ctx.beginPath();
        ctx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
        ctx.fillRect(x,canvas.height-barHeight-height-padding-padding*0.5,barWidth,barHeight);
        x += barWidth + 1;
    }
}

let holeRadius = 60
function renderCover() {
    ctx.translate(0,0)
    ctx.rotate(0)
    ctx.save();
    ctx.beginPath();
    ctx.arc(canvas.width - radius - padding * 10, canvas.height/2, radius*0.9 ,0,PI2);
    ctx.moveTo(canvas.width - radius - padding * 10, canvas.height/2);
    ctx.arc(canvas.width - radius - padding * 10, canvas.height/2, holeRadius,0,PI2,true);
    ctx.clip();
    ctx.translate(canvas.width - radius - padding * 10,canvas.height/2);
    ctx.rotate(progressPercent * 5);
    ctx.drawImage(img, -radius, - radius,radius*2,radius*2);
    ctx.restore()
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    progressPercent = (currentTime / duration) * PI2
}


Math.ease = function (t, b, c, d) {
	t /= d;
	return -c * t*(t-2) + b;
};

async function draw() {
    ctx.clearRect(0, 0,canvas.width,canvas.height);
    renderText()
    renderTag()
    renderVisualize()
    renderProgress()
    renderCover()
    requestAnimationFrame(draw)
    analyser.getByteFrequencyData(dataArray);
}

getImg()


// canvas.addEventListener('click',() => {
//     // let index = Math.floor(Math.random()*10)
//     PlayIndex = (PlayIndex + 1) % playList.length
//     findSongUrl(playList[PlayIndex].id)
//     audio.play();
//     // let imgurl = imgList[index].urls.full
//     // container.style.backgroundImage = `url(${imgurl})`;
// })

// audio.addEventListener('timeupdate', updateProgress);

audio.addEventListener('ended', () => {
    PlayIndex = (PlayIndex + 1) % playList.length
    findSongUrl(playList[PlayIndex].id)
    audio.play();
});

function playSong() {
    audio.play();
}

window.addEventListener('resize', () => {
    console.log(canvas.width)
    // canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    // canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    // ctx = canvas.getContext("2d");
})

let centerX = canvas.width - radius - padding * 10
let centerY = canvas.height/2
canvas.addEventListener('mousemove', e => {
    x = e.offsetX;
    y = e.offsetY;
    if(moveProgressPoint) {
        const [x1,y1] = translateMouse(x,y)
        let angle = calcAngleDegrees(x1 - centerX, y1 - centerY)
        if(angle < 0) {
            audio.currentTime = audio.duration * (360 + angle)/360
            progressPercent = (360 + angle)/360 * PI2
        } else {
            audio.currentTime = audio.duration * angle/360
            progressPercent = angle/360 * PI2
        }
    }
});

canvas.addEventListener('mousedown', e => {
    if(isOnProgressPoint) {
        moveProgressPoint = true
    }
});

canvas.addEventListener('mouseup', e => {
    // if(moveProgressPoint) {
    //     // audio.duration = 
    // }
    moveProgressPoint = false
});

let source,gainNode;
source = audioContext.createMediaElementSource(audio);
gainNode = audioContext.createGain();

audio.addEventListener('play', () => {
    source&&source.disconnect()
    gainNode&&gainNode.disconnect()
    analyser&&analyser.disconnect()
    // Create variables to store mouse pointer Y coordinate
    // and HEIGHT of screen
    let CurY;
    let HEIGHT = window.innerHeight;
  
    // Get new mouse pointer coordinates when mouse is moved
    // then set new gain value
  
    // document.onmousemove = updatePage;
  
    // function updatePage(e) {
    //     CurY = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
  
    //     gainNode.gain.value = CurY/HEIGHT;
    //     audio.volume = CurY/HEIGHT;
    // }
  
  
    // connect the AudioBufferSourceNode to the gainNode
    // and the gainNode to the destination, so we can play the
    // music and adjust the volume using the mouse cursor
    source.connect(gainNode);
    source.connect(analyser);
    gainNode.connect(audioContext.destination);
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
});


function isInCircle(x1,y1,r,x2,y2) {
    let xRange = [x1 - r, x1 + r]
    let yRange = [y1 - r, y1 + r]
    if(x2 > xRange[0]&& x2 < xRange[1]&&y2>yRange[0]&&y2<yRange[1]) {
        return true
    }else {
        return false
    }
}

function translateMouse(x,y) {
    let q = canvas.width/window.innerWidth*x
    let b = canvas.height/window.innerHeight*y
    return [q,b]
}


function calculateAngle(x1,y1,x2,y2) {
    // 第一象限
    if(x1>x2&&y1>y2) {
        console.log(1)
    }
    // 第二象限
    if(x1<x2&&y1>y2) {
        console.log(2)
    }
    // 第三象限
    if(x1<x2&&y1<y2) {
        console.log(3)
    }
    // 第四象限
    if(x1>x2&&y1<y2) {
        console.log(4)
    }
}

function calcAngleDegrees(x, y) {
    return Math.atan2(y, x) * 180 / Math.PI;
}

window.onload = function() {
    let control = document.getElementsByClassName('control')[0]
    control.style.top = centerY * window.innerHeight /canvas.height + 'px'
    control.style.left = 100 * window.innerWidth /canvas.width + 'px'
    let play = document.getElementById('play')
    let pause = document.getElementById('pause')
    let next = document.getElementById('next')
    let pre = document.getElementById('pre')
    play.addEventListener('click',() => {
        audio.play();
        play.style.display = 'none'
        pause.style.display = 'block'
    },false)

    pause.addEventListener('click',() => {
        audio.pause();
        pause.style.display = 'none'
        play.style.display = 'block'
    },false)

    next.addEventListener('click',() => {
        PlayIndex = (PlayIndex + 1) % playList.length
        findSongUrl(playList[PlayIndex].id)
        img.src = playList[PlayIndex].al.picUrl
        audio.play();
        play.style.display = 'none'
        pause.style.display = 'block'
    },false)

    pre.addEventListener('click',() => {
        PlayIndex = (PlayIndex - 1) % playList.length
        if(PlayIndex < 0) {
            PlayIndex = 0
        }
        findSongUrl(playList[PlayIndex].id)
        img.src = playList[PlayIndex].al.picUrl
        audio.play();
        play.style.display = 'none'
        pause.style.display = 'block'
    },false)

    document.addEventListener('wheel',scrollVolume, false)
    function scrollVolume(e) {
        if(e.deltaY > 0) {
            // gainNode.gain.value -= 0.05;
            audio.volume -= 0.05;
        }else {
            // gainNode.gain.value += 0.05;
            audio.volume += 0.05;
        }
    }
}