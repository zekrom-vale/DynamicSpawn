<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html [
<!ENTITY nbsp "&#160;">
<!ENTITY m "Matches">
<!ENTITY c "character">
<!ENTITY cc "carousel-control-">
]>
<x:stylesheet version="1.0"
xmlns:x="http://www.w3.org/1999/XSL/Transform">
<x:template name="aside">
	<aside as="span" class="col-xl-2" style="width:100%" data-pause="hover" id="side" roll="span">
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
							Devoted self taught programmer of numerous <a data-toggle="tooltip" title="TI-basic, HTML, CSS, XML, JavaScript, JSON, SVG, BB, MD, Lua, Bootstrap4, jQuery*, C#*, XPath, XSL, DTD, XSD*" class="help">languages / markup</a> and programs.
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
								<kbd>.</kbd> &m; any one &c;
							</li>
							<li class="list-group-item">
								<kbd>\d</kbd> &m; any digit
							</li>
							<li class="list-group-item">
								<kbd>\w</kbd> &m; any alphanumeric &c;. Equivalent to <code>[A-Za-z0-9_]</code>
							</li>
							<li class="list-group-item">
								<kbd>\</kbd> &m; &c;s literally or to escape special meanings like <code>\w</code>, <code>\d</code>
							</li>
						</ul>
						<hr/>
						<ul class="list-group">
							<li class="list-group-item">
								<kbd>[]</kbd> Character set, &m; any  enclosed &c;s. <kbd>-</kbd> is used as a range
							</li>
							<li class="list-group-item">
								<kbd>[^]</kbd> Negated &c; set, will not match enclosed &c;s.
							</li>
							<li class="list-group-item">
								<kbd>()</kbd> Group, groups &c;s together
							</li>
						</ul>
						<hr/>
						<ul class="list-group">
							<li class="list-group-item">
								<kbd>|</kbd> Alteration, either or.
							</li>
							<li class="list-group-item">
								<kbd>^</kbd> &m; start
							</li>
							<li class="list-group-item">
								<kbd>$</kbd> &m; end
							</li>
						</ul>
						<hr/>
						<ul class="list-group">
							<li class="list-group-item">
								<kbd>*</kbd> &m; 0 or more
							</li>
							<li class="list-group-item">
								<kbd>+</kbd> &m; 1 or more
							</li>
							<li class="list-group-item">
								<kbd>?</kbd> &m; 0 or 1
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
							For $2 a month you could host your ad on this site. Use <a data-toggle="tooltip" title="Bootstrap4 and jQuery available" class="help">HTML/CSS/JS/XML/XSL</a> or any image.
						</p>
						<small>Your ad must comply to my standards. No adult content, no scams, no political junk, no misleading information, no malware, ect.</small>
						<!--<a rel="external" href="" class="btn btn-primary">Contact NOW!</a>-->
					</div>
				</div>
			</div>
			<a class="&cc;prev invert" href="#side2" data-slide="prev"><span class="&cc;prev-icon"></span></a>
			<a class="&cc;next invert" href="#side2" data-slide="next"><span class="&cc;next-icon"></span></a>
		</div>
	</aside>
</x:template>
</x:stylesheet>