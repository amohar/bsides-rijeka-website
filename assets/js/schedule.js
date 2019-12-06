scheduleInit = function(){
    var slotMinutes = 30;

    var initTime = moment("2019-09-29 06:00")
    var times = [];
    for (var i=0; i<30; i++) {
        times.push(initTime.clone());
        initTime.add(slotMinutes, 'minutes');
    }

    var $table = $("<table>");
    var $row = $("<tr>");
    var $header = $("<th>").text("Time");
    $row.append($header);
    $.each(scheduleData.rooms, function(j, val) {
        $header = $("<th>").text(val.name);
        $row.append($header);
    });
    $table.append($row);
    $.each(times, function(i, time) {
        $row = $("<tr>");
        $cell = $("<td>").text(time.format("HH:mm"));
        $row.append($cell);
        $.each(scheduleData.rooms, function(j, room) {
            $id = time.format("HH") + '_' + time.format("mm") + '_' + room.id;
            $cell = $("<td>").attr('id', $id);
            $row.append($cell);
        });
        $table.append($row);
    });

    $time = $("<div>").attr("id", "time");
    $time.css("width", parseInt($("#calendar").css("width"), 10));
    $("#calendar").append($time);

    $("#calendar").append($table);

    $.each(scheduleData.talks, function(i, talk) {
        start = moment(moment().format("MM/DD/YYYY") + " " + talk.start);
        duration = moment.duration(talk.duration);
        id = "#" + start.format("HH") + '_' + start.format("mm") + '_' + talk.room;
        multiply = duration.as("minutes") / slotMinutes;
        height = parseInt($(id).css("height"), 10) * multiply;
        width = parseInt($(id).css("width"), 10);

        $div = $("<div>").addClass("event").css("height", height).css("width", width).text(talk.name);
        $(id).css("display", "contents").append($div);
    });


    window.setInterval(function() {
        timeMins = moment.duration(moment().format("HH:mm")).asMinutes();
        if (timeMins < 360) {
            timeMins = 360;
        }

        timeMins -= 360;
        min = 60 / 30;
        $("#time").css("height", timeMins * min + 61);
    }, 100);
}

if (typeof scheduleData !== 'undefined') {
    scheduleInit();
}
