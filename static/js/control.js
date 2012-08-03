$(function() {

    // Create and connect sockert
    var socket = io.connect('/control');

    var $next = $(".next");
    var $prev = $(".prev");
    var $slides_summaries = $("#slides_summaries");

    var cur_page = 0;

    // Binding the controls
    $prev.bind('click', function() {
        socket.emit('flip', -1);
        // return false;
    });
    $next.bind('click', function() {
        socket.emit('flip', 1);
        // return false;
    });

    // Bind events to the socket
    socket.on('flip', function(page) {
        var direction = page - cur_page;
        cur_page = page;
        console.log(cur_page);
        $("#slides_summaries").animate(direction)
    });

    $.getJSON("data/slides.json", function(json) {
        $.each(json, function(){
            $slides_summaries.append("<div class='summary'>" + this.summary + "</div>");
        });
        $("#slides_summaries").slides();
    });
});

