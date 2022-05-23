var Anim = (function () {

    const
        unitSquare = [[-1, 1], [1, 1], [1, -1], [-1, -1]],
        length = 0.1,
        breadth = 0.135,
        lineWidth = 4,
        color = 'black';

    function buildRect(two) {

        var points = unitSquare.map(point => {
            return [point[0] * breadth, point[1] * length, 0]
        })

        var lines = points.map(() => {
            var line = two.makeLine(0, 0, 0, 0)
            line.linewidth = lineWidth
            line.stroke = color
            return line
        })

        return {
            points: points,
            lines: lines,
            count: points.length
        }
    }

    function updateLines(rect, animatedPoints, port) {

        var center = animatedPoints.reduce((p1, p2) => {
            return [p1[0] + p2[0], p1[1] + p2[1]]
        },
            [0, 0]
        )
            .map(coord => coord / rect.count)

        var shift = [
            port.width / 2 - center[0],
            port.height / 2 - center[1]
        ]

        rect.lines.forEach((line, index) => {
            [0, 1].map(i => {
                var p = animatedPoints[(index + i) % rect.count]
                line.vertices[i].set(p[0] + shift[0], p[1] + shift[1])
            })
        });
    }

    return {
        build: buildRect,
        update: updateLines
    }
})()
