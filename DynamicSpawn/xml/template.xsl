<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE template[
<!ENTITY nbsp "&#160;">
<!ENTITY times "&#10005;">
<!ENTITY p "img/">
]>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template name="liConstruct">
		<ul class="list-group" id="speciesList" style="height:25vh;overflow:auto">
			<xsl:for-each select="document('species.xml')/species/mod|document('verify.xml')/species/mod">
				<xsl:sort select="@name"/>
				<xsl:for-each select="specie">
					<xsl:sort select="@name"/>
					<xsl:call-template name="liTemplate"/>
				</xsl:for-each>
			</xsl:for-each>
		</ul>
	</xsl:template>
	<xsl:template name="liTemplate">
		<li value="{@value}" id="{@value}" data-mod="{../@name}" data-author="{../@author}">
			<xsl:if test="../id/@steam">
				<xsl:attribute name="data-steam-id">
					<xsl:text>https://steamcommunity.com/sharedfiles/filedetails/?id=</xsl:text>
					<xsl:value-of select="../id/@steam"/>
				</xsl:attribute>
			</xsl:if>
			<xsl:if test="../id/@sb">
				<xsl:attribute name="data-sb-id">
					<xsl:text>http://community.playstarbound.com/resources/</xsl:text>
					<xsl:value-of select="../id/@sb"/>
				</xsl:attribute>
			</xsl:if>
			<xsl:attribute name="class">
				<xsl:text>list-group-item </xsl:text>
				<xsl:if test="../../@warning='true'">warning </xsl:if>
				<!--<xsl:if test="default">
					<xsl:for-each select="default/*">
						<xsl:text> active-npc</xsl:text>
						<xsl:value-of select="local-name()"/>
					</xsl:for-each>
				</xsl:if>-->
			</xsl:attribute>
			<button class="btn btn-dark species" onclick="modifyCont(this)">
				<xsl:attribute name="class">
					<xsl:text>btn btn-</xsl:text>
					<xsl:choose>
						<xsl:when test="../../@warning='true'">warning</xsl:when>
						<xsl:otherwise>dark</xsl:otherwise>
					</xsl:choose>
					<xsl:text> species</xsl:text>
				</xsl:attribute>
				<xsl:if test="../@name!='' and ../@name!='Z-UNDEFINED' and ../@name or ../@author!='' and ../@author">
					<xsl:attribute name="data-toggle">popover</xsl:attribute>
					<xsl:attribute name="data-placement">right</xsl:attribute>
					<xsl:attribute name="data-trigger">hover</xsl:attribute>
					<xsl:attribute name="title">
						<xsl:value-of select="../@name"/>
					</xsl:attribute>
					<xsl:attribute name="data-content">
						<xsl:text>By </xsl:text>
						<xsl:value-of select="../@author"/>
					</xsl:attribute>
				</xsl:if>
				<span class="capitalize">
					<xsl:choose>
						<xsl:when test="@name">
							<xsl:value-of select="@name"/>
						</xsl:when>
						<xsl:otherwise>
							<xsl:value-of select="@value"/>
						</xsl:otherwise>
					</xsl:choose>
				</span>
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
				<span class="hover">
					{<xsl:value-of select="@value"/>}
				</span>
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