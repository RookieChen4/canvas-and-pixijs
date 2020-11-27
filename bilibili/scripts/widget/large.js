const colors = require("../constants/colors");
const fonts = require("../constants/fonts");

module.exports = (ctx, items) => {
  let image = $cache.get("image")
  const rankList = $cache.get("rankList")
  if(!image) {
    img = $image("assets/icon.png")
  }
  return {
    type: "vstack",
    props: {
      frame: {
        maxWidth: Infinity,
        maxHeight: Infinity,
      },
      background: {
        type: "gradient",
        props: {
          startPoint: $point(0, 0), // {"x": 0, "y": 0}
          endPoint: $point(1, 1), // {"x": 0, "y": 1}
          colors: [
            $color("#B24592"),
            $color("#ff7979"),
          ]
        }
      },
      padding: 20,
    },
    views: [
      {
        type: "vstack",
        props: {
          // alignment: $widget.horizontalAlignment.trailing,
          frame: {
            maxWidth: Infinity,
            maxHeight: Infinity,
          },
          // spacing: 10
        },
        views: rankList.map(element => (
          {
            type: "hstack",
            props: {
              frame: {
                maxWidth: Infinity,
                maxHeight: Infinity,
              },
              spacing: 10
            },
            views: [
              {
                type: "color",
                props: {
                  color: colors.systemBlue,
                  frame: {
                    width: 6,
                    maxHeight: Infinity,
                  },
                  cornerRadius: 3
                }
              },
              {
                type: "image",
                props: {
                  uri: element.pic,
                  resizable: true,
                  scaledToFill: true,
                  cornerRadius: 10,
                  frame: {
                    width: 100,
                    height: 50,
                    // alignment: $widget.alignment.center
                  },
                }
              },
              {
                type: "text",
                props: {
                  frame: {
                    maxWidth: Infinity,
                    height: 50,
                  },
                  text: element.title
                }
              }
            ]
          }
        ))
      }
    ]
  }
}