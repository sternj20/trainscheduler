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

function render(array){
	for(var i = 0; i < trains.length; i++){
	var tr = $("<tr>");
	//create tds for each corresponding value
	var tdName = $("<td>").text(trains[i].name);
	var tdDest = $("<td>").text(trains[i].destination);
	var tdFreq = $("<td>").text(trains[i].frequency);
	var tdNext = $("<td>");
	var tdMins = $("<td>");
	//append tds to tr
	tr.append(tdName);
	tr.append(tdDest);
	tr.append(tdFreq);
	//prepend tr to table containing all train data
	$(".data").prepend(tr);
}
}

//add a new train to firebase
function newTrain(event){
	event.preventDefault();
	train = {};

	//variables for inputs
	nameInput = $(".name");
	destinationInput = $(".destination");
	timeInput = $(".time");
	frequencyInput = $(".freq");

	//adding our inputs into global variable trains
	train.name = nameInput.val().trim();
	train.destination = destinationInput.val().trim();
	train.frequency = frequencyInput.val().trim();
	trains.push(train);

	//clearing input fields
	nameInput.val('');
	destinationInput.val(' ');
	timeInput.val(' ');
	frequencyInput.val(' ');

	//storing global variable trains on firebase inside object trainData
	database.ref().set({
		trainData: trains
	});
}

//get data from firebase and show in document
//when a value in our database is changed
database.ref().on("value", function(snapshot) {
	//empty data on document
	$(".data").empty();
	//reference to train data in firebase object
	firebaseData = snapshot.val().trainData;
	trains = firebaseData;
	//iterate through the children in firebase object
	render();
	
});


//event handlers
$(".submit").on("click", newTrain);

//function calls
render();
















// //functions	
// function getTrainTime(current, first, frequency){
// 	var difference = current - first;
// 	var diffMins = difference * 60;
// 	var travelNum = diffMins/frequency;
// 	travelNum++;
// 	var travelHrs = (travelNum * frequency)/60;
// 	return travelHrs + first;
// }

//show our trains in document
