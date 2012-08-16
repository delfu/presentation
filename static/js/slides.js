$(function(){

	var slides = [];
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
