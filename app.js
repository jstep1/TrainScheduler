  // Initialize Firebase
var config = {
    apiKey: "AIzaSyDPl9W6cHaAeeNExdOo-6_7iJ_4Xj7Co98",
    authDomain: "awesome-project-d0d27.firebaseapp.com",
    databaseURL: "https://awesome-project-d0d27.firebaseio.com",
    projectId: "awesome-project-d0d27",
    storageBucket: "awesome-project-d0d27.appspot.com",
    messagingSenderId: "142778777686"
  };

firebase.initializeApp(config);

var database = firebase.database();

$(document).on("click", "#add-train", function(event) {
    event.preventDefault();

    if($("#train-input").val() && $("#destination-input").val() && $("#time-input").val() && $("#frequency-input").val()) {

    var trainName = $("#train-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var nextArrival = $("#time-input").val().trim();
    var trainFreq = $("#frequency-input").val().trim();

    // Capture User Inputs and store them into variables
    database.ref().push({
        name: trainName, 
        destination: trainDestination,
        nextArr: nextArrival,
        frequency: trainFreq,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    
    $("#train-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
    }

    else {
        alert("Please submit a valid entry.");
    }
});

database.ref().on("child_added", function(snapshot) {
    var newTrain = $("<tr>");

    newTrain.append($("<td scope='col'>" + snapshot.val().name + "</td>"), $("<td scope='col'>" + snapshot.val().destination + "</td>"), $("<td scope='col'>" + snapshot.val().frequency + "</td>"), $("<td scope='col'>" + moment(snapshot.val().nextArr, 'hh:mm A').format('hh:mm A') + "</td>"));

    var currentYear = moment().format('YYYY');
        currentDay = moment().format('DD');
        currentMonth = moment().format('MM');
        currentHour = moment().format('HH');
        currentMin = moment().format('mm');
        arr = snapshot.val().nextArr;

        arrHr = moment(arr, 'HH:mm A').format('HH');
        arrMin = moment(arr, 'HH:mm A').format('mm');

        a = moment([currentYear, currentMonth, currentDay, currentHour, currentMin]);
        b = moment([currentYear, currentMonth, currentDay, arrHr, arrMin]);

        timeLeft = b.diff(a, 'minutes');

        if(timeLeft < 0) {
            timeLeft = "NaN";
        }

        newTrain.append($("<td scope='col'>" + timeLeft + "</td>"));

    $("tbody").append(newTrain);

});

