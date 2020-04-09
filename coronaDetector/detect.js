//Corona Detector

//Reads Image
let reader = new FileReader();
let image = reader;


//Loads TensorFlow.js Model
let model = await tf.loadGraphModel('model.json');


let tensor = tf.browser.fromPixels(image,3)
    .resizeNearestNeighbor([224, 224]) // change the image size
    .expandDims()
    .toFloat()
    .reverse(-1); // RGB -> BGR


    let predctions = await.model.predict(tensor).data();


    let det = Array.from(predctions)
      .map(function (p, i) { // this is Array.map
        return {
          probability: p,
          className: TARGET_CLASSES[i] // we are selecting the value from the obj
        };
      }).sort(function (a, b) {
        return b.probability - a.probability;
      }).slice(0, 2);



      det.forEach(function (p) {
    		{p.className
          p.probability.toFixed(6) //Displays Corona and probability of there being a corona in the picture
        }
      0});

