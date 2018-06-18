<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html[
<!ENTITY nbsp "&#160;">
<!ENTITY x "&#10005;">
<!ENTITY b "bootstrap">
<!ENTITY bt "btn btn-">
<!ENTITY w "-warning">
<!ENTITY n "navbar">
<!ENTITY m "modal">
<!ENTITY H "https://">
]>
<x:stylesheet version="1.0" xmlns:x="http://www.w3.org/1999/XSL/Transform">
	<x:import href="template.xsl"/>
<x:template match="/">
	<x:variable name="nonce">
		<x:value-of select="translate(
		concat(generate-id(),
			generate-id(root/script),
			generate-id(document('species.xml')),
			generate-id(document('verify.xml'))
		)
		,'idm','')"/>
	</x:variable>
<html xmlns:info="https://info" xml:lang="en-US" lang="en-US" info:author="zekrom-vale" info:game="Starbound">
<!-- `xmlns` is automatically assigned to html elements-->
<head id="top">
	<meta charset="UTF-8"/>
	<title>Dynamic Spawn Creator</title>
	<meta http-equiv="Content-Security-Policy"><x:attribute name="content">
		default-src 'self';
		img-src 'self' &H;* data:;
		script-src 'self' &H;maxcdn.&b;cdn.com &H;ajax.googleapis.com &H;cdnjs.cloudflare.com;
		style-src 'self' &H;maxcdn.&b;cdn.com 'nonce-<x:value-of select="$nonce"/>';
	</x:attribute></meta>
	<meta http-equiv="Content-Security-Policy" content="block-all-mixed-content; object-src 'none'; media-src 'none';manifest-src 'none';"/>
	<x:for-each select="root/meta/*|root/meta/*/@*">
		<meta name="{local-name()}" content="{.}"/>
	</x:for-each>
	<!--links-->
	<link rel="alternate" hreflang="en" href="https://zekrom-vale.github.io/DynamicSpawn"/>
	<link rel="canonical" hreflang="en" href="https://zekrom-vale.github.io/DynamicSpawn/index.xml"/>
	<link rel="icon" type="image/svg+xml" href="img/icon.svg"/>
	<link rel="icon" type="image/png" href="img/icon.png"/>
		<script src="&H;ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"/>
		<script src="js/util.js"/>
		<script src="js/node.js"/>
		<script src="js/load.js"/>
		<script src="js/species.js"/>
		<script defer="defer" src="js/io.js"/>
		<script defer="defer" src="js/globalIo.js"/>
		<script defer="defer" src="js/custom.js"/>
		<script defer="defer" src="&H;cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"/>
		<script defer="defer" src="&H;maxcdn.&b;cdn.com/&b;/4.1.0/js/&b;.min.js"/>
		<style id="activeStyle" nonce="{$nonce}">
			.active-npcGeneric{
				color:#fff;
				background-color:#007bff!important;
				border-color:#007bff;
			}
		</style>
		<style id="activeStyle2" nonce="{$nonce}">
			.hideMod{
				display:none!important;
			}
		</style>
	<link rel="stylesheet" href="css/core.css"/>
	<!--<link rel="alternative stylesheet" href="css/dark.css" title="Dark"/>-->
</head>
<body>
<div hidden="hidden">
	<a id="save"></a>
	<input type="file" id="iimport" accept=".DyS.json"/>
</div>
<div id="load" class="container-fluid center">
	<div class="main">
		<h1>Loading Scripts</h1>
		<h3 class="justify-content-center">Please Wait</h3>
		<div class="loader"></div>
	</div>
