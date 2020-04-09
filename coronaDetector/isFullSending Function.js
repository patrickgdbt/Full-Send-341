//npm install @microsoft/customvision-tfjs

import * as cvstfjs from '@microsoft/customvision-tfjs';

//For Loading image
//<img id="image" src="test_image.jpg" />


//Loads Model
let model = new cvstfjs.ClassificationModel();
await model.loadModelAsync('model.json');

const image = document.getElementById('image');
const result = await model.executeAsync(image);


//Boolean Function for Corona Detector
function isFullSending(result)
{
  for(var i = 0; i< result.length; i++){

  if(result(i) >= .7)
  {
    return true;
    break;

  }

else {
  continue;
}

}
return false;
}
