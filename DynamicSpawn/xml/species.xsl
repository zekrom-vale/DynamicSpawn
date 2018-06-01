<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE template[
<!ENTITY nbsp "&#160;">
<!ENTITY times "&#10005;">
<!ENTITY b "bootstrap">
<!ENTITY bt "btn btn-">
<!ENTITY p "../img/">
]>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:import href="template.xsl"/>
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
		<link rel="icon" type="image/svg+xml" href="&p;icon.svg"/>
		<link rel="icon" type="image/png" href="&p;icon.png"/>
		<link rel="stylesheet" href="../css/core.css"/>
		<!--Extension links-->
		<link rel="stylesheet" href="https://maxcdn.&b;cdn.com/&b;/4.1.0/css/&b;.min.css"/>
	</head>
	<body>
		<ul class="list-group" id="speciesList">
			<xsl:for-each select="species/mod">
				<xsl:sort select="@name"/>
				<xsl:for-each select="specie">
					<xsl:sort select="@name"/>
					<xsl:call-template name="liTemplate"/>
				</xsl:for-each>
			</xsl:for-each>
		</ul>
	</body>
</html>



	</xsl:template>
	<xsl:template name="liTemplate">
		<li value="{@value}" id="{@value}" data-mod="{../@name}">
			<xsl:attribute name="class">
				<xsl:text>list-group-item </xsl:text>
				<xsl:if test="default">
					<xsl:for-each select="default/*">
						<xsl:text> active-npc</xsl:text>
						<xsl:value-of select="local-name()"/>
					</xsl:for-each>
				</xsl:if>
			</xsl:attribute>
			<button class="btn btn-dark species" style="width:25%" onclick="modifyCont(this)">
				<xsl:choose>
					<xsl:when test="@name">
						<xsl:value-of select="@name"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="@value"/>
					</xsl:otherwise>
				</xsl:choose>
				<xsl:choose>
					<xsl:when test="imgOn and imgOff">
						<img class="off" src="&p;{imgOff/@src}"/>
						<img class="on" src="&p;{imgOn/@src}"/>
					</xsl:when>
					<xsl:otherwise>
						<img class="off" src="&p;tab_other.png"/>
						<img class="on" src="&p;tab_other_select.png"/>
					</xsl:otherwise>
				</xsl:choose>
			</button>
			<div class="btn-group species-group">
				<a class="btn btn-secondary">
					<xsl:if test="../id/@steam">
						<xsl:attribute name="href">
							<xsl:text>
								https://steamcommunity.com/sharedfiles/filedetails/?id=
							</xsl:text>
							<xsl:value-of select="../id/@steam"/>
						</xsl:attribute>
					</xsl:if>
					<xsl:value-of select="../@name"/>
				</a>
				<button class="btn btn-secondary">
					<xsl:value-of select="../@author"/>
				</button>
			</div>
		</li>
	</xsl:template>
</xsl:stylesheet>