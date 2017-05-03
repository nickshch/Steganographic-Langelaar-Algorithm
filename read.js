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
