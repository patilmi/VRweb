
function initR() {

    const amplitudes = [[16, 13], [15, 22], [20, 20], [13, 12]],
        freqencies = [[90, 100], [80, 46], [54, 62], [70, 110]],
        qScale = 0.001;
        
    var rect, port, ptScale;

    function resize(viewPort) {
        port = viewPort;
        ptScale = 2 * Math.min(port.width, port.height);
    }

    function build(two) {
        rect = Anim.build(two)
    }

    function update(frameCount) {

        var dt = frameCount / 1000
        
        var animatedPoints = rect.points.map((point, index) => {
            var amp = amplitudes[index]
            var freq = freqencies[index]
            return [0, 1]
                .map(i => point[i] + qScale * amp[i] * Math.sin(freq[i] * dt))
                .map(c => c * ptScale)
        })

        Anim.update(rect, animatedPoints, port)
    }

    animateTwo('#randomAnimation', build, update, resize)
}
