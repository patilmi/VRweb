
function animateTwo(elemSelector, build, update, resize) {

    var params = {
        fitted: true
    }

    var elem = $(elemSelector);
    var two = new Two(params).appendTo(elem[0])
    
    function resized() {
        viewPort = {
            width: elem.width(),
            height: elem.height()
        }
        resize && resize(viewPort)
    }

    var viewPort;
    $(window).resize(resized)

    update && two.bind('update', (frameCount) => {
        update(frameCount, viewPort)
    });

    resized()

    build && build(two, viewPort)

    two.play()
    two.update()
}
