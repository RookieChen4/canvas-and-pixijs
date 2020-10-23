const ApiKey = 'DxLjJAwanMbbuH8qZMLEwu5ckEtnIrJWquNNlVrRae8'
let query = 'japanese'
const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${ApiKey}&orientation=landscape`
let canvas = document.getElementById('canvas')
let container = document.getElementsByClassName('container')[0]
const audio = document.getElementById('audio');
canvas.width = canvas.offsetWidth * window.devicePixelRatio;
canvas.height = canvas.offsetHeight * window.devicePixelRatio;
let ctx = canvas.getContext('2d');
let imgList = []
let playList = [
    {
        id: 1,
        name: 'satomoka - melt bitter'
    },
    {
        id: 2,
        name: '猫戦 - 鶴'
    },
    {
        id: 3,
        name: 'crap clap - The time'
    },
    {
        id: 4,
        name: 'pont - ディスコタウン'
    },
    {
        id: 5,
        name: 'ベルマインツ - 流星タクシー'
    },
    {
        id: 6,
        name: 'Dokkoise House - Free Throw(Album mix)'
    },
    {
        id: 7,
        name: 'FENNEC FENNEC - Going Down'
    },
    {
        id: 8,
        name: 'MELLOW MELLOW - WANING MOON'
    }
]
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

function getJsonP(url) {
    let script = document.createElement('script');
    script.src = `${url}?callback=gotSong`;
    script.type = 'application'
    document.body.append(script);
}
async function getImg() {
    try {
        imgList = (await request(url)).results
        container.style.backgroundImage = `url(${imgList[0].urls.full})`;
        draw()
    }catch {
        console.error('get no img!')
    }
}

async function findSong(id) {
    try {
        let url = `https://127.0.0.1:5500/song/media/outer/url?id=${id}`
        // request(url)
        request('https://127.0.0.1/')
    }catch {
        console.error('get no song!')
    }
}

function gotSong(data) {
    audio.src= data
    audio.play();
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
function renderText() {
    playList.forEach((it,index) => {
        ctx.fillStyle = "white";
        ctx.font = "24px Arial";
        ctx.textBaseline = "middle";
        if(PlayIndex == index) {
            ctx.font = "bold 30px Arial";
        }
        ctx.fillText(`0${index}. ${it.name}`, 100, 100 + index*34);
    })
}

let padding = 10
let height = 10
let pwidth = (canvas.width - padding*(playList.length-1)) / playList.length
function renderProgress() {
    let prewidth = 0
    for(let i = 0; i < playList.length; i++) {
        ctx.fillStyle = "white";
        ctx.fillRect(prewidth, canvas.height/2, pwidth, height)
        if(i <= PlayIndex) {
            ctx.fillStyle = "red";
            ctx.fillRect(prewidth, canvas.height/2, pwidth, height)
        }
        prewidth += pwidth
        prewidth += padding
    }
}

async function draw() {
    ctx.clearRect(0, 0,canvas.width,canvas.height);
    renderText()
    renderProgress()
    requestAnimationFrame(draw)
}

getImg()
findSong(1453336773)

canvas.addEventListener('click',() => {
    let index = Math.floor(Math.random()*10)
    PlayIndex = (PlayIndex + 1) % playList.length
    // let imgurl = imgList[index].urls.full
    // container.style.backgroundImage = `url(${imgurl})`;
})

window.addEventListener('resize', () => {
    console.log(canvas.width)
    // canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    // canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    // ctx = canvas.getContext("2d");
})