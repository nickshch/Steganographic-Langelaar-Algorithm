Array.matrix = function(numrows, numcols, initial) {
    var arr = [];
    for (var i = 0; i < numrows; ++i) {
        var columns = [];
        for (var j = 0; j < numcols; ++j) {
            columns[j] = initial;
        }
        arr[i] = columns;
    }
    return arr;
}

function rgbToHsv() {
  var width = img.width;
  var height = img.height;
  var imageData = ctx.getImageData(0, 0, width, height);
  var data = imageData.data;

  var hsvX = 0,
      hsvY = 0;
  hsvMatrix = Array.matrix(height, width, 0);

  for (var i = 0; i < data.length; i += 4) {
      var rgbColor = tinycolor({r: data[i], g: data[i+1], b: data[i+2]});
      var hsvColor = rgbColor.toHsv();
      alert(rgbColor.toHsvString());
      hsvMatrix[hsvX, hsvY] = hsvColor;
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

var ctx = document.getElementById('canvas').getContext('2d'),
    img = new Image();
    hsvMatrix = [];

document.getElementById("bmpupload").addEventListener("change", draw, false)
