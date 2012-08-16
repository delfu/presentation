$(function(){

	var $slides_summaries = $("#slides_summaries");
    var $slides_container = $("#slides_container");

    //global variable
	slides = [];
	num_slides = 0; 

    $.getJSON(json_path, function(json) {
        $.each(json, function(key, value){
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

	


	$.fn.slides = function(){
		console.log("slides created");
		$(this).children().each(function(){
			slides.push(this);
		});
	};
	// $.fn.animate = function(direction){
	// 	console.log("direction " + direction);
	// };
	$.fn.goto = function(old_slide, new_slide){
		console.log("jumping to " + new_slide);		

		// if (new_slide >= old_slide)
			$(slides[new_slide]).css("left", '100%');
		// else
		// 	$(slides[new_slide]).css("right", '100%');
		$(slides[new_slide]).show();
		// if (new_slide >= old_slide)
			$(slides[new_slide]).animate({"left":"-=100%"}, "slow");
		// else
		// 	$(slides[new_slide]).animate({"right":"-=100%"}, "slow");


		if (old_slide != new_slide){
			$(slides[old_slide]).hide();
		}
	};

});
