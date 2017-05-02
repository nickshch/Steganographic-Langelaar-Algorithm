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

var ctx = document.getElementById('canvas').getContext('2d'),
    img = new Image(),
    hsvMatrix = [],
    keyArray = [],
    maskMatrix = [];

document.getElementById("bmpupload").addEventListener("change", draw, false);
document.getElementById("maskupload").addEventListener("change", readMask, false);
document.getElementById("keyupload").addEventListener("change", readKey, false);
