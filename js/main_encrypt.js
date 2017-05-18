var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    img = new Image(),
    hsvMatrix = [],
    keyArray = [],
    maskMatrix = [];

document.getElementById("bmpupload").addEventListener("change", function(){draw("bmpupload", img, ctx)}, false);
document.getElementById("maskupload").addEventListener("change", function(){readMask()}, false);
document.getElementById("keyupload").addEventListener("change", function(){readKey()}, false);
document.getElementById("hideButton").addEventListener("click", function(){langelaarHideText(img.height, img.width, maskMatrix, hsvMatrix, keyArray, ctx)}, false);
