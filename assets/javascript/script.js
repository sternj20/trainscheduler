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
var timeFormat = "HH:mm:ss";
var nextTrain;
var setTime;

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
	nextTrain = moment().add(minutes, "minutes");

    //render data 
    var tr = $("<tr>");
    tr.append("<td>" + snapshot.val().name + "</td>");
    tr.append("<td>" + snapshot.val().destination + "</td>");
    tr.append("<td>" + snapshot.val().frequency + "</td>");
    tr.append("<td class = 'nextTrainTime'>" + nextTrain.format(timeFormat) + "</td>");
    tr.append("<td class = 'minsAway'>" + minutes + "</td>");
    $(".data").append(tr);
});


// timer function
function timer(){
	setTime = setInterval(timerCount, 1000);
}

//countdown 
function timerCount(){
	//iterate over all of the next train time values
	for (var i = 0; i < $(".nextTrainTime").length; i++){
		nextTime = $(".nextTrainTime")[i].innerText;
		nextTime = moment(nextTime, timeFormat);
		//subtract one second from each next train time value
		nextTime = nextTime.subtract(1, "second").format(timeFormat);
		//update dom
		$(".nextTrainTime")[i].innerText = nextTime;
	}
}

function stopTimer(){
	clearInterval(setTime);
}

//event handlers
$(".submit").on("click", newTrain);

//function calls
timer();



