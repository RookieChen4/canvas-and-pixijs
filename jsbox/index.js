var getRandomColor = function(){    
    return  '#' + (function(color){    
         return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)])    
         && (color.length == 6) ?  color : arguments.callee(color);    
    })('');    
} 
$widget.setTimeline(ctx => {
    switch (ctx.family) {
      case $widgetFamily.small:
        return {
            type: "hgrid",
            props: {
              rows: Array(2).fill({
                flexible: {
                    minimum: 10,
                    maximum: Infinity
                },
                spacing: 0
              }),
              spacing: 0
            },
            views: Array(4).fill({
                type: "text",
                props: {
                    frame: {
                        minWidth: 0,
                        idealWidth: 100,
                        maxWidth: Infinity,
                        minHeight: 0,
                        idealHeight: 100,
                        maxHeight: Infinity,
                    },
                    background: {
                        type: "gradient",
                        props: {
                            startPoint: $point(0, 0), // {"x": 0, "y": 0}
                            endPoint: $point(1, 1), // {"x": 0, "y": 1}
                            locations: [0,1],
                            colors: [
                                $color('#ff5f6d'),
                                $color('#ffc371')
                            ]
                        }
                    }
                }
              })
          }       
      case $widgetFamily.medium:
        return {
            type: "hgrid",
            props: {
              rows: Array(4).fill({
                flexible: {
                    minimum: 10,
                    maximum: Infinity
                },
                spacing: 0
              }),
              spacing: 0
            },
            views: Array(16).fill({
                type: "text",
                props: {
                    frame: {
                        minWidth: 0,
                        idealWidth: 100,
                        maxWidth: Infinity,
                        minHeight: 0,
                        idealHeight: 100,
                        maxHeight: Infinity,
                    },
                    background: {
                        type: "gradient",
                        props: {
                            startPoint: $point(0, 0), // {"x": 0, "y": 0}
                            endPoint: $point(1, 1), // {"x": 0, "y": 1}
                            locations: [0, 1],
                            colors: [
                                $color('#BA5370'),
                                $color('#F4E2D8')
                            ]
                        }
                    }
                }
              })
          }
      case $widgetFamily.large:
        return {
            type: "hgrid",
            props: {
              rows: Array(4).fill({
                flexible: {
                    minimum: 10,
                    maximum: Infinity
                },
                spacing: 0
              }),
              spacing: 0
            },
            views: Array(32).fill({
                type: "text",
                props: {
                    frame: {
                        minWidth: 0,
                        idealWidth: 100,
                        maxWidth: Infinity,
                        minHeight: 0,
                        idealHeight: 100,
                        maxHeight: Infinity,
                    },
                    background: {
                        type: "gradient",
                        props: {
                            startPoint: $point(0, 0), // {"x": 0, "y": 0}
                            endPoint: $point(1, 1), // {"x": 0, "y": 1}
                            locations: [0, 1],
                            colors: [
                                $color('#EECDA3'),
                                $color('#EF629F')
                            ]
                        }
                    }
                }
              })
          }
    }
  });