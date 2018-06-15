<?xml version="1.0" encoding="UTF-8"?><x:stylesheet xmlns:x="http://www.w3.org/1999/XSL/Transform" version="1.0"><x:template name="aside"><aside class="col-0p col-lg-3" data-pause="hover" id="side" roll="span"><div class="carousel slide" data-ride="carousel" id="side2"><ul class="carousel-indicators invert"><li class="active" data-slide-to="0" data-target="#side2"/><li data-slide-to="1" data-target="#side2"/><li data-slide-to="2" data-target="#side2"/><li data-slide-to="3" data-target="#side2"/><li data-slide-to="4" data-target="#side2"/></ul><div class="carousel-inner"><div class="card carousel-item active"><img alt="zekrom_vale's avatar" class="card-img-top" crossorigin="anonymous" src="https://avatars3.githubusercontent.com/u/27376918"/><div class="card-body"><h4 class="card-title">zekrom_vale</h4><p class="card-text">
							Developer of the Kazdra Recipes and Fixes Patch, it's additions varent, as well as Multicraft API.
							Devoted self taught programmer of numerous 
							<a class="help" data-toggle="tooltip" title="TI-basic, JavaScript(JSON, jQuery*), PHP*, Lua, C#*, XSLT">
								languages
							</a>
							, <a class="help" data-toggle="tooltip" title="HTML, CSS(Bootstrap4), XML(SVG, DTD, XSD*), BB, MD">
								markup
							</a>
							, <a class="help" data-toggle="tooltip" title="URL, Query string, hash, XPath">
								path systems
							</a>
							, and <a class="help" data-toggle="tooltip" title="Microsoft Word, Google Docs and co., GIMP">
								programs
							</a>, as well as Windows OS.
						</p><a class="btn btn-primary" href="https://github.com/zekrom-vale" rel="external">Github Profile</a></div></div><div class="card carousel-item"><img alt="An icon of an EXE file" class="card-img-top" data-content="From freepik.com/free-icon/exe-file_695081.htm Licensed by Creative Commons BY 3.0" data-toggle="popover" data-trigger="hover" src="img/exe.svg" title="Image by Freepik"/><div class="card-body"><h4 class="card-title">The Local Component</h4><p class="card-text">Required to create the working mod in the end.</p><a class="btn btn-primary" href="https://github.com/zekrom-vale/DynamicSpawn/tree/c%23" rel="external">Download Now!</a></div></div><div class="card carousel-item"><div class="card-body"><h5 class="card-title">[rR]eg(ular )?[eE]xp(ression)?</h5><h4>&gt;-- Turn On</h4><h6>A powerful syntax used to match text</h6><ul class="list-group"><li class="list-group-item"><kbd>.</kbd> Matches any one character
							</li><li class="list-group-item"><kbd>\d</kbd> Matches any digit
							</li><li class="list-group-item"><kbd>\w</kbd> Matches any alphanumeric character. Equivalent to <code>[A-Za-z0-9_]</code></li><li class="list-group-item"><kbd>\</kbd> Matches characters literally or to escape special meanings like <code>\w</code>, <code>\d</code></li></ul><hr/><ul class="list-group"><li class="list-group-item"><kbd>[]</kbd> Character set, Matches any  enclosed characters. <kbd>-</kbd> is used as a range
							</li><li class="list-group-item"><kbd>[^]</kbd> Negated character set, will not match enclosed characters.
							</li><li class="list-group-item"><kbd>()</kbd> Group, groups characters together
							</li></ul><hr/><ul class="list-group"><li class="list-group-item"><kbd>|</kbd> Alteration, either or.
							</li><li class="list-group-item"><kbd>^</kbd> Matches start
							</li><li class="list-group-item"><kbd>$</kbd> Matches end
							</li></ul><hr/><ul class="list-group"><li class="list-group-item"><kbd>*</kbd> Matches 0 or more
							</li><li class="list-group-item"><kbd>+</kbd> Matches 1 or more
							</li><li class="list-group-item"><kbd>?</kbd> Matches 0 or 1
							</li></ul><div class="btn-group btn-group-sm" style="margin-top:5px;"><a class="btn btn-primary" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp" rel="external">moz://a</a><a class="btn btn-primary" href="https://www.w3schools.com/jsref/jsref_obj_regexp.asp" rel="external">w3schools</a></div></div></div><div class="card carousel-item"><div class="card-body"><h4 class="card-title">You Ad Here</h4><p class="card-text">
							For $2 a month you could host your ad on this site. Use <a class="help" data-toggle="tooltip" title="Bootstrap4 and jQuery available">HTML/CSS/JS/XML/XSL</a> or any image.
						</p><small>Your ad must comply to my standards. No adult content, no scams, no political junk, no misleading information, no malware, ect.</small></div></div><div class="card carousel-item"><div class="card-body"><h4 class="card-title">Add Your Species</h4><h6>To add your species is easy...</h6><p>Just fill out the <a class="help" data-toggle="tooltip" title="Do not use complex characters, Extended Latin is OK.">information below</a> and contact me on github</p><pre>
&lt;mod name="<kbd>Your mod name*</kbd>" author="<kbd>The authors!</kbd>"&gt;
  &lt;id steam="<kbd>Your steam ID!</kbd>" sb="<kbd class="help" data-toggle="tooltip" title="The text between the 2 last `/`">Your Starbound mod page path!</kbd>"/&gt;
  &lt;specie value="<kbd>Your Species Identifier*</kbd>" name="<kbd class="help" data-toggle="tooltip" title="Not required if the name does not differ (Word caption is automatic from species value if this excluded)">Species display name</kbd>"&gt;
    &lt;imgOn src="<kbd>Name of selected species image!</kbd>"/&gt;
    &lt;imgOff src="<kbd>Name of deselected species image!</kbd>"/&gt;
  &lt;/specie&gt;
  ...
&lt;/mod&gt;
...
</pre><button class="btn" id="modCopyBtn">Copy</button><textarea cols="50" id="modCopy" rows="10">
&lt;mod name="" author=""&gt;
	&lt;id steam="" sb=""/&gt;
	&lt;specie value="" name=""&gt;
		&lt;imgOn src=""/&gt;
		&lt;imgOff src=""/&gt;
	&lt;/specie&gt;
	&lt;!--OR--&gt;
	&lt;specie value="" name=""/&gt;
	&lt;!--...--&gt;
&lt;/mod&gt;
&lt;!--...--&gt;
</textarea><br/><small>
		* Required<br/>
		! Recommended
	</small><h3>Example</h3><pre data-toggle="tooltip" title="TIP: Use &lt;![CDATA[`text`]]&gt;">
&lt;mod name="The Kazdra Reloaded" author="Andr3w246, zekrom_vale"&gt;
  &lt;id steam="949156982" sb="kazdra.1234"/&gt;&lt;!--Do not include `/`--&gt;
  &lt;specie value="kazdra"&gt;
    &lt;imgOn src="tab_kazdra&amp;on;"/&gt;
    &lt;imgOff src="tab_kazdra.png"/&gt;
  &lt;/specie&gt;
  &lt;specie value="imgLessSpecies" name="Image Less Species"/&gt;
&lt;/mod&gt;
</pre></div></div></div><a class="carousel-control-prev invert" data-slide="prev" href="#side2"><span class="carousel-control-prev-icon"/></a><a class="carousel-control-next invert" data-slide="next" href="#side2"><span class="carousel-control-next-icon"/></a></div></aside></x:template></x:stylesheet>