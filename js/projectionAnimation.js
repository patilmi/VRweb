
function initA() {

    var rect, port, ptScale;

    function build(two) {
        rect = Anim.build(two)
    }

    function resize(viewPort) {
        port = viewPort;
        ptScale = 2.5 * Math.min(port.width, port.height);
    }

    function update(frameCount) {
        const frequencyFactor = 0.05;

        //make it time based
        var dt = frameCount * frequencyFactor

        var rotationMatrix = getRotationMatrix(dt);
        rect.points = rect.points.map(p => math.multiply(rotationMatrix, p)._data)
        var piPoints = rect.points.map(p => projectPoint(p, ptScale))
        
        Anim.update(rect, piPoints, port)
    }

    animateTwo('#animation', build, update, resize)

    function projectPoint(v, scale) {
        var s = scale / (1 - v[2])
        return [v[0] * s, v[1] * s]
    }

    function getRotationMatrix(dt) {

        const factor = 0.0001;
        
        var alpha = 0.2,
            beta = Math.sin(dt),
            gamma = Math.cos(dt);

        var xy = alpha * factor;
        var xz = beta * factor;
        var yz = gamma * factor;

        var rotationRow1 = [1, xy, xz];
        var rotationRow2 = [-xy, 1, yz];
        var rotationRow3 = [-xz, -yz, 1];

        var rotationMatrix = math.matrix([rotationRow1, rotationRow2, rotationRow3]);

        return raiseToBinaryPower(rotationMatrix, 8)
    }

    function raiseToBinaryPower(matrix, power) {
        while (power-- > 0) {
            matrix = math.multiply(matrix, matrix);
        }
        return matrix;
    }
}
