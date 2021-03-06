<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE html[
<!ENTITY nbsp "&#160;">
]>
<x:stylesheet version="1.0" xmlns:x="http://www.w3.org/1999/XSL/Transform" xmlns="">
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
<html lang="en-US" data-author="zekrom-vale" data-game="Starbound" dark="">
<head id="top">
	<meta charset="UTF-8"/>
	<title>Dynamic Spawn Creator</title>
	<meta http-equiv="Content-Security-Policy"><x:attribute name="content">
		default-src 'self';
		img-src 'self' https://* data:;
		script-src 'self' https://maxcdn.bootstrapcdn.com https://ajax.googleapis.com https://cdnjs.cloudflare.com;
		style-src 'self' https://maxcdn.bootstrapcdn.com 'nonce-<x:value-of select="$nonce"/>';
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
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"/>
		<script src="webWorker/core.js"/>
		<script src="js/util.js"/>
		<script src="js/node.js"/>
		<script defer="" src="js/load.js"/>
		<script src="js/species.js"/>
		<script defer="" src="js/io.js"/>
		<script defer="" src="js/globalIo.js"/>
		<script defer="" src="js/nav.js"/>
		<script defer="" src="js/search.js"/>
		<script defer="" src="js/custom.js"/>
		<script defer="" src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"/>
		<script defer="" src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"/>
		<style id="activeStyle2" nonce="{$nonce}">
			.hideMod{
				display:none!important;
			}
		</style>
	<link rel="stylesheet" href="css/core.css"/>
	<!--<link rel="alternative stylesheet" href="css/dark.css" title="Dark"/>-->
</head>
<body>
<div hidden="" aria-hidden="true">
	<a id="save"></a>
	<input type="file" id="iimport" accept=".DyS.json"/>
