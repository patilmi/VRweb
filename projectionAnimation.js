

// Make an instance of two and place it on the page.
var params = {
    fullscreen: true
  };

  function init(){
    var elem = document.body;
    var two = new Two(params).appendTo(elem);
    
    // Two.js has convenient methods to make shapes and insert them into the scene.
  

    var width = 500;
    var height = 300;

    var center = 0.3;
    var ptScale = 1000;
    //var rect = two.makeRectangle(x, y, width, height);


    var point1 = [center - center/2, center - center/2, 0.4];
    var point2 = [center + center/2, center - center/2, 0.4];
    var point3 = [center + center/2, center + center/5, 0.4];
    var point4 = [center - center/2, center + center/5, 0.4];


    var line1 = new Two.Line(point1[0], point1[1], point2[0], point2[1]);
    two.add(line1);
    var line2 = two.makeLine(point2[0], point2[1], point3[0], point3[1]);
    var line3 = two.makeLine(point3[0], point3[1], point4[0], point4[1]);
    var line4 = two.makeLine(point4[0], point4[1], point1[0], point1[1]);

    
    //Rotation scheme
    //Rotation Matrix
    //Projection
    //apply rotation

    //update function should render

    //first projection


    function projectPoint(v) {
        var zHat = [0, 0, 1];
        var vDotZ = math.dot(v, zHat);
        return math.multiply(1/(1-vDotZ), math.subtract(v, math.multiply(vDotZ, zHat)))._data;
    }

    
    
    // Don’t forget to tell two to draw everything to the screen
    two.update();

    two.bind('update', update);
    two.play();

    // function update(frameCount) {
        
    //     //point 1 updates
    //     var p1xupdate = point1[0]*ptScale + 50*Math.sin(0.03*frameCount);
    //     var p1yupdate = point1[1]*ptScale + 30*Math.sin(0.02*frameCount);

    //     line1.vertices[0].set(p1xupdate, p1yupdate);
    //     line4.vertices[1].set(p1xupdate, p1yupdate);

    //     //point 2 updates
    //     var p2xupdate = point2[0]*ptScale + 35*Math.sin(0.01*frameCount);
    //     var p2yupdate = point2[1]*ptScale + 60*Math.sin(0.04*frameCount);

    //     line1.vertices[1].set(p2xupdate, p2yupdate);
    //     line2.vertices[0].set(p2xupdate, p2yupdate);

        
    //     //point 3 updates
    //     var p3xupdate = point3[0]*ptScale + 35*Math.sin(0.05*frameCount);
    //     var p3yupdate = point3[1]*ptScale + 25*Math.sin(0.02*frameCount);

    //     line2.vertices[1].set(p3xupdate, p3yupdate);
    //     line3.vertices[0].set(p3xupdate, p3yupdate);

    //     //point 4 updates
    //     var p4xupdate = point4[0]*ptScale + 27*Math.sin(0.06*frameCount);
    //     var p4yupdate = point4[1]*ptScale + 40*Math.sin(0.03*frameCount);

    //     line3.vertices[1].set(p4xupdate, p4yupdate);
    //     line4.vertices[0].set(p4xupdate, p4yupdate);


    // }

    

    function update(frameCount) {

        var factor = 0.00001;
        var alpha = 3;
        var beta = 2;
        var gamma = 6;

        var xy = alpha*factor;
        var xz = beta*factor;
        var yz = gamma*factor;

        var rotationRow1 = [1, xy, xz];
        var rotationRow2 = [-xy, 1, yz];
        var rotationRow3 = [-xz, -yz, 1];

        var rotationMatrix = math.matrix([rotationRow1, rotationRow2, rotationRow3]);

        for(i = 0; i < 100; i++) {
            point1 = math.multiply(rotationMatrix, point1);
            point2 = math.multiply(rotationMatrix, point2);
            point3 = math.multiply(rotationMatrix, point3);
            point4 = math.multiply(rotationMatrix, point4);
        }         

        
        var piPoint1 = projectPoint(point1);
        var piPoint2 = projectPoint(point2);
        var piPoint3 = projectPoint(point3);
        var piPoint4 = projectPoint(point4);

        line1.vertices[0].set(piPoint1[0]*ptScale, piPoint1[1]*ptScale);
        line1.vertices[1].set(piPoint2[0]*ptScale, piPoint2[1]*ptScale);
        line2.vertices[0].set(piPoint2[0]*ptScale, piPoint2[1]*ptScale);
        line2.vertices[1].set(piPoint3[0]*ptScale, piPoint3[1]*ptScale);
        line3.vertices[0].set(piPoint3[0]*ptScale, piPoint3[1]*ptScale);
        line3.vertices[1].set(piPoint4[0]*ptScale, piPoint4[1]*ptScale);
        line4.vertices[0].set(piPoint4[0]*ptScale, piPoint4[1]*ptScale);
        line4.vertices[1].set(piPoint1[0]*ptScale, piPoint1[1]*ptScale);
        
    }

    

  }

  