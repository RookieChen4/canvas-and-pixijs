const colors = require("../constants/colors");
const fonts = require("../constants/fonts");

module.exports = (ctx,items) => {
  const width = ctx.displaySize.width
  let image = $cache.get("image")
  if(!image) {
    image = $image("../../assets/icon.png")
  }
  return {
    type: "vstack",
    props: {
      frame: {
        maxWidth: Infinity,
        maxHeight: Infinity,
      },
      alignment: $widget.horizontalAlignment.center,
      background: {
        type: "gradient",
        props: {
          startPoint: $point(0, 0), // {"x": 0, "y": 0}
          endPoint: $point(1, 1), // {"x": 0, "y": 1}
          colors: [
            $color("#B24592"),
            $color("#F15F79"),
          ]
        }
      }
    },
    views: [
      {
        type: "image",
        props: {
          image: image,
          cornerRadius: 50,
          resizable: true,
          scaledToFill: true,
          frame: {
            width: 100,
            height: 100,
            // alignment: $widget.alignment.center
          },
        }
      },
      {
        type: "text",
        props: {
          text: items.uname
        }
      }
    ]
  }
}