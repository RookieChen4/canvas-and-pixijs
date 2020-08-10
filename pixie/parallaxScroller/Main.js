const Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Graphics = PIXI.Graphics,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle,
    Container = PIXI.Container;
function Main() {
    this.app = null
    constructor() {
        this.app = new Application({
            width: 512,
            height: 384,                       
            antialias: true,
            transparent: false,
            resolution: 1,
            view: document.body
        })
        document.body.appendChild(app.view)
    }
}