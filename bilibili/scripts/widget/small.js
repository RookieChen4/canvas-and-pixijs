const colors = require("../constants/colors");
const fonts = require("../constants/fonts");

module.exports = (ctx,items) => {
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
          uri: items.face,
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