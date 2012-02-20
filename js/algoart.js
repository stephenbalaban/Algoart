var ROOT = 'd131dd02c5e6eec4 693d9a0698aff95c 2fcab50712467eab 4004583eb8fb7f89'
         + '55ad340609f4b302 83e4888325f1415a 085125e8f7cdc99f d91dbd7280373c5b'
         + 'd8823e3156348f5b ae6dacd436c919c6 dd53e23487da03fd 02396306d248cda0'
         + '55ad340609f4b302 83e4888325f1415a 085125e8f7cdc99f d91dbd7280373c5b'
         + 'd8823e3156348f5b ae6dacd436c919c6 dd53e23487da03fd 02396306d248cda0'
         + '55ad340609f4b302 83e4888325f1415a 085125e8f7cdc99f d91dbd7280373c5b'
         + 'd8823e3156348f5b ae6dacd436c919c6 dd53e23487da03fd 02396306d248cda0'
         + '55ad340609f4b302 83e4888325f1415a 085125e8f7cdc99f d91dbd7280373c5b'
         + 'd8823e3156348f5b ae6dacd436c919c6 dd53e23487da03fd 02396306d248cda0'
         + '55ad340609f4b302 83e4888325f1415a 085125e8f7cdc99f d91dbd7280373c5b'
         + 'd8823e3156348f5b ae6dacd436c919c6 dd53e23487da03fd 02396306d248cda0'
         + '55ad340609f4b302 83e4888325f1415a 085125e8f7cdc99f d91dbd7280373c5b'
         + 'd8823e3156348f5b ae6dacd436c919c6 dd53e23487da03fd 02396306d248cda0'
         + '55ad340609f4b302 83e4888325f1415a 085125e8f7cdc99f d91dbd7280373c5b'
         + 'd8823e3156348f5b ae6dacd436c919c6 dd53e23487da03fd 02396306d248cda0'
         + '55ad340609f4b302 83e4888325f1415a 085125e8f7cdc99f d91dbd7280373c5b'
         + 'd8823e3156348f5b ae6dacd436c919c6 dd53e23487da03fd 02396306d248cda0'
         + '55ad340609f4b302 83e4888325f1415a 085125e8f7cdc99f d91dbd7280373c5b'
         + 'd8823e3156348f5b ae6dacd436c919c6 dd53e23487da03fd 02396306d248cda0'
         + '55ad340609f4b302 83e4888325f1415a 085125e8f7cdc99f d91dbd7280373c5b'
         + 'd8823e3156348f5b ae6dacd436c919c6 dd53e23487da03fd 02396306d248cda0'
         + 'e99f33420f577ee8 ce54b67080280d1e c69821bcb6a88393 96f965ab6ff72aa0';

var config = {
    canvas: { id: 'canvas',
              width: 512,
              height: 512  
    },
    alphabet: 'abcdef0123456789',
    pixel: { width: 64, height: 64}
}

var hash = function(str) {
    var digest = Crypto.MD5(str, {digestAsBytes: true}); 
    return digest;
}

var number_of = function(character, string) {
    return string.split(character).length - 1
}

var metric = function(charc, hash_digest) {
    var count_char = number_of(charc, hash_digest);
    var metric = (count_char * 50) % 255;
    return metric;
}

var make_color = function(hash_digest) {
    var red = metric('a', hash_digest);
    var green = metric('0', hash_digest);
    var blue = metric('f', hash_digest);
    var alpha = metric('c', hash_digest);
    return [red, green, blue, alpha];
}

var get_canvas = function() {
    var canvas = document.getElementById(config.canvas.id);
    return canvas;
}

var get_canvas_data = function(canvas) {
    var ctx = canvas.getContext('2d');
    var canvasData = ctx.createImageData(canvas.width, canvas.height);
    return canvasData;
}

var compute_data = function(canvasData) {
    var width = config.canvas.width;
    for(var x = 0; x < canvasData.width; x = x + config.pixel.width) {
        for (var y = 0; y < canvasData.height; y = y + config.pixel.height) {
     
            // Index of the pixel in the array
            var i = (x + y * width) * 4;
     
            //[...] do what you want with these values
            var hash_made = hash(ROOT + i)
            var color = make_color(hash_made);
            // If you want to update the values of the pixel
            canvasData = set_color(canvasData, i, color, config.pixel.width, config.pixel.height);
        }
    }
    return canvasData;
}

var set_color = function(canvasData, i, color, pw, ph) {
    for (var j = 0; j < pw * color.length; j = j + color.length) {
        for (var k = 0; k < ph * color.length; k = k + color.length) {
            for (var c = 0; c < color.length; c++) {
                canvasData.data[i + j + (k * config.canvas.width) + c] = color[c];
            }
        }
    }
    return canvasData;
}

var get_color = function(canvasData, i) {
    var red = canvasData.data[i + 0];
    var green = canvasData.data[i + 1];
    var blue = canvasData.data[i + 2];
    var alpha = canvasData.data[i + 3];
    return [red, green, blue, alpha];
}

var set_data = function(ctx, canvasData) {
    ctx.putImageData(canvasData, 0, 0);
    return ctx;
}
var setup = function() {
    var can = get_canvas();
    can.width = config.canvas.width;
    can.height = config.canvas.height;
    var canData = get_canvas_data(canvas);
    canData = compute_data(canData);
    var ctx = set_data(get_canvas().getContext('2d'), canData);
}
window.onload = function() {
    setup();
}
