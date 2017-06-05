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

*/ 

//functions

function newTrain(){
	//variables for inputs
	var nameInput = $(".name");
	var destinationInput = $(".destination");
	var timeInput = $(".time");
	var frequencyInput = $(".freq");
	//create a new tr to store input values
	var tr = $("<tr>");
	//create tds for each corresponding value
	var tdName = $("<td>");
	var tdDest = $("<td>");
	var tdFreq = $("<td>");
	var tdNext = $("<td>");
	var tdMins = $("<td>");
	//add text to tds from corresponding input values
	tdName.text(nameInput.val());
	tdDest.text(destinationInput.val());
	tdFreq.text(frequencyInput.val());
	//append tds to tr
	tr.append(tdName);
	tr.append(tdDest);
	tr.append(tdFreq);
	//prepend tr to table containing all train data
	$(".data").prepend(tr);
	//clear input fields
	nameInput.val('');
	destinationInput.val(' ');
	timeInput.val(' ');
	frequencyInput.val(' ');
}

//event handlers
$(".submit").on("click", newTrain);


