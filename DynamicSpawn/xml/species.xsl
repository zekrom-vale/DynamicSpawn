<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE template[
<!ENTITY nbsp "&#160;">
<!ENTITY times "&#10005;">
<!ENTITY b "bootstrap">
<!ENTITY bt "btn btn-">
<!ENTITY p "../img/">
]>
<x:stylesheet version="1.0"
xmlns:x="http://www.w3.org/1999/XSL/Transform">
	<x:import href="template.xsl"/>
	<x:template match="/">
<html xmlns:html="http://www.w3.org/1999/xhtml" lang="en-US" xml:lang="en-US" data-author="zekrom-vale" data-game="Starbound" data-require="Bootstrap4,jQuery,popper,XML,XSL,XPath">
	<head id="top">
		<meta charset="UTF-8"/>
		<title>Dynamic Spawn Creator</title>
		<x:for-each select="root/meta/*">
			<meta name="{local-name()}" content="{text()}"/>
			<x:if test="@*">
				<x:for-each select="@*">
					<meta name="{name(.)}" content="{.}"/>
				</x:for-each>
			</x:if>
		</x:for-each>
		<!--links-->
		<link rel="icon" type="image/svg+xml" href="&p;icon.svg"/>
		<link rel="icon" type="image/png" href="&p;icon.png"/>
		<link rel="stylesheet" href="../css/core.css"/>
		<!--Extension links-->
		<link rel="stylesheet" href="https://maxcdn.&b;cdn.com/&b;/4.1.0/css/&b;.min.css"/>
	</head>
	<body>
		<ul class="list-group" id="speciesList">
			<x:for-each select="species/mod">
				<x:sort select="@name"/>
				<x:for-each select="specie">
					<x:sort select="@name"/>
					<x:call-template name="liTemplate"/>
				</x:for-each>
			</x:for-each>
		</ul>
	</body>
</html>



	</x:template>
	<x:template name="liTemplate">
		<li value="{@value}" id="{@value}" data-mod="{../@name}">
			<x:attribute name="class">
				<x:text>list-group-item </x:text>
				<x:if test="default">
					<x:for-each select="default/*">
						<x:text> active-npc</x:text>
						<x:value-of select="local-name()"/>
					</x:for-each>
				</x:if>
			</x:attribute>
			<button class="btn btn-dark species" style="width:25%" onclick="modifyCont(this)">
				<x:choose>
					<x:when test="@name">
						<x:value-of select="@name"/>
					</x:when>
					<x:otherwise>
						<x:value-of select="@value"/>
					</x:otherwise>
				</x:choose>
				<x:choose>
					<x:when test="imgOn and imgOff">
						<img class="off" src="&p;{imgOff/@src}"/>
						<img class="on" src="&p;{imgOn/@src}"/>
					</x:when>
					<x:otherwise>
						<img class="off" src="&p;tab_other.png"/>
						<img class="on" src="&p;tab_other_select.png"/>
					</x:otherwise>
				</x:choose>
			</button>
			<div class="btn-group species-group">
				<a class="btn btn-secondary">
					<x:if test="../id/@steam">
						<x:attribute name="href">
							<x:text>
								https://steamcommunity.com/sharedfiles/filedetails/?id=
							</x:text>
							<x:value-of select="../id/@steam"/>
						</x:attribute>
					</x:if>
					<x:value-of select="../@name"/>
				</a>
				<button class="btn btn-secondary">
					<x:value-of select="../@author"/>
				</button>
			</div>
		</li>
	</x:template>
</x:stylesheet>