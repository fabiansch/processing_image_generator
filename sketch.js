var leftBuffer;
var rightBuffer;
var frame_rate;

function setup() {
  frameRate(1)
  // 800 x 400 (double width to make room for each "sub-canvas")
  createCanvas(800, 400);

  leftBuffer = createGraphics(400, 400);
  document.getElementsByTagName("canvas")[1].width /= 2;
  document.getElementsByTagName("canvas")[1].height /= 2;

  emptyBuffer = createGraphics(400, 400);
  emptyBuffer.background(255,255,255);

}

var url = undefined;

function draw() {
  if(url != undefined) {
    drawLeftBuffer();
    image(leftBuffer, 0, 0);
    process_and_draw_image();
  }
}

function drawLeftBuffer() {
    leftBuffer.fill(random(0,255),random(0,255),random(0,255));
    leftBuffer.ellipse(mouseX, mouseY, 50, 50);
}

function process_and_draw_image() {
  var canvas2 = document.getElementsByTagName("canvas")[1];
  var payload = {'base64': canvas2.toDataURL("image/png"), 'frame_count': frameCount};
  httpPost(url, payload, function(result) {
    var base64 = JSON.parse(result)['base64'];
    var blob = b64toBlob(base64, 'image/png');
    var blobUrl = URL.createObjectURL(blob);
    loadImage(blobUrl, function(img) {
      // image(emptyBuffer, 400, 0);
      image(img, 400, 0);
    });
  });
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    set_frame_rate(frame_rate * 2);
  } else if (keyCode === DOWN_ARROW) {
    set_frame_rate(frame_rate / 2);
  }
}

function set_frame_rate(frame_rate) {
  this.frame_rate = frame_rate;
  frameRate(frame_rate);
  document.getElementById("frame_rate").value = frame_rate;
}

function buttonClick() {
  console.log("buttonClick");
  var frame_rate = float(document.getElementById("frame_rate").value);
  set_frame_rate(frame_rate);
  url = document.getElementById("url").value;

}

function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
}
