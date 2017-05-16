var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    img = new Image(),
    hsvMatrix = [],
    keyArray = [],
    maskMatrix = [];


document.getElementById("bmpstegoupload").addEventListener("change", function(){draw("bmpstegoupload", img)}, false);
document.getElementById("maskupload").addEventListener("change", function(){readMask()}, false);
document.getElementById("extractButton").addEventListener("click", function(){extractText(img.height, img.width, maskMatrix, hsvMatrix, keyArray, ctx)}, false);
