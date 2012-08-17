$(function(){

	var $slides_summaries = $("#slides_summaries");
    var $slides_container = $("#slides_container");
    var $body = $("body");


    //global variable
	slides = [];
	num_slides = 0; 

    $.getJSON(json_path, function(json) {
        console.log(json["options"]);
        $.each(json["options"], function(key, value){
            if (key == "css"){
                $body.append('<link rel="stylesheet" type="text/css" href="' + json["options"]['css'] + '"/>');
            }
        });
        $.each(json["data"], function(key, value){
            $slides_summaries.append(parse_markdown(this.summary, 
                                        {
                                            dir: "/data/final_presentation/",
                                            type: "summary",
                                            id: key
                                        })
                                    );
            $slides_container.append(parse_markdown(this.slide, 
                                        {
                                            dir: "/data/final_presentation/",
                                            type: "slide",
                                            id: key
                                        })
                                    );

            num_slides += 1;
        });
        if ($slides_summaries.length > 0)
            $slides_summaries.slides();
        if ($slides_container.length > 0)
            $slides_container.slides();
    });

	
    $.fn.last = function(){
        return $(this[ this.length - 1 ]);
    }

	$.fn.slides = function(){
		console.log("slides created");
		$(this).children().each(function(){
			slides.push(this);
		});
	};
	$.fn.goto = function(old_slide, new_slide, style){
		console.log("jumping to " + new_slide);
        style = typeof style !== 'undefined' ? style : "fadeIn";

        if (style == "fadeIn"){
            $(slides[new_slide]).fadeIn(1250)
    		if (old_slide != new_slide){
    			$(slides[old_slide]).hide();
    		}
        }
        else{
            $(slides[new_slide]).css("left", '100%');
            $(slides[new_slide]).show();
            $(slides[new_slide]).animate({"left":"-=100%"}, "slow");
            if (old_slide != new_slide){
                $(slides[old_slide]).hide();
            }
        }
	};

});
