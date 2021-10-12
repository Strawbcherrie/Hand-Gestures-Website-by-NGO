prediction="";
Webcam.set({
    width:300,
    height:200,
    image_format:'png',
    png_quality:100
});

// In the above image we have just given the properties of the webcam to preview it on the screen

camera = document.getElementById("camera");

Webcam.attach('#camera');

function snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'">';
    });
}

console.log('ml5 version : ' , ml5.version); 

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/PnZGqYeut/model.json", modelLoaded);

function modelLoaded(){
    console.log("Your model link is loaded.");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data = "The computer has predicted your hand gesture as " + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        document.getElementById("lbl_name").innerHTML= results[0].label;
        document.getElementById("lbl_confidence").innerHTML= results[0].confidence;
        prediction = results[0].label;
        accuracy = results[0].confidence;
        speak();

        if(results[0].label == Help){
            document.getElementById("lbl_name").innerHTML="&#9994;"
        }

        if(results[0].label == Clap){
            document.getElementById("lbl_name").innerHTML="&#9996;"
        }

        if(results[0].label == Peace){
            document.getElementById("lbl_name").innerHTML="&#128079;"
        }
        
        if(results[0].label == Writing){
            document.getElementById("lbl_name").innerHTML="&#9997"
        }
       if(results[0].label == Well){
            document.getElementById("lbl_name").innerHTML="&#129304;"
        }
        if(results[0].label == Okay){
            document.getElementById("lbl_name").innerHTML="&#128076;"
        }
    }
    console.log("done")
}

