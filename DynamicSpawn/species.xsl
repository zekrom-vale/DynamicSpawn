<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html [
<!ENTITY nbsp "&#160;">
<!ENTITY times "&#10005;">
<!ENTITY check "&#x2713;">
<!ELEMENT html (body,head,title,meta)>
<!ELEMENT body (#PCDATA)>
<!ELEMENT head (#PCDATA)>
]>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">





<html lang="en-US" data-author="zekrom-vale" data-game="Starbound" data-version="5" data-require="Bootstrap4,jQuery,popper,XML,XSL,XPath,DTD">
<head id="top">
	<meta charset="UTF-8"/>
	<title>Dynamic Spawn Creator</title>
	<!--Meta-->
	<meta name="viewport" content="width=device-width,initial-scale=1"/>
	<meta name="author" content="zekrom_vale"/>
	<meta name="description" content="Create your own mod! Chose the NPCs you want to spawn in Starbound."/>
	<meta name="game" content="Starbound"/>
	<meta name="generator" content="Notepad++"/>
	<meta name="keywords" content="Starbound,NPC,Spawning,Mod,Dynamic Mod"/>
	<meta name="month" content="5"/>
	<meta name="monthname" content="May"/>
	<meta name="year" content="2018"/>
	<meta name="yearshort" content="18"/>

	<meta name="creator" content="zekrom_vale"/>
	<meta name="robots" content="nofollow"/>
	<!--links-->
	<link rel="icon" type="image/svg+xml" href="img/icon.svg"/>
	<link rel="icon" type="image/png" href="img/icon.png"/>
	<link rel="stylesheet" href="css/core.css"/>
	<!--Extension links-->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"/>
</head>
<body>
<!--[if IE]><script>alert("This page is incompatible with Internet Explorer.\nPlease copy the entire link and paste it into modern browser.\nEx: Google Chrome or Firefox");</script><![endif]-->
	<!--[if !IE]><!-->
	<nav class="navbar navbar-expand-sm bg-dark navbar-dark sticky-top justify-content-center">
		<div class="btn-group">
			<button class="btn btn-danger" id="removeAll" data-toggle="modal">Remove All</button>
			<button class="btn btn-warning" accesskey="- r" id="removeVisible" onclick="removeVisible(event)">Remove Visible</button>
			<button class="btn btn-primary" accesskey="+ a" id="addVisible" onclick="addVisible(event)">Add Visible</button>
			<button class="btn btn-success" accesskey="e" onclick="iexport()">Export JSON</button>
			<button class="btn btn-success" accesskey="i u" onclick="iimport()">Import JSON</button>
			<button class="btn btn-info" accesskey="d" onclick="download()" id="download">Download Mod</button>
		</div>
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
				<xsl:apply-templates select="root/species"/>
			</div>
				<xsl:apply-templates select="root/tab"/>
			<div class="tab-content" id="npcList">
				<div id="npcGeneric" class="container tab-pane active">
					<h3>Changes the species config of Generic NPCs.</h3>
					<h5>Ex. Space Stations, Space Hotel</h5>
					<ul class="list-group"></ul>
				</div>
				<div id="npcScientific" class="container tab-pane fade">
					<h3>Changes the species config of Scientist NPCs.</h3>
					<h5>Ex. Labs</h5>
					<ul class="list-group"></ul>
				</div>
				<div id="npcCult" class="container tab-pane fade">
					<h3>Changes the species config of Cult NPCs.</h3>
					<h5>Ex. Random Encounters</h5>
					<ul class="list-group"></ul>
				</div>
				<div id="npcPirate" class="container tab-pane fade">
					<h3>Changes the species config of Space Pirate NPCs.</h3>
					<h5>Ex. Pirate Ships</h5>
					<ul class="list-group"></ul>
				</div>
				<div id="npcMerchant" class="container tab-pane fade">
					<h3>Changes the species config of Merchant NPCs.</h3>
					<h5>Ex. Merchant Ship, Industrial Merchant Ship.</h5>
					<ul class="list-group"></ul>
				</div>
				<div id="npcBandit" class="container tab-pane fade">
					<h3>Changes the species config of Bandit NPCs.</h3>
					<h5>Ex. Random Encounters</h5>
					<ul class="list-group"></ul>
				</div>
				<div id="npcROC" class="container tab-pane fade">
					<h3>Changes the species config of Random Outpost NPCs.</h3>
					<h5>NOT USED YET</h5>
					<ul class="list-group"></ul>
				</div>
			</div>
		</main>
		<aside as="span" class="col-sm-2" style="width:100%" data-pause="hover" id="side" roll="span">
		<div class="carousel slide" data-ride="carousel" id="side2">
			 <ul class="carousel-indicators invert">
				<li data-target="#side2" data-slide-to="0" class="active"></li>
				<li data-target="#side2" data-slide-to="1"></li>
				<li data-target="#side2" data-slide-to="2"></li>
				<li data-target="#side2" data-slide-to="3"></li>
			</ul>
			<div class="carousel-inner">
				<div class="card carousel-item active">
					<img class="card-img-top" crossorigin="anonymous" src="https://avatars3.githubusercontent.com/u/27376918" alt="zekrom_vale's avatar"/>
					<div class="card-body">
						<h4 class="card-title">zekrom_vale</h4>
						<p class="card-text">
							Developer of the Kazdra Recipes and Fixes Patch, it's additions varent, as well as Multicraft API.
							Devoted self taught programmer of numerous <a data-toggle="tooltip" title="TI-basic, HTML, CSS, XML, JavaScript, JSON, SVG, Lua, Bootstrap4, C#" class="help">languages</a> and programs.
						</p>
						<a rel="external" href="https://github.com/zekrom-vale" class="btn btn-primary">Github Profile</a>
					</div>
				</div>
				<div class="card carousel-item">
					<img class="card-img-top" src="img/exe.svg" alt="An icon of an EXE file" data-toggle="popover" data-trigger="hover" title="Image by Freepik" data-content="From freepik.com/free-icon/exe-file_695081.htm Licensed by Creative Commons BY 3.0"/>
					<div class="card-body">
						<h4 class="card-title">The Local Component</h4>
						<p class="card-text">Required to create the working mod in the end.</p>
						<a rel="external" href="https://github.com/zekrom-vale/DynamicSpawn/tree/c%23" class="btn btn-primary">Download Now!</a>
					</div>
				</div>
				<div class="card carousel-item" style="overflow-y:auto;padding:10px 5px;">
					<div class="card-body">
						<h5 class="card-title">[rR]eg(ular )?[eE]xp(ression)?</h5>
						<h4>&gt;-- Turn On</h4>
						<h6>A powerful syntax used to match text</h6>
						<ul class="list-group">
							<li class="list-group-item">
								<kbd>.</kbd> Matches any one character
							</li>
							<li class="list-group-item">
								<kbd>\d</kbd> Matches any digit
							</li>
							<li class="list-group-item">
								<kbd>\w</kbd> Matches any alphanumeric character. Equivalent to <code>[A-Za-z0-9_]</code>
							</li>
							<li class="list-group-item">
								<kbd>\</kbd> Matches characters literally or to escape special meanings like <code>\w</code>, <code>\d</code>
							</li>
						</ul>
						<hr/>
						<ul>
							<li class="list-group-item">
								<kbd>[]</kbd> Character set, matches any  enclosed characters. <kbd>-</kbd> is used as a range
							</li>
							<li class="list-group-item">
								<kbd>[^]</kbd> Negated character set, will not match enclosed characters.
							</li>
							<li class="list-group-item">
								<kbd>()</kbd> Group, groups characters together
							</li>
						</ul>
						<hr/>
						<ul>
							<li class="list-group-item">
								<kbd>|</kbd> Alteration, either or.
							</li>
							<li class="list-group-item">
								<kbd>^</kbd> Matches start
							</li>
							<li class="list-group-item">
								<kbd>$</kbd> Matches end
							</li>
						</ul>
						<hr/>
						<ul>
							<li class="list-group-item">
								<kbd>*</kbd> Matches 0 or more
							</li>
							<li class="list-group-item">
								<kbd>+</kbd> Matches 1 or more
							</li>
							<li class="list-group-item">
								<kbd>?</kbd> Matches 0 or 1
							</li>
						</ul>
						<div class="btn-group btn-group-sm" style="margin-top:5px;">
							<a rel="external" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp" class="btn btn-primary">moz://a</a>
							<a rel="external" href="https://www.w3schools.com/jsref/jsref_obj_regexp.asp" class="btn btn-primary">w3schools</a>
						</div>
					</div>
				</div>
				<div class="card carousel-item">
					<div class="card-body">
						<h4 class="card-title">You Ad Here</h4>
						<p class="card-text">
							For $2 a month you could host your ad on this site. Use <a data-toggle="tooltip" title="Bootstrap4 and jQuery available" class="help">HTML/CSS/JS</a> or any image.
						</p>
						<small>Your ad must comply to my standards. No adult content, no scams, no political junk, no misleading information, no malware, ect.</small>
						<!--<a rel="external" href="" class="btn btn-primary">Contact NOW!</a>-->
					</div>
				</div>
			</div>
			<a class="carousel-control-prev invert" href="#side2" data-slide="prev"><span class="carousel-control-prev-icon"></span></a>
			<a class="carousel-control-next invert" href="#side2" data-slide="next"><span class="carousel-control-next-icon"></span></a>
		</div>
		</aside>
	</div>
	<!--[if !IE]><!-->
	<scripts is="div" roll="div" hidden="hidden">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<script src="js/util.js"></script>
		<script src="js/species.js"></script>
		<script src="js/io.js"></script>
		<script src="js/custom.js"></script>
		<script src="js/load.js"></script>
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
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
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
					<button type="button" class="btn btn-primary" data-dismiss="modal" id="modalOk">Ok</button>
					<button type="button" class="btn btn-danger" data-dismiss="modal" id="modalCancel">Cancel</button>
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
					<div class="modal-footer"><button type="button" class="btn btn-primary" data-dismiss="modal">Ok</button></div>
				</div>
			</div>
		</div>
	</noscript>
	<template>
		<li class="list-group-item">
			<button class="btn btn-dark" onclick="modifyCont(this)">
				<p class="species"></p>
				<img class="off"/>
				<img class="on"/>
			</button>
			<div class="btn-group species-group">
				<button class="btn btn-secondary" onclick="addToAll(this,event)">
					Add to All
				</button>
				<button class="btn btn-secondary" onclick="removeFromAll(this,event)">
					Remove from All
				</button>
			</div>
		</li>
	</template>
</body>
</html>

	</xsl:template>
	<xsl:template match="root/species">
		<ul class="list-group" id="speciesList" style="height:25vh;overflow:auto">
			<xsl:for-each select="mod">
				<xsl:sort select="@name"/>
				<xsl:for-each select="specie">
					<li class="list-group-item {../@name}" value="{@value}" id="{@value}">
						<button class="btn btn-dark" onclick="modifyCont(this)">
							<xsl:value-of select="@name"/>
							<xsl:choose>
								<xsl:when test="imgOn and imgOff">
									<img class="off" src="img/{imgOff/@src}"/>
									<img class="on" src="img/{imgOn/@src}"/>
								</xsl:when>
								<xsl:otherwise>
									<img class="off" src="img/tab_other.png"/>
									<img class="on" src="img/tab_other_select.png"/>
								</xsl:otherwise>
							</xsl:choose>
						</button>
						<div class="btn-group species-group">
							<button class="btn btn-secondary" onclick="addToAll(this,event)">
								Add to All
							</button>
							<button class="btn btn-secondary" onclick="removeFromAll(this,event)">
								Remove from All
							</button>
						</div>
					</li>
				</xsl:for-each>
			</xsl:for-each>
		</ul>
	</xsl:template>
	<xsl:template match="root/tab">
		<ul class="nav nav-tabs" role="tablist" id="npcTab">
			<xsl:for-each select="*">
				<li class="nav-item">
					<a class="nav-link" data-toggle="tab" data-hash="#npc{local-name()}">
						<xsl:value-of select="local-name()"/>
						<span class="badge badge-primary">&check;</span>
					</a>
				</li>
			</xsl:for-each>
		</ul>
	</xsl:template>

</xsl:stylesheet>