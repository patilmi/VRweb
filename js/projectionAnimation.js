
function initA() {

    var span = 0.1;
    var longSideScale = 1.3;
    var lineWidth = 4;
    var color = 'black';

    var point1, point2, point3, point4;
    var line1, line2, line3, line4;

    function build(two, port) {

        point1 = [-span * longSideScale, span, 0];
        point2 = [span * longSideScale, span, 0];
        point3 = [span * longSideScale, -span, 0];
        point4 = [-span * longSideScale, -span, 0];

        line1 = new Two.Line(point1[0], point1[1], point2[0], point2[1]);
        line2 = two.makeLine(point2[0], point2[1], point3[0], point3[1]);
        line3 = two.makeLine(point3[0], point3[1], point4[0], point4[1]);
        line4 = two.makeLine(point4[0], point4[1], point1[0], point1[1]);

        line1.linewidth = lineWidth;
        line2.linewidth = lineWidth;
        line3.linewidth = lineWidth;
        line4.linewidth = lineWidth;


        line1.stroke = color;
        line2.stroke = color;
        line3.stroke = color;
        line4.stroke = color;

        two.add(line1);
        two.add(line2);
        two.add(line3);
        two.add(line4);
    }

    var bodyWidth, bodyHeight, ptScale;

    function resize(port) {
        bodyWidth = port.width;
        bodyHeight = port.height;
        ptScale = ((bodyWidth + bodyHeight) / 2) * 1.5;
    }

    function projectPoint(v) {
        var zHat = [0, 0, 1];
        var vDotZ = math.dot(v, zHat);
        return math.multiply(1 / (1 - vDotZ), math.subtract(v, math.multiply(vDotZ, zHat)))._data;
    }

    function shiftPointToCenter(p) {

        var xShift = (bodyWidth / 2) / ptScale;
        var yShift = (bodyHeight / 2) / ptScale;
        var shifted = [p[0] + xShift, p[1] + yShift, p[2]];
        return shifted;
    }

    function update(frameCount) {


        //make it time based
        var factor = 0.00001;
        var frequencyFactor = 0.07;

        var sinFrameCount = Math.sin(frameCount * frequencyFactor);
        var cosFrameCount = Math.cos(frameCount * frequencyFactor);

        var angularRotationSpeed = 0;


        var alpha = angularRotationSpeed + 0 * Math.sin(frameCount * frequencyFactor);
        var beta = angularRotationSpeed + 20 * Math.pow(cosFrameCount, 1);
        var gamma = angularRotationSpeed + 20 * Math.pow(sinFrameCount, 1);

        var xy = alpha * factor;
        var xz = beta * factor;
        var yz = gamma * factor;

        var rotationRow1 = [1, xy, xz];
        var rotationRow2 = [-xy, 1, yz];
        var rotationRow3 = [-xz, -yz, 1];

        var rotationMatrix = math.matrix([rotationRow1, rotationRow2, rotationRow3]);

        for (i = 0; i < 100; i++) {
            point1 = math.multiply(rotationMatrix, point1);
            point2 = math.multiply(rotationMatrix, point2);
            point3 = math.multiply(rotationMatrix, point3);
            point4 = math.multiply(rotationMatrix, point4);
        }


        var piPoint1 = shiftPointToCenter(projectPoint(point1));
        var piPoint2 = shiftPointToCenter(projectPoint(point2));
        var piPoint3 = shiftPointToCenter(projectPoint(point3));
        var piPoint4 = shiftPointToCenter(projectPoint(point4));

        line1.vertices[0].set(piPoint1[0] * ptScale, piPoint1[1] * ptScale);
        line1.vertices[1].set(piPoint2[0] * ptScale, piPoint2[1] * ptScale);
        line2.vertices[0].set(piPoint2[0] * ptScale, piPoint2[1] * ptScale);
        line2.vertices[1].set(piPoint3[0] * ptScale, piPoint3[1] * ptScale);
        line3.vertices[0].set(piPoint3[0] * ptScale, piPoint3[1] * ptScale);
        line3.vertices[1].set(piPoint4[0] * ptScale, piPoint4[1] * ptScale);
        line4.vertices[0].set(piPoint4[0] * ptScale, piPoint4[1] * ptScale);
        line4.vertices[1].set(piPoint1[0] * ptScale, piPoint1[1] * ptScale);
    }

    animateTwo('#animation', build, update, resize)
}
