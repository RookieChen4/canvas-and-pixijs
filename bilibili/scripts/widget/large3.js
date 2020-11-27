const { info } = require("console");
const colors = require("../constants/colors");
const fonts = require("../constants/fonts");

const logoHeight = 30
module.exports = (ctx, items) => {
  const fdata = $cache.get("fdata")
  const following = $cache.get("following")
  const followers = $cache.get("followers")
  const voice = $cache.get("voice")
  const videoList = $cache.get("videoList")
  return {
    type: "vstack",
    props: {
        alignment: $widget.verticalAlignment.top,
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
            $color("#ff7979"),
            $color("#ff7979"),
            $color("white"),
          ],
          opacity: 0.7
        }
      },
      padding: 15,
    },
    views: [
        {
            type: 'hstack',
            props: {
                frame: {
                    height: logoHeight,
                    maxWidth: Infinity
                }
            },
            views: [
                {
                    type: 'hstack',
                    props: {
                        frame: {
                            alignment: $widget.alignment.leading,
                            height: logoHeight,
                            maxWidth: Infinity
                        },
                        background: {
                            type: "color",
                            props: {
                                cornerRadius: 10,
                                color: $color("white"),
                            }
                        },
                        padding: $insets(0, 10, 0, 0)
                    },
                    views: [
                        {
                            type: 'image',
                            props: {
                                image: $image('assets/search.png'),
                                resizable: true,
                                scaledToFill: true,
                                frame: {
                                    height: logoHeight - 10,
                                    width: logoHeight - 10
                                },
                            }
                        },
                        {
                            type: "text",
                            props: {
                                frame: {
                                    // height: logoHeight,
                                },
                                text: voice,
                                color: $color("#bfbfbf")
                            }
                        }
                    ]
                },
                {
                    type: 'image',
                    props: {
                        image: $image('assets/logo.png'),
                        resizable: true,
                        scaledToFill: true,
                        frame: {
                            height: logoHeight,
                            width: logoHeight
                        }
                    }
                }
            ]
        },
        {
            type: "spacer"
        },
        {
            type: 'hstack',
            props: {
                frame: {
                    // maxHeight: Infinity,
                    maxWidth: Infinity
                }
            },
            views: [
                {
                    type: 'image',
                    props: {
                        uri: items.face,
                        resizable: true,
                        scaledToFill: true,
                        cornerRadius: 50,
                        frame: {
                            height: 100,
                            width: 100
                        }
                    }
                },
                {
                    type: "vstack",
                    props: {
                        alignment: $widget.horizontalAlignment.center,
                        spacing: 5,
                        frame: {
                            // maxHeight: Infinity,
                            maxWidth: Infinity
                        }
                    },
                    views: [
                        {
                            type: "text",
                            props: {
                                color: $color("white"),
                                text: items.uname
                            }
                        },
                        // {
                        //     type: "text",
                        //     props: {
                        //         color: $color("white"),
                        //         text: '个性签名:'
                        //     }
                        // },
                        {
                            type: "text",
                            props: {
                                color: $color("white"),
                                text: `关注数: ${fdata.following}  粉丝数: ${fdata.follower}`
                            }
                        },
                        {
                            type: "hstack",
                            views: [
                                {
                                    type: 'image',
                                    props: {
                                        image: $image('assets/coin2.png'),
                                        resizable: true,
                                        scaledToFill: true,
                                        frame: {
                                            height: 20,
                                            width: 20
                                        }
                                    }
                                },
                                {
                                    type: "text",
                                    props: {
                                        color: $color("white"),
                                        text: '0'
                                    }
                                },
                                {
                                    type: 'image',
                                    props: {
                                        image: $image('assets/coin.png'),
                                        resizable: true,
                                        scaledToFill: true,
                                        frame: {
                                            height: 20,
                                            width: 20
                                        }
                                    }
                                },
                                {
                                    type: "text",
                                    props: {
                                        color: $color("white"),
                                        text: `${items.money}`
                                    }
                                },
                            ]
                        }
                    ]
                }
            ]
        },
        {
            type: "divider",
            props: {
                // frame: {
                //     height: 2
                // },
                background: $color("#e74c3c"),
                opacity: 0.1
            }
        },
        {
            type: "spacer"
        },
        {
            type: 'text',
            props: {
                bold: true,
                color: $color("white"),
                text: '我的订阅'
            },
        },
        {
          type: 'hstack',
          views: videoList.map(it => ({
            type: 'vstack',
            props: {
              alignment: $widget.verticalAlignment.top,
            },
            views: [
              {
                type: 'image',
                props: {
                  uri: it.cover,
                  resizable: true,
                  scaledToFill: true,
                  frame: {
                      maxHeight: Infinity,
                      maxWidth: Infinity
                  }
                }
              },
              {
                type: 'hstack',
                views: [
                  {
                    type: 'color',
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
                    type: 'text',
                    props: {
                      text: it.title,
                      color: $color("white"),
                      font: {
                        size: 15,
                      }
                    }
                  }
                ]
              }
            ]
          }))
        },
    ]
  }
}