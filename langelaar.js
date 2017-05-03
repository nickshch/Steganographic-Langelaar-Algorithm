function rgbToHsv() {
  var width = img.width;
  var height = img.height;
  var imageData = ctx.getImageData(0, 0, width, height);
  var data = imageData.data;

  var hsvX = 0,
      hsvY = 0;
  hsvMatrix = Array.matrix(height, width, {});

  for (var i = 0; i < data.length; i += 4) {
      var rgbColor = tinycolor({r: data[i], g: data[i+1], b: data[i+2]});
      var hsvColor = rgbColor.toHsv();
      hsvMatrix[hsvY][hsvX] = hsvColor;
      hsvX++;
      if (hsvX === width) {
        hsvY++;
        hsvX = 0;
      }
  }
}

function draw() {
    var f = document.getElementById("bmpupload").files[0],
        url = window.URL || window.webkitURL,
        src = url.createObjectURL(f);

    img.src = src;
    img.onload = function() {
        ctx.canvas.width = img.width;
        ctx.canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        url.revokeObjectURL(src);
        rgbToHsv();
    }
}

function readMask() {
    var fileInput = document.getElementById('maskupload');

    var file = fileInput.files[0];
    var reader = new FileReader();
    reader.onload = function() {
        var text = reader.result;
        text = text.split(' ').join('');
        var array = text.split('\n');
        if (array[array.length - 1] == '') array.pop();
        maskMatrix = array;
    }
    reader.readAsText(file);
}

function readKey() {
    var fileInput = document.getElementById('keyupload');

    var file = fileInput.files[0];
    var reader = new FileReader();
    reader.onload = function() {
        var text = reader.result;
        text = text.replace(/\s/g, '');
        keyArray = text;
    }
    reader.readAsText(file);
}

function langelaar() {
    var delta = 1/51,
    Height = img.height,
    Width = img.width,
    keyLength = keyArray.length,
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
            if (keyIterator > keyLength - 2) keyIterator = keyLength - 1;
            else keyIterator++;
            for (var k = 0; k < n; k++)
                for (var l = 0; l < n; l++) {
                    if (maskMatrix[k][l] == 1) sumOne += hsvMatrix[i+k][j+l].v;
                    if (maskMatrix[k][l] == 0) sumZero += hsvMatrix[i+k][j+l].v;
                }
            var avBrightnessOne = sumOne/countOne;
            var avBrightnessZero = sumZero/countZero;

            for (var k = 0; k < n; k++){
                for (var l = 0; l < n; l++) {
                    var rez = -1;
                    var hsvValue = hsvMatrix[i+k][j+l].v;
                    if (maskMatrix[k][l] == 0)
                        rez = hsvValue;
                    if (rez == -1 && ((keyArray[keyIterator] == 1 && (avBrightnessOne <= (avBrightnessZero - delta))) || (keyArray[keyIterator] == 0 && (avBrightnessOne >= (avBrightnessZero + delta)))))
                        rez = hsvValue;
                    if (rez == -1 && (keyArray[keyIterator] == 1 && ((hsvValue - ((-avBrightnessZero + delta) + avBrightnessOne)) > 0)))
                        rez = hsvValue - (-avBrightnessZero + delta + avBrightnessOne);
                    if (rez == -1 && keyArray[keyIterator] == 1)
                        rez = 0;
                    if (rez == -1 && (keyArray[keyIterator] == 0 && ((hsvValue + (avBrightnessZero + delta - avBrightnessOne)) < 1)))
                        rez = hsvValue + (avBrightnessZero + delta - avBrightnessOne);
                    if (rez == -1)
                        rez = 1;

                    hsvMatrix[i+k][j+l].v = rez;
                }
            }
        }
    }

    var newImageData = ctx.getImageData(0, 0, Width, Height);
    var data = newImageData.data;
    var dataIndex = 0;
    for (var i = 0; i < Height; i++) {
        for (var j = 0; j < Width; j++) {
            var rgb = tinycolor(hsvMatrix[i][j]).toRgb();
            data[dataIndex] = rgb.r;
            data[dataIndex + 1] = rgb.g;
            data[dataIndex + 2] = rgb.b;
            data[dataIndex + 3] = 255;
            dataIndex += 4;
        }
    }
    ctx.putImageData(newImageData, 0, 0);

    //var link = document.createElement('a');
    //link.innerHTML = 'Download image';
    // var link = document.getElementById("download");
    // link.href = canvas.toDataURL("image/bmp");
    // link.download = "result.bmp";
    Canvas2Image.saveAsBMP(canvas, Width, Height);
}

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    img = new Image(),
    hsvMatrix = [],
    keyArray = [],
    maskMatrix = [];

document.getElementById("bmpupload").addEventListener("change", draw, false);
document.getElementById("maskupload").addEventListener("change", readMask, false);
document.getElementById("keyupload").addEventListener("change", readKey, false);
document.getElementById("hideButton").addEventListener("click", langelaar, false);
