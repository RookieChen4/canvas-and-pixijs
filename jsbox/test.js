var getRandomColor = function(){    
    return  '#' + (function(color){    
         return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)])    
         && (color.length == 6) ?  color : arguments.callee(color);    
    })('');    
} 
$widget.setTimeline(ctx => {
    return {
      type: "hgrid",
      props: {
        rows: Array(4).fill({
          flexible: {
            minimum: 10,
            maximum: Infinity
          },
          spacing: 0,
          // alignment: $widget.alignment.left
        }),
        spacing: 0,
        // alignment: $widget.verticalAlignment.center
      },
      views: Array(4).fill({
        type: "vgrid",
        props: {
          columns: Array(2).fill({
            flexible: {
              minimum: 20,
              maximum: Infinity
            },
            // spacing: 0,
            // alignment: $widget.alignment.left
          }),
        //   spacing: 0,
          // alignment: $widget.horizontalAlignment.center
        },
        views: Array(2).fill({
          type: "text",
          props: {
            frame: {
                minWidth: 0,
                idealWidth: 200,
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
                        $color(getRandomColor(), getRandomColor()),
                        $color(getRandomColor(), getRandomColor()),
                    ]
                }
            }
        }
        })
      })
    }
  });