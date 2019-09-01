# ImageClassifierWebCamera
Classify Image from webcam
1) Index.html is the starting point. This file is called from app.py.
2) Index.html will initialize the webcam and will open the camera. The code to start the web cam is in main.js
3) Take Snapshot button will capture the image from webcam and will put it in the canvas below. The Canvas is defaulted with an image. Once we capture the image from webcam, the default image will change to the image drawn from webcam. The code to capture the snapshot is in main.js.
4)The Predict button will extract the url of image from canvas and will convert this into blob data. This data will be passed in the /predict page using ajax.
5) app.py will grab this data image and will save in the upload folder.
6) app.py will then make prediction on this image using ResNet50 model and will display the result.
7) main.css file is used to provide the look and feel of the button,canvas and provide animation while clicking the buttons.