</div>
<div id="base">
	<nav class="navbar bg-dark sticky-top justify-content-center btn-group" roll="menubar" data-no="print" tabindex="0" id="menubar">
		<button class="btn btn-danger" id="removeAll" data-toggle="popover" data-placement="top" data-trigger="hover" title="Remove All Elements" tabindex="-1" roll="menuitem" aria-keyshortcuts="Delete">
			<x:attribute name="data-content">Normal:Active tab
				Shift:Selected tab(s)
				Ctrl:No prompt
			</x:attribute>
			Remove All
		</button>
		<button class="btn btn-warning" aria-keyshortcuts="- _ Backspace" id="removeVisible" data-toggle="popover" data-placement="top" data-trigger="hover" title="Remove All Visible Elements" tabindex="-1" roll="menuitem">
			<x:attribute name="data-content">Normal:Active tab
				Shift:Selected tab(s)
			</x:attribute>
			Remove Visible
		</button>
		<button class="btn btn-primary" aria-keyshortcuts="= Plus" id="addVisible" data-toggle="popover" data-placement="top" data-trigger="hover" title="Add All Visible Elements" tabindex="-1" roll="menuitem">
			<x:attribute name="data-content">Normal:Active tab
				Shift:Selected tab(s)
			</x:attribute>
			Add Visible
		</button>
		<button class="btn btn-success" aria-keyshortcuts="e" id="iexport"  data-toggle="popover" data-placement="top" data-trigger="hover" title="Export The List" tabindex="-1" roll="menuitem">
			<x:attribute name="data-content">For use on different browsers or...
				Share with your friends or...
				Save a backup for a different mod pack.
				Note: You do not need to export to save your progress, we use localStorage to do so. (The modern cookie)
				Mod selection not saved yet.
			</x:attribute>
			Export JSON
		</button>
		<button class="btn btn-success" aria-keyshortcuts="i Insert" id="imp" tabindex="-1" roll="menuitem">Import JSON</button>
		<button class="btn btn-info" aria-keyshortcuts=" " id="download" tabindex="-1" roll="menuitem">Download Mod</button>
	</nav>
	<nav class="navbar bg-warning justify-content-center" data-no="print"><h6 roll="note">
		<b>ALERT</b>: The species list is a work in progress, if you find something wrong please <a href="https://github.com/zekrom-vale/DynamicSpawn/issues">create an issue!</a>
	</h6></nav>
	<br/>
	<div class="container-fluid row" id="container" roll="window">
		<aside roll="complementary" class="col-md-3 col-lg-2">
			<h4 id="ActiveMods">Active Mods</h4>
			<ul class="list-group" id="mods" roll="listbox" aria-multiselectable="true" aria-keyshortcuts="PageUp x PageDown z Home End" aria-labelledby="ActiveMods">
				<x:call-template name="modList"/>
			</ul>
		</aside>
		<main roll="input" class="col-sm-12 col-md-9 col-lg-7" id="body">
			<div class="alert alert-success d-flex">
				<div>Path<span id="toLocal"> to Local</span>:&nbsp;</div>
				<input class="flex-grow-1 code" id="path" disabled="disabled" name="path" aria-readonly="true"/>
			</div>
			<div id="speciesContainer">
				<form class="form-control" roll="group" id="speciesLabel" aria-label="Search controls">
					<select class="form-control-sm" id="searchOp" name="option" aria-keyshortcuts="o">
						<option value="0">All</option>
						<option value="1">Species Name</option>
						<option value="2">Species Value</option>
						<option value="1.5">Species</option>
						<option value="3">Mod Name</option>
						<option value="4">Mod Author</option>
					</select>
					<input list="speciesDataList" id="speciesInput" roll="searchbox" autocomplete="on" aria-label="Search" placeholder="Search Species... EX: ^kazdra$|hum|^[a-b]|Ar(gon)?i|^s[^a-dl-v\d]+|^.{5}$" aria-placeholder="search text or regular expression when enabled" aria-owns="RegExpPre" aria-keyshortcuts="f"/>
					<label class="switch round float-right" data-toggle="tooltip" data-placement="left" title="Enable RegExp support" id="RegExpPre" aria-details="regExpDes">
						<input roll="switch" type="checkbox" id="RegExp" aria-keyshortcuts="r ScrollLock"/>
						<span id="RegExpS"></span>
					</label>
				</form>
				<br/>
				<x:call-template name="liConstruct"/>
			</div>
			<x:call-template name="tabTab"/>
			<x:call-template name="tabBody"/>
		</main>
		<aside roll="contentinfo" class="col-0p col-lg-3" data-pause="hover" id="side">
			<script defer="" src="html/asideInt.js"></script>
		</aside>
	</div>
	<div class="modal center" id="modal" aria-modal="true">
		<div class="modal-dialog">
			<div class="modal-content" roll="alert">
				<div class="modal-header">
					<h4 class="modal-title" id="modalHead" roll="alertdialog"></h4>
					<button class="close" id="modalX">&#10005;</button>
				</div>
				<div class="modal-body" id="modalBody" roll="alertdialog"></div>
				<div class="modal-footer">
					<button class="btn btn-primary" id="modalOk" data-nav="false">Ok</button>
					<button class="btn btn-danger" id="modalCancel" data-nav="false">Cancel</button>
				</div>
			</div>
		</div>
	</div>
	<x:call-template name="dataList"/>
</div>
<noscript>
	<div class="modal show center" aria-modal="true">
		<div class="modal-dialog">
			<div class="modal-content" roll="alert">
				<h4 class="modal-header modal-title" roll="alertdialog">JavaScript Not Working</h4>
				<div class="modal-body" roll="alertdialog">Not Enabled or Not Supported.<br/>This Page Will <b>Not Work at All! </b></div>
			</div>
		</div>
	</div>
</noscript>
<!--[if IE]>
<div class="modal show center" aria-modal="true">
	<div class="modal-dialog">
		<div class="modal-content" roll="alert">
			<div class="modal-header"><h4 class="modal-title" roll="alertdialog">This page is incompatible with Internet Explorer</h4><button class="close" data-dismiss="modal">&#10005;</button></div>
			<div class="modal-body" roll="alertdialog">Please copy the entire link and paste it into modern browser.<br/>Ex: Google Chrome or Firefox</div>
			<div class="modal-footer"><button class="btn btn-primary" data-dismiss="modal">Ok</button></div>
		</div>
	</div>
</div>
<![endif]-->
</body>
</html>
</x:template>
</x:stylesheet>