const colors = require("../constants/colors");
const fonts = require("../constants/fonts");

module.exports = (ctx, items) => {
  return {
    type: "hstack",
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
      spacing: 0,
    },
    views: [
      {
        type: "zstack",
        props: {
          frame: {
            maxHeight: Infinity,
          },
          padding: $insets(0, 20, 0, 20),
          background: {
            type: "gradient",
            props: {
              startPoint: $point(0, 0), // {"x": 0, "y": 0}
              endPoint: $point(1, 1), // {"x": 0, "y": 1}
              colors: [
                $color('#ecf0f1'),
                $color('clear'),
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
                alignment: $widget.alignment.center
              },
            }
          },
        ]
      },
      {
        type: "vstack",
        props: {
          frame: {
            maxWidth: Infinity,
          },
          alignment: $widget.horizontalAlignment.center,
        },
        views: [
          {
            type: "text",
            props: {
              // background: {
              //   type: "gradient",
              //   props: {
              //     startPoint: $point(0, 0), // {"x": 0, "y": 0}
              //     endPoint: $point(1, 1), // {"x": 0, "y": 1}
              //     colors: [
              //       $color('clear'),
              //       $color('#ecf0f1'),
              //     ]
              //   }
              // },
              frame: {
                maxWidth: Infinity,
                maxHeight: Infinity,
              },
              text: `LV${items.level_info.current_level} ${items.uname}`
            }
          },
          {
            type: "text",
            props: {
              // background: {
              //   type: "gradient",
              //   props: {
              //     startPoint: $point(0, 0), // {"x": 0, "y": 0}
              //     endPoint: $point(1, 1), // {"x": 0, "y": 1}
              //     colors: [
              //       $color('#16BFFD'),
              //       $color('#CB3066'),
              //     ]
              //   }
              // },
              frame: {
                maxWidth: Infinity,
                maxHeight: Infinity,
              },
              text: `硬币数 ${items.money}`
            }
          },
          {
            type: "text",
            props: {
              // background: {
              //   type: "gradient",
              //   props: {
              //     startPoint: $point(0, 0), // {"x": 0, "y": 0}
              //     endPoint: $point(1, 1), // {"x": 0, "y": 1}
              //     colors: [
              //       $color('#ff4b1f'),
              //       $color('#ff9068'),
              //     ]
              //   }
              // },
              frame: {
                maxWidth: Infinity,
                maxHeight: Infinity,
              },
              text: `${items.vip_label.label_theme} ${items.vip_label.text}`
            }
          }
        ]
      }
    ]
  }
}