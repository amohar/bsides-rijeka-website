
jQuery(document).foundation();

// Sets menu parents of a selected item to active
$('li.active').parents('li').addClass('active');

// Sets up the CFP countdown
cfpDeadlineCallback = function() {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = cfpDeadline - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
    // Display the result in the element with id="demo"
    string = days + " days, " + hours + " hours ";

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(x);
        string = "Call for presentations is closed."
    }

    $("#cfp-countdown").html(string);
}

var x = setInterval(cfpDeadlineCallback, 1000 * 60);
cfpDeadlineCallback();