// Initialize Firebase
var config = {
    apiKey: "AIzaSyA-NFw-3xqUae69EP8-gx3BM8FZXyr4H50",
    authDomain: "train-scheduler-323.firebaseapp.com",
    databaseURL: "https://train-scheduler-323.firebaseio.com",
    projectId: "train-scheduler-323",
    storageBucket: "",
    messagingSenderId: "742530247877"
};
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Train
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainFirstTime = moment($("#first-train-time-input").val().trim(), "HH:mm").format("X");
    var trainFreq = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding employee data
    var newTrain = {
        name: trainName,
        dest: trainDest,
        firstTime: trainFirstTime,
        freq: trainFreq
    };

    // Uploads train data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.firstTime);
    console.log(newTrain.freq);

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");
});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().dest;
    var trainFirstTime = childSnapshot.val().firstTime;
    var trainFreq = childSnapshot.val().freq;


    var diffTime = moment().diff(moment(trainFirstTime, "X"), "minutes");

    var tRemainder = diffTime % trainFreq;

    // Minute Until Train
    var tMinutesTillTrain = trainFreq - tRemainder;


    // Next Train
    var nextArrival = moment().add(tMinutesTillTrain, "minutes");
    var formatnextArrival = moment(nextArrival).format("hh:mm");

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainFreq),
        $("<td>").text(formatnextArrival),
        $("<td>").text(tMinutesTillTrain),
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);


});
