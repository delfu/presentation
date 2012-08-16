<html>
<head>
	<script type="text/javascript" src="/js/jquery.min.js"></script>
	<script type="text/javascript" src="/js/socket.io.min.js"></script>
	<script language="javascript">
		json_path = "${json_path}";
	</script>
	<script type="text/javascript" src="/js/markdown.js"></script>
	<script type="text/javascript" src="/js/slides.js"></script>
	<script type="text/javascript" src="/js/controls.js"></script>
	<link rel="stylesheet" type="text/css" href="/css/controls.css"/>

	<meta content='width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;' name='viewport' />
</head>
<body>
	<div id="slides_summaries">
	</div>
	<div id="controls">
		<div style="position:absolute;bottom:15px;width:100%;">
			<div id="stopwatch">00:00:00</div>
			<div id="page"></div>
		</div>
		<div class="next">
			<div class="centered">
				<img src="/images/next.png">
			</div>
		</div>
		<div class="prev">
			<div class="centered">
				<img src="/images/prev.png">
			</div>
		</div>
	</div>
</body>
</html>