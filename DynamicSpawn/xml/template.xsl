<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE template[
<!ENTITY nbsp "&#160;">
<!ENTITY times "&#10005;">
<!ENTITY p "img/">
]>
<x:stylesheet version="1.0"
xmlns:x="http://www.w3.org/1999/XSL/Transform">
	<x:template name="liConstruct">
		<ul class="list-group" id="speciesList" style="height:25vh;overflow:auto">
			<x:for-each select="document('species.xml')/species/mod|document('verify.xml')/species/mod">
				<x:sort select="@name"/>
				<x:for-each select="specie">
					<x:sort select="@name"/>
					<x:call-template name="liTemplate"/>
				</x:for-each>
			</x:for-each>
		</ul>
	</x:template>
	<x:template name="modList">
		<x:for-each select="document('species.xml')/species/mod|document('verify.xml')/species/mod">
			<x:if test="@name!='' and @name!='Z-UNDEFINED'">
				<li value="{@name}" class="list-group-item"><x:value-of select="@name"/></li>
			</x:if>
		</x:for-each>
		<li value="Z-UNDEFINED" class="list-group-item">UNDEFINED</li>
	</x:template>
	<x:template name="liTemplate">
		<li value="{@value}" id="{@value}" data-mod="{../@name}" data-author="{../@author}">
			<x:if test="../id/@steam">
				<x:attribute name="data-steamid">
					<x:text>https://steamcommunity.com/sharedfiles/filedetails/?id=</x:text>
					<x:value-of select="../id/@steam"/>
				</x:attribute>
			</x:if>
			<x:if test="../id/@sb">
				<x:attribute name="data-sbid">
					<x:text>http://community.playstarbound.com/resources/</x:text>
					<x:value-of select="../id/@sb"/>
				</x:attribute>
			</x:if>
			<x:attribute name="class">
				<x:text>list-group-item </x:text>
				<x:if test="../../@warning='true'">warning </x:if>
				<!--<x:if test="default">
					<x:for-each select="default/*">
						<x:text> active-npc</x:text>
						<x:value-of select="local-name()"/>
					</x:for-each>
				</x:if>-->
			</x:attribute>
			<button class="btn btn-dark species" onclick="modifyCont(this,event)">
				<x:attribute name="class">
					<x:text>btn btn-</x:text>
					<x:choose>
						<x:when test="../../@warning='true'">warning</x:when>
						<x:otherwise>dark</x:otherwise>
					</x:choose>
					<x:text> species</x:text>
				</x:attribute>
				<x:if test="../@name!='' and ../@name!='Z-UNDEFINED' and ../@name or ../@author!='' and ../@author">
					<x:attribute name="data-toggle">popover</x:attribute>
					<x:attribute name="data-placement">right</x:attribute>
					<x:attribute name="data-trigger">hover</x:attribute>
					<x:attribute name="title">
						<x:value-of select="../@name"/>
					</x:attribute>
					<x:attribute name="data-content">
						<x:text>By </x:text>
						<x:value-of select="../@author"/>
					</x:attribute>
				</x:if>
				<span class="capitalize">
					<x:choose>
						<x:when test="@name">
							<x:value-of select="@name"/>
						</x:when>
						<x:otherwise>
							<x:value-of select="@value"/>
						</x:otherwise>
					</x:choose>
				</span>
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
				<span class="hover">
					{<x:value-of select="@value"/>}
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
	</x:template>
	<x:template name="tabTab">
		<ul class="nav nav-tabs" role="tablist" id="npcTab">
			<x:for-each select="document('tab.xml')/tab/*">
				<li class="nav-item">
					<a class="nav-link" data-toggle="tab" data-hash="#npc{local-name()}">
						<x:value-of select="local-name()"/>
						<span class="badge badge-primary">&#x2713;</span>
					</a>
				</li>
			</x:for-each>
		</ul>
	</x:template>
	<x:template name="tabBody">
		<div class="tab-content" id="npcList">
			<x:for-each select="document('tab.xml')/tab/*">
				<div id="npc{local-name()}" class="container tab-pane">
					<h3><x:value-of select="title"/></h3>
					<h5><x:value-of select="sub"/></h5>
					<ul class="list-group"></ul>
				</div>
			</x:for-each>
		</div>
	</x:template>
</x:stylesheet>