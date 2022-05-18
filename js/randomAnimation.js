



function initR() {

    var span = 0.1;
    var lineWidth = 4;
    var color = 'black';

    var bodyWidth, bodyHeight, ptScale;

    var point1, point2, point3, point4;
    var line1, line2, line3, line4;

    function resize(port) {
        bodyWidth = port.width;
        bodyHeight = port.height;
        ptScale = ((bodyWidth + bodyHeight) / 2) * 1.5;
    }

    function build(two, port) {
        longSideScale = (bodyWidth / bodyHeight) * .3;

        point1 = [-span * longSideScale, span, 0];
        point2 = [span * longSideScale, span, 0];
        point3 = [span * longSideScale, -span, 0];
        point4 = [-span * longSideScale, -span, 0];


        line1 = new Two.Line(point1[0], point1[1], point2[0], point2[1]);
        two.add(line1);
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

    }

    function update(frameCount) {

        var shiftRight = bodyWidth / 2;
        var shiftDown = bodyHeight / 2;

        var p1xupdate = point1[0] * ptScale + 16 * Math.sin(0.09 * frameCount) + shiftRight;
        var p1yupdate = point1[1] * ptScale + 13 * Math.sin(0.1 * frameCount) + shiftDown;
        var p2xupdate = point2[0] * ptScale + 15 * Math.cos(0.08 * frameCount) + shiftRight;
        var p2yupdate = point2[1] * ptScale + 22 * Math.cos(0.04 * frameCount) + shiftDown;
        var p3xupdate = point3[0] * ptScale + 20 * Math.sin(0.05 * frameCount) + shiftRight;
        var p3yupdate = point3[1] * ptScale + 20 * Math.sin(0.06 * frameCount) + shiftDown;
        var p4xupdate = point4[0] * ptScale + 13 * Math.sin(0.07 * frameCount) + shiftRight;
        var p4yupdate = point4[1] * ptScale + 12 * Math.cos(0.11 * frameCount) + shiftDown;

        line1.vertices[0].set(p1xupdate, p1yupdate);
        line4.vertices[1].set(p1xupdate, p1yupdate);

        line1.vertices[1].set(p2xupdate, p2yupdate);
        line2.vertices[0].set(p2xupdate, p2yupdate);

        line2.vertices[1].set(p3xupdate, p3yupdate);
        line3.vertices[0].set(p3xupdate, p3yupdate);

        line3.vertices[1].set(p4xupdate, p4yupdate);
        line4.vertices[0].set(p4xupdate, p4yupdate);
    }

    animateTwo('#randomAnimation', build, update, resize)
}
