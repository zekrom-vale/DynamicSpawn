<?xml version="1.0" encoding="UTF-8"?><x:stylesheet xmlns:x="http://www.w3.org/1999/XSL/Transform" version="1.0"><x:import href="template.xsl"/><x:import href="aside.xsl"/><x:template match="/"><x:variable name="nonce"><x:value-of select="translate(  concat(generate-id(),   generate-id(root/script),   generate-id(document('species.xml')),   generate-id(document('verify.xml'))  )  ,'idm','')"/></x:variable><html xmlns:html="http://www.w3.org/1999/xhtml" data-author="zekrom-vale" data-game="Starbound" lang="en-US" xml:lang="en-US"><head id="top"><meta charset="UTF-8"/><title>Dynamic Spawn Creator</title><meta http-equiv="Content-Security-Policy"><x:attribute name="content">
		default-src 'self';
		img-src 'self' https://* data:;
		script-src 'self' https://maxcdn.bootstrapcdn.com https://ajax.googleapis.com https://cdnjs.cloudflare.com;
		style-src 'self' https://maxcdn.bootstrapcdn.com 'nonce-<x:value-of select="$nonce"/>';
	</x:attribute></meta><meta content="block-all-mixed-content; object-src 'none'; media-src 'none';manifest-src 'none';" http-equiv="Content-Security-Policy"/><x:for-each select="root/meta/*|root/meta/*/@*"><meta content="{.}" name="{local-name()}"/></x:for-each><link href="img/icon.svg" rel="icon" type="image/svg+xml"/><link href="img/icon.png" rel="icon" type="image/png"/><link href="css/core.css" rel="stylesheet"/><link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" rel="stylesheet"/></head><body><div class="container-fluid center" id="load"><div class="main"><h1>Loading Scripts</h1><h3 class="justify-content-center">Please Wait</h3><div class="loader"/></div></div><div id="base"><nav class="navbar bg-dark sticky-top justify-content-center btn-group noPrint"><button class="btn btn-danger" data-placement="top" data-toggle="popover" data-trigger="hover" id="removeAll" title="Remove All Elements"><x:attribute name="data-content">Normal:Active tab
				Shift:Selected tab(s)
				Ctrl:No prompt
			</x:attribute>
			Remove All
		</button><button accesskey="- r" class="btn btn-warning" data-placement="top" data-toggle="popover" data-trigger="hover" id="removeVisible" title="Remove All Visible Elements"><x:attribute name="data-content">Normal:Active tab
				Shift:Selected tab(s)
			</x:attribute>
			Remove Visible
		</button><button accesskey="+ a" class="btn btn-primary" data-placement="top" data-toggle="popover" data-trigger="hover" id="addVisible" title="Add All Visible Elements"><x:attribute name="data-content">Normal:Active tab
				Shift:Selected tab(s)
			</x:attribute>
			Add Visible
		</button><button accesskey="e" class="btn btn-success" data-placement="top" data-toggle="popover" data-trigger="hover" id="iexport" title="Export The List"><x:attribute name="data-content">For use on different browsers or...
				Share with your friends
				Note: You do not need to export to save your progress, we use localStorage to do so (The modern cookie)
			</x:attribute>
			Export JSON
		</button><button accesskey="i u" class="btn btn-success" id="imp">Import JSON</button><button accesskey="d" class="btn btn-info" id="download">Download Mod</button></nav><nav class="navbar bg-warning justify-content-center noPrint"><h6><b>ALERT</b>: The species list is a work in progress, if you find something wrong please <a href="https://github.com/zekrom-vale/DynamicSpawn/issues">create an issue!</a></h6></nav><br/><div class="container-fluid row ad ad-box" id="container"><aside class="col-md-3 col-lg-2" roll="span"><h4>Active Mods</h4><ul class="list-group" id="mods"><x:call-template name="modList"/></ul></aside><main class="col-sm-12 col-md-9 col-lg-7" id="body" roll="span"><div class="alert alert-success d-flex"><div class="p-2">Path<span id="toLocal"> to Local</span>: </div><input class="p-2 flex-grow-1 code" disabled="disabled" id="path" name="path"/></div><div><div class="form-control" id="speciesLabel"><select class="form-control-sm" id="searchOp" name="option"><option value="0">All</option><option value="1">Species Name</option><option value="2">Species Value</option><option value="1.5">Species</option><option value="3">Mod Name</option><option value="4">Mod Author</option></select><input id="speciesInput" placeholder="Search Species... EX: ^kazdra$|hum|^[a-b]|Ar(gon)?i|^s[^a-dl-v\d]+|^.{5}$" type="search"/><label class="switch float-right" data-placement="left" data-toggle="tooltip" id="RegExpPre" title="Enable RegExp support"><input id="RegExp" type="checkbox"/><span class="slider round" id="RegExpS"/></label></div><br/><x:call-template name="liConstruct"/></div><x:call-template name="tabTab"/><x:call-template name="tabBody"/></main><x:call-template name="aside"/></div><scripts hidden="hidden" is="div" roll="div"><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"/><script src="js/util.js"/><script src="js/species.js"/><script src="js/custom.js"/><script defer="defer" src="js/load.js"/><script defer="defer" src="js/io.js"/><script defer="defer" src="js/globalIo.js"/><script defer="defer" src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"/><script defer="defer" src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"/><style data-allow=".active-*" id="activeStyle" nonce="{$nonce}">
			.active-npcGeneric{
				color:#fff;
				background-color:#007bff!important;
				border-color:#007bff;
			}
		</style><style data-allow=".hideMod|null" id="activeStyle2" nonce="{$nonce}">
			.hideMod{
				display:none!important;
			}
		</style><a id="save"/><input accept=".DyS.json" id="iimport" type="file"/></scripts><div class="modal center" id="modal"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title" id="modalHead"/><button class="close" data-dismiss="modal" id="modalX">✕</button></div><div class="modal-body" id="modalBody"/><div class="modal-footer"><button class="btn btn-primary" data-dismiss="modal" id="modalOk">Ok</button><button class="btn btn-danger" data-dismiss="modal" id="modalCancel">Cancel</button></div></div></div></div></div><noscript><div class="modal show center"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">JavaScript Not Working</h4><button class="close" data-dismiss="modal">✕</button></div><div class="modal-body">Not Enabled or Not Supported.<br/>This Page Will <b>Not Work!</b></div><div class="modal-footer"><button class="btn btn-primary" data-dismiss="modal">Ok</button></div></div></div></div></noscript></body></html></x:template></x:stylesheet>