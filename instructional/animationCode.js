function JsonFunction(status, response) {
  var animationDetails = [];
  var listOfFrameNames;
  for (var i = 0; i < response.frames.length; i++) {
    //for (let j = 0; j < cleanFilenames.length; j++) {
    var shorterFilename = response.frames[i].filename.replace(/-(\d)+.png/, "");
    var nameExists = false;
    for (j = 0; j < animationDetails.length; j++) {
      if (shorterFilename === animationDetails[j].filename) {
        //check to see if name already exists
        nameExists = true;

        animationDetails[j].coordinates.push({
          spritex: response.frames[i].frame.x, //the x and y of the location of the sprite on the spritesheet
          spritey: response.frames[i].frame.y,
          spriteWidth: response.frames[i].frame.w, //width and height of the sprite. this is also the same as spriteSourceSize height and width
          spriteHeight: response.frames[i].frame.h,
          swidth: response.frames[i].sourceSize.w, //possibly the original size of the sprite, not needed
          sheight: response.frames[i].sourceSize.h, //seems to match up with the maximum value of frame height
          dx: response.frames[i].spriteSourceSize.x, //offset needed to keep the animation in the same place, you add this to the dx value in draw image
          dy: response.frames[i].spriteSourceSize.y,
          framesData: response.frames[i], //stores what the current frame is.
        });
      }
    }
    if (nameExists === false) {
      animationDetails.push({
        filename: shorterFilename,
        coordinates: [
          {
            spritex: response.frames[i].frame.x, //the x and y of the location of the sprite on the spritesheet
            spritey: response.frames[i].frame.y,
            spriteWidth: response.frames[i].frame.w, //width and height of the sprite. this is also the same as spriteSourceSize height and width
            spriteHeight: response.frames[i].frame.h,
            swidth: response.frames[i].sourceSize.w, //possibly the original size of the sprite, not needed
            sheight: response.frames[i].sourceSize.h, //seems to match up with the maximum value of frame height
            dx: response.frames[i].spriteSourceSize.x, //offset needed to keep the animation in the same place, you add this to the dx value in draw image
            dy: response.frames[i].spriteSourceSize.y,
            framesData: response.frames[i], //stores what the current frame is.
          },
        ],
      });
    }
  }

  return animationDetails;
}

var getJSON = function (url, callback) {
  var animation = "";
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "json";
  xhr.onload = function () {
    var status = xhr.status;
    if (status === 200) {
      animation = callback(null, xhr.response);
  return animation;
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};
