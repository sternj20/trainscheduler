// Initialize Firebase
var config = {
	apiKey: "AIzaSyDTgTeSGa_M3zyiqcWj4xTTXLyrGoVKL6k",
	authDomain: "train-scheduler-5c941.firebaseapp.com",
	databaseURL: "https://train-scheduler-5c941.firebaseio.com",
	projectId: "train-scheduler-5c941",
	storageBucket: "train-scheduler-5c941.appspot.com",
	messagingSenderId: "831610376980"
};

firebase.initializeApp(config);


//variables
var database = firebase.database();
var trains;
var nameInput;
var destinationInput;
var timeInput;
var frequencyInput;
var firebaseData;
var timeFormat = "hh:mm";

//add a new train to firebase
function newTrain(event){
	event.preventDefault();

	//variables for inputs
	nameInput = $(".name").val().trim();
	destinationInput = $(".destination").val().trim();
	timeInput = $(".time").val().trim();
	frequencyInput = $(".freq").val().trim();
	
	//pushing each new traim to firebase object
	database.ref().push({
		name:nameInput,
		destination: destinationInput,
		time: timeInput,
		frequency: frequencyInput
	});


	//clearing input fields
	$(".name").val('');
	$(".destination").val(' ');
	$(".time").val(' ');
	$(".freq").val(' ');

}

//getting our data from firebase 
database.ref().on("child_added", function(snapshot) {
	//moment.js math for calculating train time 
	 var tFrequency = snapshot.val().frequency;
	 var firstTime = snapshot.val().time;
	 var firstTimeConverted = moment(firstTime, timeFormat).subtract(1, "years");
	 var current = moment();
	 var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	 var remainder = diffTime % tFrequency;
	 var minutes = tFrequency - remainder;
     var nextTrain = moment().add(minutes, "minutes");

    //render data 
    var tr = $("<tr>");
	tr.append("<td>" + snapshot.val().name + "</td>");
	tr.append("<td>" + snapshot.val().destination + "</td>");
	tr.append("<td>" + snapshot.val().frequency + "</td>");
	tr.append("<td>" + nextTrain.format(timeFormat) + "</td>");
	tr.append("<td>" + minutes + "</td>");
	$(".data").append(tr);
	
});



//event handlers
$(".submit").on("click", newTrain);
   
   
