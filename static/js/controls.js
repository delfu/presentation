var sec = 0;
var min = 0;
var hour = 0;
var stopwatch_start = false;
function stopwatch() {
    sec++;
    if (sec == 60) {
        sec = 0;
        min = min + 1; 
    }
    else {
        min = min; 
    }
    if (min == 60) {
        min = 0; 
        hour += 1; 
    }

    if (sec<=9) { sec = "0" + sec; }
    $("#stopwatch").html(((hour<=9) ? "0"+hour : hour) + ":" + ((min<=9) ? "0" + min : min) + ":" + sec);
    if (stopwatch_start == false) {
        window.clearTimeout(SD);
        return true; 
    }
    SD=window.setTimeout("stopwatch();", 1000);
}


$(function() {

    // Create and connect sockert
    var socket = io.connect('/control');

    var $next = $(".next");
    var $prev = $(".prev");
    var $slides_summaries = $("#slides_summaries");
    var $slides_container = $("#slides_container");
    var $stopwatch = $("#stopwatch");
    var $page = $("#page");

    var curr_slide = 0;
    var num_slides = 0; 

    $.getJSON("data/slides.json", function(json) {
        $.each(json, function(){
            $slides_summaries.append("<div class='summary'>" + this.summary + "</div>");
            $slides_container.append("<div class='slide'>" + this.slide + "</div>");
            num_slides += 1;
        });
        if ($slides_summaries.length > 0)
            $slides_summaries.slides();
        if ($slides_container.length > 0)
            $slides_container.slides();
    });

    // Binding the controls
    $prev.bind('click', function() {
        if (curr_slide > 0){
            socket.emit('flip', -1);
        }
    });
    $next.bind('click', function() {
        if (curr_slide < num_slides - 1){
            socket.emit('flip', 1);
        }
    });
    $stopwatch.bind('click', function(){
        stopwatch_start = !stopwatch_start;
        stopwatch($stopwatch);
    });

    // Bind events to the socket
    socket.on('flip', function(slide) {
        console.log(slide);
        if ($slides_summaries.length > 0)
            $("#slides_summaries").goto(curr_slide, slide);
        if ($slides_container.length > 0)
            $("#slides_container").goto(curr_slide, slide);
        curr_slide = slide;
        $page.html(curr_slide + 1 + "/" + num_slides);
    });

    
});

