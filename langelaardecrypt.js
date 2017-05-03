function extractText() {
    var Height = img.height,
    Width = img.width,
    n = maskMatrix.length,
    countZero = 0,
    countOne = 0;

    for (var i = 0; i < n; i++)
        for (var j = 0; j < n; j++)
            if (maskMatrix[i][j] == 0) countZero++;
    countOne = n*n - countZero;

    var keyIterator = -1;
    for (var i = 0; i < Height - n; i += n) {
        for (var j = 0; j < Width - n; j += n) {
            var sumZero = 0,
            sumOne = 0;
            keyIterator++;
            for (var k = 0; k < n; k++)
                for (var l = 0; l < n; l++) {
                    if (maskMatrix[k][l] == 1) sumOne += hsvMatrix[i+k][j+l].v;
                    if (maskMatrix[k][l] == 0) sumZero += hsvMatrix[i+k][j+l].v;
                }
            var avBrightnessOne = sumOne/countOne;
            var avBrightnessZero = sumZero/countZero;

            if (avBrightnessOne > avBrightnessZero) keyArray[keyIterator] = 0;
            else keyArray[keyIterator] = 1;
        }
    }
    var blob = new Blob(keyArray, {type: "text/plain;charset=utf-8"});
    saveAs(blob, "key_extracted.txt");
}

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    img = new Image(),
    hsvMatrix = [],
    keyArray = [],
    maskMatrix = [];


document.getElementById("bmpstegoupload").addEventListener("change", function(){draw("bmpstegoupload", img)}, false);
document.getElementById("maskupload").addEventListener("change", function(){readMask()}, false);
document.getElementById("extractButton").addEventListener("click", extractText, false);
