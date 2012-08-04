$(function() {

    // Create and connect sockert
    var socket = io.connect('/control');

    var $next = $(".next");
    var $prev = $(".prev");
    var $slides_summaries = $("#slides_summaries");

    var cur_slide = 0;
    var num_slides = 0; 

    $.getJSON("data/slides.json", function(json) {
        $.each(json, function(){
            $slides_summaries.append("<div class='summary'>" + this.summary + "</div>");
            num_slides += 1;
        });
        $("#slides_summaries").slides();
    });

    // Binding the controls
    $prev.bind('click', function() {
        if (cur_slide > 0){
            socket.emit('flip', -1);
        }
        // return false;
    });
    $next.bind('click', function() {
        if (cur_slide < num_slides - 1){
            socket.emit('flip', 1);
        }
        // return false;
    });

    // Bind events to the socket
    socket.on('flip', function(slide) {
        console.log(slide);

        $("#slides_summaries").goto(cur_slide, slide);
        cur_slide = slide;
    });

    
});

