<html>
<head>
	<script type="text/javascript" src="/js/jquery.min.js"></script>
	<script type="text/javascript" src="/js/socket.io.min.js"></script>
	<script language="javascript">
		json_path = "${json_path}";
	</script>
	<script type="text/javascript" src="/js/markdown.js"></script>
	<script type="text/javascript" src="/js/slideshow.js"></script>
	<script type="text/javascript" src="/js/controller.js"></script>
	<script type="text/javascript">
		$(function(){
		    show = new Slideshow(json_path, "/data/final_presentation/");
		    controller = new SlideshowController(show);
		});
	</script>
	<link rel="stylesheet" type="text/css" href="/css/presentation.css"/>

	<meta content='width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;' name='viewport' />
	<meta name="viewport" content="width=device-width" />
</head>
<body>
	<div id="slides_container"></div>
	<div id="page"></div>
</body>
</html>