

// Make an instance of two and place it on the page.
var params = {
    fullscreen: true
  };

  function init(){
    var elem = document.body;
    var two = new Two(params).appendTo(elem);
    
    // Two.js has convenient methods to make shapes and insert them into the scene.
  

    var span = 0.1;
    var longSideScale = 1.3;
    var ptScale = 3000;

    var lineWidth = 4;
    //var rect = two.makeRectangle(x, y, width, height);


    var point1 = [-span*longSideScale, span, 0];
    var point2 = [span*longSideScale, span, 0];
    var point3 = [span*longSideScale, -span, 0];
    var point4 = [-span*longSideScale, -span, 0];


    var line1 = new Two.Line(point1[0], point1[1], point2[0], point2[1]);
    two.add(line1);
    var line2 = two.makeLine(point2[0], point2[1], point3[0], point3[1]);
    var line3 = two.makeLine(point3[0], point3[1], point4[0], point4[1]);
    var line4 = two.makeLine(point4[0], point4[1], point1[0], point1[1]);

    line1.linewidth = lineWidth;
    line2.linewidth = lineWidth;
    line3.linewidth = lineWidth;
    line4.linewidth = lineWidth;

    line1.stroke = 'yellow';
    line2.stroke = 'yellow';
    line3.stroke = 'yellow';
    line4.stroke = 'yellow';

    


    function projectPoint(v) {
        var zHat = [0, 0, 1];
        var vDotZ = math.dot(v, zHat);
        return math.multiply(1/(1-vDotZ), math.subtract(v, math.multiply(vDotZ, zHat)))._data;
    }

    function shiftPointToCenter(p, shift = 0.25) {

        var shifted = [p[0] + shift, p[1] + shift, p[2]];
        return shifted;
    }
    
    
    // Don’t forget to tell two to draw everything to the screen
    two.update();

    two.bind('update', update);
    two.play();

    function update(frameCount) {
        

        var shift = 700;



        var p1xupdate = point1[0]*ptScale + 75*Math.sin(0.09*frameCount) + 700;
        var p1yupdate = point1[1]*ptScale + 45*Math.sin(0.05*frameCount) + 700;
        var p2xupdate = point2[0]*ptScale + 80*Math.sin(0.08*frameCount) + 700;
        var p2yupdate = point2[1]*ptScale + 60*Math.sin(0.04*frameCount) + 700;
        var p3xupdate = point3[0]*ptScale + 70*Math.sin(0.05*frameCount) + 700;
        var p3yupdate = point3[1]*ptScale + 96*Math.sin(0.06*frameCount) + 700;
        var p4xupdate = point4[0]*ptScale + 58*Math.sin(0.06*frameCount) + 700;
        var p4yupdate = point4[1]*ptScale + 40*Math.sin(0.04*frameCount) + 700;





        line1.vertices[0].set(p1xupdate, p1yupdate);
        line4.vertices[1].set(p1xupdate, p1yupdate);
        
        line1.vertices[1].set(p2xupdate, p2yupdate);
        line2.vertices[0].set(p2xupdate, p2yupdate);
        
        line2.vertices[1].set(p3xupdate, p3yupdate);
        line3.vertices[0].set(p3xupdate, p3yupdate);

        line3.vertices[1].set(p4xupdate, p4yupdate);
        line4.vertices[0].set(p4xupdate, p4yupdate);


    }



    // function update(frameCount) {


        

    //     //make it time based
    //     var factor = 0.00001;
    //     var frequencyFactor = 0.07;

    //     var sinFrameCount = Math.sin(frameCount*frequencyFactor);
    //     var cosFrameCount = Math.cos(frameCount*frequencyFactor);

    //     var angularRotationSpeed = -1;


    //     var alpha = angularRotationSpeed + 0*Math.sin(frameCount*frequencyFactor);
    //     var beta = angularRotationSpeed + 20*Math.pow(cosFrameCount, 1);
    //     var gamma = angularRotationSpeed + 20*Math.pow(sinFrameCount, 1);

    //     var xy = alpha*factor;
    //     var xz = beta*factor;
    //     var yz = gamma*factor;

    //     var rotationRow1 = [1, xy, xz];
    //     var rotationRow2 = [-xy, 1, yz];
    //     var rotationRow3 = [-xz, -yz, 1];

    //     var rotationMatrix = math.matrix([rotationRow1, rotationRow2, rotationRow3]);

    //     for(i = 0; i < 100; i++) {
    //         point1 = math.multiply(rotationMatrix, point1);
    //         point2 = math.multiply(rotationMatrix, point2);
    //         point3 = math.multiply(rotationMatrix, point3);
    //         point4 = math.multiply(rotationMatrix, point4);
    //     }         

        
    //     var piPoint1 = shiftPointToCenter(projectPoint(point1));
    //     var piPoint2 = shiftPointToCenter(projectPoint(point2));
    //     var piPoint3 = shiftPointToCenter(projectPoint(point3));
    //     var piPoint4 = shiftPointToCenter(projectPoint(point4));

    //     line1.vertices[0].set(piPoint1[0]*ptScale, piPoint1[1]*ptScale);
    //     line1.vertices[1].set(piPoint2[0]*ptScale, piPoint2[1]*ptScale);
    //     line2.vertices[0].set(piPoint2[0]*ptScale, piPoint2[1]*ptScale);
    //     line2.vertices[1].set(piPoint3[0]*ptScale, piPoint3[1]*ptScale);
    //     line3.vertices[0].set(piPoint3[0]*ptScale, piPoint3[1]*ptScale);
    //     line3.vertices[1].set(piPoint4[0]*ptScale, piPoint4[1]*ptScale);
    //     line4.vertices[0].set(piPoint4[0]*ptScale, piPoint4[1]*ptScale);
    //     line4.vertices[1].set(piPoint1[0]*ptScale, piPoint1[1]*ptScale);
        
    // }




    

  }

  