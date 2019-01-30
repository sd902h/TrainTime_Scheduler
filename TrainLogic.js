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
    var trainFirstTime = moment($("#first-train-time-input").val().trim(), "MM/DD/YYYY").format("X");
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

    alert("train successfully added");

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
    var trainDest = childSnapshot.val().role;
    var trainFirstTime = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().rate;

    // Employee Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainFirstTime);
    console.log(trainFreq);

});
