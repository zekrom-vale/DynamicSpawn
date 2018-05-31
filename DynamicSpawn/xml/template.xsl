<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE template[
<!ENTITY nbsp "&#160;">
<!ENTITY times "&#10005;">
]>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template name="liConstruct">
		<ul class="list-group" id="speciesList" style="height:25vh;overflow:auto">
			<xsl:for-each select="document('species.xml')/species/mod">
				<xsl:sort select="@name"/>
				<xsl:for-each select="specie">
					<xsl:sort select="@name"/>
					<xsl:call-template name="liTemplate"/>
				</xsl:for-each>
			</xsl:for-each>
		</ul>
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
			<button class="btn btn-dark species" onclick="modifyCont(this)">
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
	</xsl:template>
	<xsl:template name="tabTab">
		<ul class="nav nav-tabs" role="tablist" id="npcTab">
			<xsl:for-each select="document('tab.xml')/tab/*">
				<li class="nav-item">
					<a class="nav-link" data-toggle="tab" data-hash="#npc{local-name()}">
						<xsl:value-of select="local-name()"/>
						<span class="badge badge-primary">&#x2713;</span>
					</a>
				</li>
			</xsl:for-each>
		</ul>
	</xsl:template>
	<xsl:template name="tabBody">
		<div class="tab-content" id="npcList">
			<xsl:for-each select="document('tab.xml')/tab/*">
				<div id="npc{local-name()}" class="container tab-pane">
					<h3><xsl:value-of select="title"/></h3>
					<h5><xsl:value-of select="sub"/></h5>
					<ul class="list-group"></ul>
				</div>
			</xsl:for-each>
		</div>
	</xsl:template>
</xsl:stylesheet>