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
var firebaseData;

//inputs
var nameInput;
var destinationInput;
var timeInput;
var frequencyInput;

var timeFormat = "HH:mm:ss";
var diffTime;
var remainder;
var minutes;
var firstTime;
var tFrequency;
var firstTimeConverted;
var minutesFormatted;
var nextTime;

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
	tFrequency = snapshot.val().frequency;
	firstTime = snapshot.val().time;
	firstTimeConverted = moment(firstTime, timeFormat).subtract(1, "years");
	diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	remainder = diffTime % tFrequency;
	minutes = tFrequency - remainder;
	nextTime = moment().add(minutes, "minutes");
	minutesFormatted = formatMinutes(minutes);


    //render data 
    var tr = $("<tr>");
    tr.append("<td>" + snapshot.val().name + "</td>");
    tr.append("<td>" + snapshot.val().destination + "</td>");
    tr.append("<td class = 'frequency'>" + snapshot.val().frequency + "</td>");
    tr.append("<td class = 'nextTrainTime'>" + nextTime.format(timeFormat) + "</td>");
    tr.append("<td class = 'minsAway'>" + minutesFormatted + "</td>");
    $(".data").append(tr);
});



// timer function
function timer(){
	var setTime = setInterval(timerCount, 1000);
}

//countdown 
function timerCount(){
	for ( i = 0; i < $(".minsAway").length; i++){
		var minsAway = $(".minsAway")[i].innerText;
		minsAway = moment(minsAway, "m:ss");
		if($(".minsAway")[i].innerText !== '0:00'){
			minsAway.subtract(1, "second");
			$(".minsAway")[i].innerText = minsAway.format("m:ss");
		} else {
			var frequency = $(".frequency")[i].innerText;
			minsAway.add(frequency, "minute");
			$(".minsAway")[i].innerText = minsAway.format("m:ss");
			$(".nextTrainTime")[i].innerText = moment().add(frequency, "minutes").format(timeFormat);
			$(".minsAway")[i].innertext = minsAway.format("m:ss");
		}
	}
}


function formatMinutes(mins){
	return moment().startOf('day').add(mins, 'minutes').format('m:ss');
}

//event handlers
$(".submit").on("click", newTrain);

//function calls
timer();



