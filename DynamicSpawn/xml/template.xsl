<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE template[
<!ENTITY nbsp "&#160;">
<!ENTITY times "&#10005;">
<!ENTITY p "img/">
]>
<x:stylesheet version="1.0"
xmlns:x="http://www.w3.org/1999/XSL/Transform">
	<x:template name="liConstruct">
		<ul class="list-group speci" id="speciesList" roll="form" aria-multiselectable="true" aria-sort="descending" aria-controls="mods" aria-keyshortcuts="ArrowUp ArrowDown ArrowRight ArrowLeft">
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
			<x:sort select="@name"/>
			<x:if test="@name!='' and @name!='Z-UNDEFINED'">
				<li value="{@name}" class="list-group-item" data-count="{count(specie)}" roll="button" tabIndex="-1">
					<x:if test="@author!='' and @author">
						<x:attribute name="data-toggle">popover</x:attribute>
						<x:attribute name="data-placement">right</x:attribute>
						<x:attribute name="data-trigger">hover</x:attribute>
						<x:attribute name="data-boundary">viewport</x:attribute>
						<x:attribute name="data-fallbackPlacement">['top','bottom']</x:attribute>
						<x:attribute name="title">Created by</x:attribute>
						<x:attribute name="data-content">
							<x:value-of select="@author"/>
							Steam ID: <x:value-of select="id/@steam"/>
							Species: <x:for-each select="specie">
								<x:choose>
									<x:when test="@name">
										<x:value-of select="@name"/>
									</x:when>
									<x:otherwise>
										<x:call-template name="cap">
											<x:with-param name="text" select="translate(@value,'_',' ')"/>
											<x:with-param name="capl" select="'true'"/>
										</x:call-template>
									</x:otherwise>
								</x:choose>
								<x:if test="position()!=count(../specie)">, </x:if>
							</x:for-each>
						</x:attribute>
					</x:if>
					<x:value-of select="@name"/>
					<x:if test="count(specie)&gt;1">
						 (<x:value-of select="count(specie)"/>)
					</x:if>
				</li>
			</x:if>
		</x:for-each>
		<li value="Z-UNDEFINED" class="list-group-item" tabIndex="-1">UNDEFINED</li>
	</x:template>
	<x:template name="liTemplate">
		<li value="{@value}" id="{@value}" data-mod="{../@name}" data-author="{../@author}">
			<x:if test="../id/@steam">
				<x:attribute name="data-steamid">
					<x:value-of select="../id/@steam"/>
				</x:attribute>
			</x:if>
			<x:if test="../id/@sb">
				<x:attribute name="data-sbid">
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
			<button class="btn btn-dark species" data-key="0" tabindex="-1">
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
					<x:attribute name="data-boundary">viewport</x:attribute>
					<x:attribute name="data-fallbackPlacement">["top","bottom"]</x:attribute>
					<x:attribute name="title">
						<x:value-of select="../@name"/>
					</x:attribute>
					<x:attribute name="data-content">
						<x:text>By </x:text>
						<x:value-of select="../@author"/>
					</x:attribute>
				</x:if>
				<span data-case="cap">
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
					 (<x:value-of select="@value"/>)
				</span>
			</button>
			<div class="btn-group species-group" aria-live="off">
				<button class="btn btn-secondary addToAll" data-key="1" tabindex="-1">
					Add to All
				</button>
				<button class="btn btn-secondary removeFromAll" data-key="2" tabindex="-1">
					Remove from All
				</button>
			</div>
		</li>
	</x:template>
	<x:template name="tabTab">
		<ul class="nav nav-tabs" role="tablist" id="npcTab">
			<x:for-each select="document('tab.xml')/tab/*">
				<li class="nav-item" id="tab{local-name()}" role="tab" aria-keyshortcuts="{position()}">
					<a class="nav-link" data-toggle="tab" data-hash="#npc{local-name()}" tabindex="0">
						<x:value-of select="local-name()"/>
						<span class="badge badge-primary">&#x2713;</span>
					</a>
				</li>
			</x:for-each>
		</ul>
	</x:template>
	<x:template name="tabBody">
		<div class="tab-content" id="npcList" aria-busy="true">
			<x:for-each select="document('tab.xml')/tab/*">
				<div id="npc{local-name()}" role="tabpanel" aria-labelledby="tab{local-name()}" class="container tab-pane" aria-live="polite" aria-hidden="true">
					<h3 id="npc{local-name()}h3"><x:value-of select="title"/></h3>
					<h5><x:value-of select="sub"/></h5>
					<ul class="list-group speci" roll="form" aria-required="true" aria-sort="descending" aria-sortby="mod" aria-controls="speciesList speciesInput menubar" aria-keyshortcuts="Shift+ArrowUp Shift+ArrowDown Shift+ArrowRight Shift+ArrowLeft" aria-atomic="false" aria-relevant="additions removals" aria-labelledby="npc{local-name()}h3"></ul>
				</div>
			</x:for-each>
		</div>
	</x:template>
	<x:template name="dataList">
		<datalist id="speciesDataList" aria-sort="descending">
			<x:for-each select="document('species.xml')/species/mod/specie|document('verify.xml')/species/mod/specie">
				<x:sort select="@value"/>
				<x:choose>
					<x:when test="@name">
						<option>
							<x:value-of select="@name"/>
						</option>
					</x:when>
					<x:otherwise>
						<option>
							<x:call-template name="cap">
								<x:with-param name="text" select="@value"/>
								<x:with-param name="capl" select="'true'"/>
							</x:call-template>
						</option>
					</x:otherwise>
				</x:choose>
			</x:for-each>
		</datalist>
	</x:template>
	<x:template name="cap">
		<x:param name="text"/>
		<x:param name="capl"/>
		<x:param name="sub" select="substring($text,1,1)"/>
		<x:if test="string-length($text)&gt;0">
			<x:choose>
				<x:when test="$sub=' '">
					<x:value-of select="$sub"/>
					<x:call-template name="cap">
						<x:with-param name="text" select="substring($text,2)"/>
						<x:with-param name="capl" select="'true'"/>
					</x:call-template>
				</x:when>
				<x:otherwise>
					<x:choose>
						<x:when test="$capl='true'">
							<x:value-of select="translate($sub,'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')"/>
						</x:when>
						<x:otherwise>
							<x:value-of select="$sub"/>
						</x:otherwise>
					</x:choose>
					<x:call-template name="cap">
						<x:with-param name="text" select="substring($text,2)"/>
						<x:with-param name="capl" select="'false'"/>
					</x:call-template>
				</x:otherwise>
			</x:choose>
		</x:if>
	</x:template>
</x:stylesheet>