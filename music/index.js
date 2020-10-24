const ApiKey = 'DxLjJAwanMbbuH8qZMLEwu5ckEtnIrJWquNNlVrRae8'
let query = 'japanese'
const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${ApiKey}&orientation=landscape`
let canvas = document.getElementById('canvas')
let container = document.getElementsByClassName('container')[0]
const audio = new Audio();
audio.volume=0.05;

let AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
let audioContext = new AudioContext();//实例化

canvas.width = canvas.offsetWidth * window.devicePixelRatio;
canvas.height = canvas.offsetHeight * window.devicePixelRatio;
let ctx = canvas.getContext('2d');
let imgList = []
let playList = []
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
    }catch {
        console.error('get no song!')
    }
}

let dataArray;
// let source = audioContext.createMediaElementSource(audio);
async function findSongUrl(id) {
    let url = `http://127.0.0.1:83/song/media/outer/url?id=${id}`
    audio.src = url
    // let gainNode = audioContext.createGain();
    // source.connect(gainNode);
    // gainNode.connect(audioContext.destination);
    // audio.play();
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
const PI2 = Math.PI * 2
let progressPercent = 0

function renderProgress() {
    ctx.beginPath();
    ctx.strokeStyle = '#e9e9e9';
    ctx.lineWidth = lineWidth; 
    ctx.arc(canvas.width - radius - padding * 10, canvas.height/2, radius,0,PI2); 
    ctx.stroke();


    const { duration, currentTime } = audio;
    progressPercent = (currentTime / duration) * PI2
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = lineWidth; 
    ctx.arc(canvas.width - radius - padding * 10, canvas.height/2, radius,0,progressPercent); 
    ctx.stroke();
    
    ctx.translate(0,0)
    ctx.rotate(0)
    ctx.save()
    ctx.translate(canvas.width - radius - padding * 10,canvas.height/2);
    ctx.rotate(progressPercent);
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(radius, 0, 20,0,PI2); 
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.arc(radius, 0, 10,0,PI2); 
    ctx.fill();
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
    renderProgress()
    requestAnimationFrame(draw)
    // console.log(dataArray)
}

getImg()


canvas.addEventListener('click',() => {
    // let index = Math.floor(Math.random()*10)
    PlayIndex = (PlayIndex + 1) % playList.length
    findSongUrl(playList[PlayIndex].id)
    audio.play();
    // let imgurl = imgList[index].urls.full
    // container.style.backgroundImage = `url(${imgurl})`;
})

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