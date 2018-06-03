<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html[
<!ENTITY nbsp "&#160;">
<!ENTITY x "&#10005;">
<!ENTITY b "bootstrap">
<!ENTITY bt "btn btn-">
<!ENTITY w "-warning">
<!ENTITY n "navbar">
<!ENTITY m "modal">
<!ELEMENT html (body,head)>
<!ELEMENT body ANY>
<!ELEMENT head ANY>
]>
<x:stylesheet version="1.0" xmlns:x="http://www.w3.org/1999/XSL/Transform">
	<x:import href="template.xsl"/>
	<x:import href="aside.xsl"/>
	<x:template match="/">
<html xmlns:html="http://www.w3.org/1999/xhtml" lang="en-US" xml:lang="en-US" data-author="zekrom-vale" data-game="Starbound" data-require="Bootstrap4,jQuery,popper,XML,XSL,XPath">
<head id="top">
	<meta charset="UTF-8"/>
	<title>Dynamic Spawn Creator</title>
	<x:for-each select="root/meta/*|root/meta/*/@*">
		<meta name="{name(.)}" content="{.}"/>
	</x:for-each>
	<!--links-->
	<link rel="icon" type="image/svg+xml" href="img/icon.svg"/>
	<link rel="icon" type="image/png" href="img/icon.png"/>
	<link rel="stylesheet" href="css/core.css"/>
	<!--Extension links-->
	<link rel="stylesheet" href="https://maxcdn.&b;cdn.com/&b;/4.1.0/css/&b;.min.css"/>
</head>
<body>
<!--[if IE]><script>
alert("This page is incompatible with Internet Explorer.\nPlease copy the entire link and paste it into modern browser.\nEx: Google Chrome or Firefox");
</script><![endif]-->
	<!--[if !IE]><!-->
<div id="load" class="container-fluid" style="z-index:999999;position:fixed;top:0;right:0">
	<div style="height:calc(50vh - 113.5px / 2 - 30px)"></div>
	<div style="background-color:white;border-radius:5px;padding:30px 15px">
		<h1>Loading Scripts</h1>
		<h3 class="justify-content-center">Please Wait</h3>
		<div class="progress">
			<div class="progress-bar progress-bar-striped progress-bar-animated" style="width:0%" id="loading"></div>
		</div>
	</div>
	<div style="height:calc(50vh - 113.5px / 2 - 30px)"></div>
</div>
<div style="opacity:0.3;" id="base">
	<nav class="&n; bg-dark sticky-top justify-content-center btn-group">
		<button class="&bt;danger" id="removeAll" data-toggle="&m;">Remove All</button>
		<button class="&bt;warning" accesskey="- r" id="removeVisible" onclick="removeVisible(event)">Remove Visible</button>
		<button class="&bt;primary" accesskey="+ a" id="addVisible" onclick="addVisible(event)">Add Visible</button>
		<button class="&bt;success" accesskey="e" onclick="iexport()">Export JSON</button>
		<button class="&bt;success" accesskey="i u" onclick="iimport()">Import JSON</button>
		<button class="&bt;info" accesskey="d" onclick="download()" id="download">Download Mod</button>
	</nav>
	<nav class="&n; bg&w; justify-content-center"><h6>
		<b>ALERT</b>: The species list is a work in progress, if you find something wrong please <a href="https://github.com/zekrom-vale/DynamicSpawn/issues">create an issue!</a>
	</h6></nav>
	<!--<![endif]-->
	<br/>
	<div class="container-fluid row ad ad-box" id="container">
		<aside as="span" roll="span" class="col-sm-0 col-md-3 col-lg-2 col-xl-2">
			<h4>Active Mods</h4>
			<ul class="list-group" id="mods">
				<x:call-template name="modList"/>
			</ul>
		</aside>
		<main as="span" roll="span" class="col-sm-12 col-md-9 col-lg-7 col-xl-7" id="body">
			<div class="alert alert-success d-flex">
				<div class="p-2">Path<span id="toLocal"> to Local</span>:&nbsp;</div>
				<input class="p-2 flex-grow-1 code" id="path" disabled="disabled" name="path"/>
			</div>
			<div>
				<div class="form-control" id="speciesLabel">
					<select class="form-control-sm" style="width:65px;display:inline;" id="searchOp" name="option">
						<option value="0">All</option>
						<option value="1">Species Name</option>
						<option value="2">Species Value</option>
						<option value="1.5">Species</option>
						<option value="3">Mod Name</option>
						<option value="4">Mod Author</option>
					</select>
					<input id="speciesInput" type="text" name="search" style="position:relative;right:-12px;" placeholder="Search Species... EX: ^kazdra$|hum|^[a-b]|Ar(gon)?i|^s[^a-dl-v\d]+|^.{5}$"/>
					<label class="switch float-right" style="position:relative;bottom:4px;" data-toggle="tooltip" data-placement="left" title="Enable RegExp support">
						<input type="checkbox" id="RegExp"/>
						<span class="slider round" id="RegExpS"></span>
					</label>
				</div>
				<br/>
				<x:call-template name="liConstruct"/>
			</div>
			<x:call-template name="tabTab"/>
			<x:call-template name="tabBody"/>
		</main>
		<x:call-template name="aside"/>
	</div>
	<!--[if !IE]><!-->
	<scripts is="div" roll="div" hidden="hidden">
		<x:for-each select="root/script/*">
			<x:choose>
				<x:when test="name()='f'">
					<script src="js/{text()}.js"/>
				</x:when>
				<x:otherwise>
					<script src="https://{text()}.min.js"/>
				</x:otherwise>
			</x:choose>
		</x:for-each>
		<style id="activeStyle">
			.active-npcGeneric{
				z-index:2;
				color:#fff;
				background-color:#007bff!important;
				border-color:#007bff;
			}
		</style>
		<style id="activeStyle2">
			.hideMod{
				display:none!important;
			}
		</style>
		<a id="save"></a>
		<input type="file" id="iimport" accept=".DyS.json"/>
	</scripts>
	<!--[if !IE]><!-->
	<div class="&m;" id="&m;">
		<div class="&m;-dialog">
			<div class="&m;-content">
				<div class="&m;-header">
					<h4 class="&m;-title" id="&m;Head"></h4>
					<button class="close" data-dismiss="&m;" id="&m;X">&x;</button>
				</div>
				<div class="&m;-body" id="&m;Body"></div>
				<div class="&m;-footer">
					<button class="&bt;primary" data-dismiss="&m;" id="&m;Ok">Ok</button>
					<button class="&bt;danger" data-dismiss="&m;" id="&m;Cancel">Cancel</button>
				</div>
			</div>
		</div>
	</div>
	<!--<![endif]-->
	<noscript>
		<div class="&m; show" style="display:block;">
			<div class="&m;-dialog">
				<div class="&m;-content">
					<div class="&m;-header"><h4 class="&m;-title">JavaScript Not Working</h4><button class="close" data-dismiss="&m;">&x;</button></div>
					<div class="&m;-body">Not Enabled or Not Supported.<br/>This Page Will <b>Not Work!</b></div>
					<div class="&m;-footer"><button class="&bt;primary" data-dismiss="&m;">Ok</button></div>
				</div>
			</div>
		</div>
	</noscript>
</div>
</body>
</html>
</x:template>
</x:stylesheet>