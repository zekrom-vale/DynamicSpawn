<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html[
<!ENTITY nbsp "&#160;">
<!ENTITY times "&#10005;">
<!ENTITY b "bootstrap">
<!ENTITY bt "btn btn-">
<!ELEMENT html (body,head)>
<!ELEMENT body ANY>
<!ELEMENT head ANY>
]>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:import href="template.xsl"/>
	<xsl:import href="aside.xsl"/>
	<xsl:template match="/">

<html xmlns:html="http://www.w3.org/1999/xhtml" lang="en-US" xml:lang="en-US" data-author="zekrom-vale" data-game="Starbound" data-require="Bootstrap4,jQuery,popper,XML,XSL,XPath">
<head id="top">
	<meta charset="UTF-8"/>
	<title>Dynamic Spawn Creator</title>
	<xsl:for-each select="root/meta/*">
		<meta name="{local-name()}" content="{text()}"/>
		<xsl:if test="@*">
			<xsl:for-each select="@*">
				<meta name="{name(.)}" content="{.}"/>
			</xsl:for-each>
		</xsl:if>
	</xsl:for-each>
	<!--links-->
	<link rel="icon" type="image/svg+xml" href="img/icon.svg"/>
	<link rel="icon" type="image/png" href="img/icon.png"/>
	<link rel="stylesheet" href="css/core.css"/>
	<!--Extension links-->
	<link rel="stylesheet" href="https://maxcdn.&b;cdn.com/&b;/4.1.0/css/&b;.min.css"/>
</head>
<body>
<!--[if IE]><script>
//<![CDATA[
alert("This page is incompatible with Internet Explorer.\nPlease copy the entire link and paste it into modern browser.\nEx: Google Chrome or Firefox");//]]>
</script><![endif]-->
	<!--[if !IE]><!-->
	<nav class="navbar navbar-expand-sm bg-dark navbar-dark sticky-top justify-content-center">
		<div class="btn-group">
			<button class="&bt;danger" id="removeAll" data-toggle="modal">Remove All</button>
			<button class="&bt;warning" accesskey="- r" id="removeVisible" onclick="removeVisible(event)">Remove Visible</button>
			<button class="&bt;primary" accesskey="+ a" id="addVisible" onclick="addVisible(event)">Add Visible</button>
			<button class="&bt;success" accesskey="e" onclick="iexport()">Export JSON</button>
			<button class="&bt;success" accesskey="i u" onclick="iimport()">Import JSON</button>
			<button class="&bt;info" accesskey="d" onclick="download()" id="download">Download Mod</button>
		</div>
	</nav>
	<nav class="navbar navbar-expand-sm bg-warning navbar-warning sticky-top justify-content-center">
		<h6>ALERT: The species list is a work in progress, if you find something wrong please contact me!</h6>
	</nav>
	<!--<![endif]-->
	<br/>
	<div class="container-fluid row ad ad-box" id="container">
		<main as="span" roll="span" class="col-sm-10" id="body">
			<div class="alert alert-success d-flex">
				<div class="p-2">Path<span id="toLocal"> to Local</span>:&nbsp;</div>
				<input class="p-2 flex-grow-1 code" id="path" disabled="disabled"/>
			</div>
			<div>
				<div class="form-control" id="speciesLabel">
					<input id="speciesInput" type="text" placeholder="Search Species... EX: ^kazdra$|hum|^[a-b]|Ar(gon)?i|^s[^a-d]+|^.{5}$"/>
					<label class="switch float-right" style="position:relative;bottom:4px" data-toggle="tooltip" data-placement="left" title="Enable RegExp support">
						<input type="checkbox" id="RegExp"/>
						<span class="slider round"></span>
					</label>
				</div>
				<br/>
				<xsl:call-template name="liConstruct"/>
			</div>
			<xsl:call-template name="tabTab"/>
			<xsl:call-template name="tabBody"/>
		</main>
		<xsl:call-template name="aside"/>
	</div>
	<!--[if !IE]><!-->
	<scripts is="div" roll="div" hidden="hidden">
		<xsl:for-each select="root/script/*">
			<xsl:choose>
				<xsl:when test="name()='f'">
					<script src="js/{text()}.js"/>
				</xsl:when>
				<xsl:otherwise>
					<script src="https://{text()}.min.js"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:for-each>
		<style id="activeStyle">
			.active-npcGeneric{
				z-index:2;
				color:#fff;
				background-color:#007bff!important;
				border-color:#007bff;
			}
		</style>
		<a id="save"></a>
		<input type="file" id="iimport" accept=".DyS.json"/>
	</scripts>
	<!--[if !IE]><!-->
	<div class="modal" id="modal">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title" id="modalHead"></h4>
					<button type="button" class="close" data-dismiss="modal" id="modalX">&times;</button>
				</div>
				<div class="modal-body" id="modalBody"></div>
				<div class="modal-footer">
					<button type="button" class="&bt;primary" data-dismiss="modal" id="modalOk">Ok</button>
					<button type="button" class="&bt;danger" data-dismiss="modal" id="modalCancel">Cancel</button>
				</div>
			</div>
		</div>
	</div>
	<!--<![endif]-->
	<noscript>
		<div class="modal show" style="display:block;">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header"><h4 class="modal-title">JavaScript Not Working</h4><button type="button" class="close" data-dismiss="modal">&times;</button></div>
					<div class="modal-body">Not Enabled or Not Supported.<br/>This Page Will <b>Not Work!</b></div>
					<div class="modal-footer"><button type="button" class="&bt;primary" data-dismiss="modal">Ok</button></div>
				</div>
			</div>
		</div>
	</noscript>
</body>
</html>
</xsl:template>
</xsl:stylesheet>