</div>
<div id="base">
	<nav class="&n; bg-dark sticky-top justify-content-center btn-group noPrint">
		<button class="&bt;danger" id="removeAll" data-toggle="popover" data-placement="top" data-trigger="hover" title="Remove All Elements">
			<x:attribute name="data-content">Normal:Active tab
				Shift:Selected tab(s)
				Ctrl:No prompt
			</x:attribute>
			Remove All
		</button>
		<button class="&bt;warning" accesskey="- r" id="removeVisible" data-toggle="popover" data-placement="top" data-trigger="hover" title="Remove All Visible Elements">
			<x:attribute name="data-content">Normal:Active tab
				Shift:Selected tab(s)
			</x:attribute>
			Remove Visible
		</button>
		<button class="&bt;primary" accesskey="+ a" id="addVisible" data-toggle="popover" data-placement="top" data-trigger="hover" title="Add All Visible Elements">
			<x:attribute name="data-content">Normal:Active tab
				Shift:Selected tab(s)
			</x:attribute>
			Add Visible
		</button>
		<button class="&bt;success" accesskey="e" id="iexport"  data-toggle="popover" data-placement="top" data-trigger="hover" title="Export The List">
			<x:attribute name="data-content">For use on different browsers or...
				Share with your friends
				Note: You do not need to export to save your progress, we use localStorage to do so (The modern cookie)
			</x:attribute>
			Export JSON
		</button>
		<button class="&bt;success" accesskey="i u" id="imp">Import JSON</button>
		<button class="&bt;info" accesskey="d" id="download">Download Mod</button>
	</nav>
	<nav class="&n; bg&w; justify-content-center noPrint"><h6>
		<b>ALERT</b>: The species list is a work in progress, if you find something wrong please <a href="&H;github.com/zekrom-vale/DynamicSpawn/issues">create an issue!</a>
	</h6></nav>
	<br/>
	<div class="container-fluid row ad ad-box" id="container">
		<aside roll="span" class="col-md-3 col-lg-2">
			<h4>Active Mods</h4>
			<ul class="list-group" id="mods">
				<x:call-template name="modList"/>
			</ul>
		</aside>
		<main roll="span" class="col-sm-12 col-md-9 col-lg-7" id="body">
			<div class="alert alert-success d-flex">
				<div class="p-2">Path<span id="toLocal"> to Local</span>:&nbsp;</div>
				<input class="p-2 flex-grow-1 code" id="path" disabled="disabled" name="path"/>
			</div>
			<div>
				<div class="form-control" id="speciesLabel">
					<select class="form-control-sm" id="searchOp" name="option">
						<option value="0">All</option>
						<option value="1">Species Name</option>
						<option value="2">Species Value</option>
						<option value="1.5">Species</option>
						<option value="3">Mod Name</option>
						<option value="4">Mod Author</option>
					</select>
					<input id="speciesInput" type="search" placeholder="Search Species... EX: ^kazdra$|hum|^[a-b]|Ar(gon)?i|^s[^a-dl-v\d]+|^.{5}$"/>
					<label class="switch float-right" data-toggle="tooltip" data-placement="left" title="Enable RegExp support" id="RegExpPre">
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
		<aside class="col-0p col-lg-3" data-pause="hover" id="side" roll="span">
			<script defer="defer" src="html/asideInt.js"></script>
		</aside>
	</div>
	<div class="&m; center" id="&m;">
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
</div>
<noscript>
	<div class="&m; show center">
		<div class="&m;-dialog">
			<div class="&m;-content">
				<div class="&m;-header"><h4 class="&m;-title">JavaScript Not Working</h4><button class="close" data-dismiss="&m;">&x;</button></div>
				<div class="&m;-body">Not Enabled or Not Supported.<br/>This Page Will <b>Not Work!</b></div>
				<div class="&m;-footer"><button class="&bt;primary" data-dismiss="&m;">Ok</button></div>
			</div>
		</div>
	</div>
</noscript>
<!--[if IE]>
<div class="&m; show center">
	<div class="&m;-dialog">
		<div class="&m;-content">
			<div class="&m;-header"><h4 class="&m;-title">This page is incompatible with Internet Explorer</h4><button class="close" data-dismiss="&m;">&x;</button></div>
			<div class="&m;-body">Please copy the entire link and paste it into modern browser.<br/>Ex: Google Chrome or Firefox</div>
			<div class="&m;-footer"><button class="&bt;primary" data-dismiss="&m;">Ok</button></div>
		</div>
	</div>
</div>
<![endif]-->
</body>
</html>
</x:template>
</x:stylesheet>