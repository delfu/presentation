(function($){
	$.fn.slides = function(){
		console.log("slides created");
	};
	$.fn.animate = function(direction){
		console.log("direction " + direction);
	};
	$.fn.goto = function(slide_num){
		console.long("jumping to " + slide_num);
	};

})(jQuery);