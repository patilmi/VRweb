

// Make an instance of two and place it on the page.
var params = {
    fullscreen: true
  };

  function init(){
    var elem = document.body;
    var two = new Two(params).appendTo(elem);
    
    // Two.js has convenient methods to make shapes and insert them into the scene.
  
    var x = two.width * 0.5;
    var y = two.height * 0.5;
    var width = 100;
    var height = 100;
    var rect = two.makeRectangle(x, y, width, height);
    
    // The object returned has many stylable properties:
    // And accepts all valid CSS color:

    rect.fill = 'rgb(0, 200, 255)';
    rect.opacity = 0.3;
    rect.noStroke();
    
    // Don’t forget to tell two to draw everything to the screen
    two.update();

  }

  