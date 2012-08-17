Slideshow = function(json_path, project_dir, options){
    options = typeof options !== 'undefined' ? options : {};
    
    this.slides = [];
    this.num_slides = 0;
    this.curr_slide = 0;
    this.slides_summaries = options["summaries_container"] ? $("#"+options["summaries_container"]) : $("#slides_summaries");
    this.slides_container = options["slides_container"] ? $("#"+options["slides_container"]) : $("#slides_container");
    
    var slideshow = this;
    var $body = $("body");

    $.getJSON(json_path, function(json) {
        console.log(json["options"]);
        $.each(json["options"], function(key, value){
            if (key == "css"){
                $body.append('<link rel="stylesheet" type="text/css" href="' + json["options"]['css'] + '"/>');
            }
        });
        $.each(json["data"], function(key, value){
            slideshow.slides_summaries.append(parse_markdown(this.summary, 
                                        {
                                            dir: project_dir,
                                            type: "summary",
                                            id: key
                                        })
                                    );
            slideshow.slides_container.append(parse_markdown(this.slide, 
                                        {
                                            dir: project_dir,
                                            type: "slide",
                                            id: key
                                        })
                                    );

            slideshow.num_slides += 1;
        });
        if (slideshow.slides_summaries.length > 0)
            slideshow.create_slides(slideshow.slides_summaries);
        if (slideshow.slides_container.length > 0)
            slideshow.create_slides(slideshow.slides_container);
    });


    $.fn.last = function(){
        return $(this[ this.length - 1 ]);
    }

    slideshow.create_slides = function(container){
        console.log("slides created");
        $(container).children().each(function(){
            slideshow.slides.push(this);
        });
    };

    slideshow.goto = function(new_slide, style){
        console.log("jumping to " + new_slide);
        style = typeof style !== 'undefined' ? style : "fadeIn";

        if (style == "fadeIn"){
            $(slideshow.slides[new_slide]).fadeIn(1250);
            if (slideshow.curr_slide != new_slide){
                $(slideshow.slides[slideshow.curr_slide]).hide();
            }
        }
        else{
            $(slideshow.slides[new_slide]).css("left", '100%');
            $(slideshow.slides[new_slide]).show();
            $(slideshow.slides[new_slide]).animate({"left":"-=100%"}, "slow");
            if (slideshow.curr_slide != new_slide){
                $(slideshow.slides[slideshow.curr_slide]).hide();
            }
        }
    };

}
