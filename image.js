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

function draw(fileElementId, image) {
    var f = document.getElementById(fileElementId).files[0],
        url = window.URL || window.webkitURL,
        src = url.createObjectURL(f);

    image.src = src;
    image.onload = function() {
        ctx.canvas.width = image.width;
        ctx.canvas.height = image.height;
        ctx.drawImage(img, 0, 0);
        url.revokeObjectURL(src);
        rgbToHsv();
    }
}
