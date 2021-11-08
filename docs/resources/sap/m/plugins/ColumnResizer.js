/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./PluginBase","sap/ui/core/Core","sap/ui/core/InvisibleText","sap/ui/Device","sap/m/ColumnPopoverActionItem","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/control","sap/ui/dom/jquery/Aria"],function(e,t,i,n,o,s){"use strict";var a=e.extend("sap.m.plugins.ColumnResizer",{metadata:{library:"sap.m",properties:{},events:{columnResize:{allowPreventDefault:true,parameters:{column:{type:"sap.ui.core.Element"},width:{type:"sap.ui.core.CSSSize"}}}}}});var r={};var l=false;var u="sapMPluginsColumnResizer";var h=t.getConfiguration().getRTL();var d=h?"right":"left";var c=h?"left":"right";var f=h?-1:1;a.getPlugin=e.getPlugin;a.prototype.init=function(){this._iHoveredColumnIndex=-1;this._aPositions=[];this._oHandle=null};a.prototype.onActivate=function(e){e.addEventDelegate(this,this);if(e.isActive()){this.onAfterRendering()}};a.prototype.onDeactivate=function(e){e.removeEventDelegate(this,this);this.onBeforeRendering();this._oHandle=null};a.prototype.onBeforeRendering=function(){if(this._$Container){this._$Container.removeClass(u+"Container").off("."+u);this._$Container.find(this.getConfig("resizable")).removeClass(u+"Resizable");this._updateAriaDescribedBy("remove")}};a.prototype.onAfterRendering=function(){this._$Container=this.getControl().$(this.getConfig("container"));n.system.desktop&&this._$Container.on("mousemove."+u,this._onmousemove.bind(this));this._$Container.addClass(u+"Container").on("mouseleave."+u,this._onmouseleave.bind(this));this._aResizables=this._$Container.find(this.getConfig("resizable")).addClass(u+"Resizable").get();this._updateAriaDescribedBy("add");this._invalidatePositions()};a.prototype._updateAriaDescribedBy=function(e){this._aResizables.forEach(function(t){var n=s(t).control(0,true);var o=n&&n.getFocusDomRef();s(o)[e+"AriaDescribedBy"](i.getStaticId("sap.m","COLUMNRESIZER_RESIZABLE"))})};a.prototype.ontouchstart=function(e){if(this.getConfig("allowTouchResizing")&&s(e.target).closest(this._aResizables)[0]){this._onmousemove(e)}else if(this._iHoveredColumnIndex==-1&&this._oHandle&&this._oHandle.style[d]){this._onmousemove(e);if(this._iHoveredColumnIndex==-1){this._oHandle.style[d]="";this._oAlternateHandle.style[d]=""}}l=this._iHoveredColumnIndex>-1;if(!l){return}this._startResizeSession(this._iHoveredColumnIndex);r.iTouchStartX=e.targetTouches[0].clientX;r.fHandleX=parseFloat(this._oHandle.style[d]);this._$Container.addClass(u+"Resizing");s(document).on("touchend."+u+" mouseup."+u,this._ontouchend.bind(this))};a.prototype.ontouchmove=function(e){if(!l){return}this._setSessionDistanceX(e.targetTouches[0].clientX-r.iTouchStartX);this._oHandle.style[d]=r.fHandleX+r.iDistanceX+"px"};a.prototype._onmousemove=function(e){if(l){return}this._setPositions();var t=e.targetTouches?e.targetTouches[0].clientX:e.clientX;var i=this._getHoveredColumnIndex(t);this._displayHandle(i)};a.prototype._onmouseleave=function(){this._invalidatePositions()};a.prototype._ontouchend=function(){this._setColumnWidth();this._cancelResizing(true)};a.prototype.onsapescape=function(){if(l){this._cancelResizing()}};a.prototype.onsaprightmodifiers=function(e){this._onLeftRightModifiersKeyDown(e,16)};a.prototype.onsapleftmodifiers=function(e){this._onLeftRightModifiersKeyDown(e,-16)};a.prototype.ondblclick=function(e){var t=e.clientX,i=this._getHoveredColumnIndex(t);if(i==-1){return}this._startResizeSession(i);this._setSessionDistanceX(this._calculateAutoColumnDistanceX());this._setColumnWidth();this._endResizeSession()};a.prototype._getHoveredColumnIndex=function(e){return this._aPositions.findIndex(function(t){return Math.abs(t-e)<=(this._oAlternateHandle||window.matchMedia("(hover:none)").matches?20:3)},this)};a.prototype._calculateAutoColumnDistanceX=function(){var e=this.getConfig("columnRelatedCells",this._$Container,r.oCurrentColumn.getId());if(!e||!e.length){return}var t=s("<div></div>").addClass(u+"SizeDetector").addClass(this.getConfig("cellPaddingStyleClass"));var i=e.children().clone().removeAttr("id");this._$Container.append(t);var n=Math.round(t.append(i)[0].getBoundingClientRect().width);var o=n-r.fCurrentColumnWidth;t.remove();return o};a.prototype._invalidatePositions=function(){window.setTimeout(function(){this._bPositionsInvalid=true}.bind(this))};a.prototype._displayHandle=function(e,t){if(this._iHoveredColumnIndex==e){return}if(!this._oHandle){this._oHandle=document.createElement("div");this._oHandle.className=u+"Handle";if(t||window.matchMedia("(hover:none)").matches){var i=document.createElement("div");i.className=u+"HandleCircle";i.style.top=this._aResizables[e].offsetHeight-8+"px";this._oHandle.appendChild(i);this._oAlternateHandle=this._oHandle.cloneNode(true)}}if(this._$Container[0]!==this._oHandle.parentNode){this._$Container.append(this._oHandle);if(t){this._$Container.append(this._oAlternateHandle)}}this._oHandle.style[d]=e>-1?(this._aPositions[e]-this._fContainerX)*f+"px":"";if(t){this._oAlternateHandle.style[d]=--e>-1?(this._aPositions[e]-this._fContainerX)*f+"px":""}else{if(this._oAlternateHandle){this._oAlternateHandle.style[d]=""}this._iHoveredColumnIndex=e}};a.prototype._cancelResizing=function(e){this._$Container.removeClass(u+"Resizing");if(r.iDistanceX||!e){this._oHandle.style[d]=""}else{setTimeout(function(){this._oHandle.style[d]=""}.bind(this),300)}this._iHoveredColumnIndex=-1;s(document).off("."+u);this._endResizeSession();l=false};a.prototype._getColumnMinWidth=function(e){return e?48:0};a.prototype._startResizeSession=function(e){r.$CurrentColumn=s(this._aResizables[e]);r.oCurrentColumn=r.$CurrentColumn.control(0,true);r.fCurrentColumnWidth=r.$CurrentColumn.width();r.iMaxDecrease=this._getColumnMinWidth(r.oCurrentColumn)-r.fCurrentColumnWidth;r.iEmptySpace=this.getConfig("emptySpace",this.getControl());if(r.iEmptySpace!=-1){r.$NextColumn=s(this._aResizables[e+1]);r.oNextColumn=r.$NextColumn.control(0,true);r.fNextColumnWidth=r.$NextColumn.width()||0;r.iMaxIncrease=r.iEmptySpace+r.fNextColumnWidth-this._getColumnMinWidth(r.oNextColumn)}else{r.iMaxIncrease=window.innerWidth}};a.prototype._setSessionDistanceX=function(e){r.iDistanceX=(e>0?Math.min(e,r.iMaxIncrease):Math.max(e,r.iMaxDecrease))*f};a.prototype._setColumnWidth=function(){if(!r.iDistanceX){return}var e=r.fCurrentColumnWidth+r.iDistanceX+"px";if(!this._fireColumnResize(r.oCurrentColumn,e)){return}r.oCurrentColumn.setWidth(e);if(r.oNextColumn&&(r.iEmptySpace<3||r.iDistanceX>r.iEmptySpace)){e=r.fNextColumnWidth-r.iDistanceX+r.iEmptySpace+"px";if(this._fireColumnResize(r.oNextColumn,e)){r.oNextColumn.setWidth(e)}}this.getConfig("fixAutoWidthColumns")&&this._aResizables.forEach(function(e){var t=s(e),i=t.control(0,true),n=i.getWidth();if(n&&n.toLowerCase()!="auto"){return}n=t.css("width");if(n&&this._fireColumnResize(i,n)){i.setWidth(n)}},this)};a.prototype._fireColumnResize=function(e,t){return this.fireColumnResize({column:e,width:t})};a.prototype._onLeftRightModifiersKeyDown=function(e,t){if(!e.shiftKey||e.ctrlKey||e.metaKey||e.altKey||a.detectTextSelection(e.target)){return}var i=s(e.target).closest(this._aResizables)[0],n=this._aResizables.indexOf(i);if(n===-1){return}this._startResizeSession(n);this._setSessionDistanceX(t);this._setColumnWidth();this._endResizeSession()};a.detectTextSelection=function(e){var t=window.getSelection(),i=t.toString().replace("/n","");return i&&s.contains(e,t.focusNode)};a.prototype._endResizeSession=function(){r={}};a.prototype._setPositions=function(){if(!this._bPositionsInvalid){return this._aPositions}this._bPositionsInvalid=false;this._fContainerX=this._$Container[0].getBoundingClientRect()[d];this._aPositions=this._aResizables.map(function(e,t,i){return e.getBoundingClientRect()[c]-(++t==i.length?1.25*f:0)},this)};a.prototype.startResizing=function(e){var t=this._aResizables.indexOf(e);this._setPositions();this._displayHandle(t,true)};a.prototype.getColumnResizeButton=function(e){if(!e||!window.matchMedia("(hover:none)").matches){return}return new o({text:t.getLibraryResourceBundle("sap.m").getText("COLUMNRESIZER_RESIZE_BUTTON"),icon:"sap-icon://resize-horizontal",press:this.startResizing.bind(this,e.getDomRef())})};e.setConfigs({"sap.m.Table":{container:"listUl",resizable:".sapMListTblHeaderCell:not([aria-hidden=true])",focusable:".sapMColumnHeaderFocusable",cellPaddingStyleClass:"sapMListTblCell",fixAutoWidthColumns:true,onActivate:function(e){this._vOrigFixedLayout=e.getFixedLayout();if(!e.bActiveHeaders){e.bFocusableHeaders=true;this.allowTouchResizing=window.matchMedia("(hover:none)").matches}e.setFixedLayout("Strict")},onDeactivate:function(e){e.bFocusableHeaders=false;e.setFixedLayout(this._vOrigFixedLayout);if(this._vOrigFixedLayout=="Strict"){e.rerender()}delete this._vOrigFixedLayout;delete this.allowTouchResizing},emptySpace:function(e){var t=e.getDomRef("tblHeadDummyCell");return t?t.clientWidth:0},columnRelatedCells:function(e,t){return e.find(".sapMListTblCell[data-sap-ui-column='"+t+"']")}}},a);return a});