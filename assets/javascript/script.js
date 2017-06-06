/*

STEPS

1. Add information from forms into corresponding table rows and columns
	When Submit Button is clicked
	create a new tr
		with 5 tds
		Train name - set to value of what is typed into train name, etc. 
		Destination
		Frequency 
		Next Arrival
		Minutes Away 
	prepend it to our table 
2. Add logic to calculate when the next train is arriving based on the current time and the time of the first train 
3. Persist data with local storage

Code this app to calculate when the next train will arrive; this should be relative to the current time.

	Example: First train leaves at 8 AM, with a frequency of 30 minutes
			 I am looking at the train at 12:10 PM, how to calculate the next arrival time? 

			 3 variables

			 Time first train leaves	- 8 am
			 frequency 	- 30 min
			 Time I am looking at the train - 12:10 pm 

			 8:30, 9, 9:30, 10, 10:30, 11, 11:30, 12, 12:30

			 12:30 - 12:10 - answer is 10 minutes 

			 How many 30 minute intervals are there between 8 AM and 12:10 pm? 8. the 9th interval is the next arriving train. 

		
			 (30*9)/60 = 4.5(hours)
			 8+4.5 = 12.5 = next arriving train

			 Another use case

			 Time first train leaves - 3 pm
			 frequency - 20 minutes
			 Time I am looking at teh train: 10 PM

			 How many 20 minute intervals are there between 3 PM and 10 pm? 

			1. Subtract the time you are looking at the train by the time the first train arrives 
			10 - 3 = 7
			2. Multiply this amount by 60 to get the total amounto minutes
			7*60 = 420
			3. Divide this amount by the frequency of the train to get how many times the train has already traveled
			420 / 20 = 21 20 minute intervals
			4. Add one to this number to get the next interval of train arrival 
			the next interval will be the 22nd
			5. Multiply this number by thre frequency amount to get the number of hours the next train will come in relation to the first leaving train
			22 * 20 = 7 1/3 = 7:20
			6. Add this to the time of the first leaving train to see when the next train arrives
			3 + 7:20 = 10:20 next train arrives

			*/


var train = JSON.parse(localStorage.getItem("trains"));
//if there is not anything in local storage, set train to empty array, otherwise our train variable are values from local storage 
if (!Array.isArray(train)){
	train=[];
}

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


function showTrains(){
	var storedTrains = JSON.parse(localStorage.getItem("trains"));
	//if array trains has not been stored in local storage, storedtrains is an empty array, otherwise stored trains is the localstorage item trains
	if(!Array.isArray(storedTrains)){
		storedTrains = [];
	}
	$(".data").empty();

	//loop through train array
	for (var i = 0; i < storedTrains.length; i++){
	//create a new tr to store input values
	var tr = $("<tr>");
	//create tds for each corresponding value
	var tdName = $("<td>").text(storedTrains[i].name);
	var tdDest = $("<td>").text(storedTrains[i].destination);
	var tdFreq = $("<td>").text(storedTrains[i].frequency);
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

//add a new train 
function newTrain(){
	//variables for inputs
	var nameInput = $(".name");
	var destinationInput = $(".destination");
	var timeInput = $(".time");
	var frequencyInput = $(".freq");

	//new object to store our train information
	var newTrain = {};
	//add text to tds from corresponding input values
	newTrain.name = nameInput.val().trim();
	newTrain.destination = destinationInput.val().trim();
	newTrain.frequency = frequencyInput.val().trim();
	//add our new train object to train array containing all train data 
	train.push(newTrain);
	localStorage.setItem("trains", JSON.stringify(train));
	showTrains();
	//clear input fields
	nameInput.val('');
	destinationInput.val(' ');
	timeInput.val(' ');
	frequencyInput.val(' ');
}

//event handlers
$(".submit").on("click", newTrain);

//function calls
showTrains();