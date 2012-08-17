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


SlideshowController = function(slideshow, options){
    options = typeof options !== 'undefined' ? options : {};

    this.socket = io.connect("/control");
    var controller = this;

    var $next = $(".next");
    var $prev = $(".prev");
    
    var $stopwatch = options["stopwatch"] ? $("#"+options["stopwatch"]) : $("#stopwatch");
    var $page = options["page"] ? $("#"+options["page"]) : $("#page");
    //var mode = options["mode"] ? options["mode"] : "presentation";

    controller.flip = function(direction){
        if (direction == -1 && slideshow.curr_slide > 0){
            controller.socket.emit('flip', slideshow.curr_slide-1 );
        }
        else if (direction == 1 && slideshow.curr_slide < show.num_slides - 1){
            controller.socket.emit('flip', slideshow.curr_slide+1);
        }
    }

    // key binding
    $prev.bind('click', function() {
        controller.flip(-1);
    });
    $next.bind('click', function() {
        controller.flip(1);
    });
    $(document).bind("keydown", function(e){
        //left arrow key
        if (e.keyCode === 37){
            controller.flip(-1);
            return false;   
        }
        //right arrow key
        else if (e.keyCode === 39){
            controller.flip(1);
            return false;   
        }
    });
    // Bind events to the socket
    controller.socket.on('flip', function(new_slide) {
        console.log(new_slide);
        if (slideshow.slides_summaries.length > 0)
            slideshow.goto(new_slide, "slide");
        if (slideshow.slides_container.length > 0)
            slideshow.goto(new_slide);
        slideshow.curr_slide = new_slide;
        $page.html(slideshow.curr_slide + 1 + "/" + slideshow.num_slides);
    });


    $stopwatch.bind('click', function(){
        stopwatch_start = !stopwatch_start;
        stopwatch($stopwatch);
    });
}