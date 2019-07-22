"use strict";
/**
 *  Created by
 *  @author Rudolf Cicko
 *  @date 7/23/19
 *
 */

//SETTINGS of this demo :
var SETTINGS={
  cameraFOV: 40      //in degrees, 3D camera FOV
};

//some globalz :
var THREECAMERA;

//callback : launched if a face is detected or lost. TODO : add a cool particle effect WoW !
function detect_callback(isDetected){
  if (isDetected){
    console.log('INFO in detect_callback() : DETECTED');
  } else {
    console.log('INFO in detect_callback() : LOST');
  }
}

//build the 3D. called once when Jeeliz Face Filter is OK
function init_threeScene(spec){
  THREE.JeelizHelper.init(spec, detect_callback);

  //CREATE THE CAMERA
  var aspecRatio=spec.canvasElement.width / spec.canvasElement.height;
  THREECAMERA=new THREE.PerspectiveCamera(SETTINGS.cameraFOV, aspecRatio, 0.1, 100);
}

//launched by body.onload() :
function main(){
  JeelizResizer.size_canvas({
    canvasId: 'FaceDrummerCanvas',
    callback: function(isError, bestVideoSettings){
      init_faceFilter(bestVideoSettings);
    }
  })
} //end main()

function init_faceFilter(videoSettings){
  JEEFACEFILTERAPI.init({
    canvasId: 'FaceDrummerCanvas',
    NNCpath: 'https://appstatic.jeeliz.com/faceFilter/', //root of NNC.json file
    videoSettings: videoSettings,
    callbackReady: function(errCode, spec){
      if (errCode){
        console.log('AN ERROR HAPPENS. SORRY BRO :( . ERR =', errCode);
        return;
      }

      console.log('INFO : JEEFACEFILTERAPI IS READY');
      init_threeScene(spec);
    }, //end callbackReady()

    //called at each render iteration (drawing loop)
    callbackTrack: function(detectState){
      THREE.JeelizHelper.render(detectState, THREECAMERA);
      console.log(detectState.expressions[0]);
      if (detectState.expressions[0] >= 0.8) {
        console.log('mouth open');
      }
    }
  });
}

