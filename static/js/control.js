$(function() {

    // Create and connect sockert
    var socket = io.connect('/control');

    var $next = $(".next");
    var $prev = $(".prev");
    var $slides_summaries = $("#slides_summaries");
    var $slides_container = $("#slides_container");

    var cur_slide = 0;
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
        if (cur_slide > 0){
            socket.emit('flip', -1);
        }
    });
    $next.bind('click', function() {
        if (cur_slide < num_slides - 1){
            socket.emit('flip', 1);
        }
    });

    // Bind events to the socket
    socket.on('flip', function(slide) {
        console.log(slide);
        if ($slides_summaries.length > 0)
            $("#slides_summaries").goto(cur_slide, slide);
        if ($slides_container.length > 0)
            $("#slides_container").goto(cur_slide, slide);
        cur_slide = slide;
    });

    
});

