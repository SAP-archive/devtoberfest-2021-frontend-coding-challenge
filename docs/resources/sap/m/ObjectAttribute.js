/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/library","sap/m/Text","sap/ui/events/KeyCodes","./ObjectAttributeRenderer","sap/base/Log"],function(t,e,i,n,o,r,s){"use strict";var a=i.TextDirection;var g=e.extend("sap.m.ObjectAttribute",{metadata:{library:"sap.m",designtime:"sap/m/designtime/ObjectAttribute.designtime",properties:{title:{type:"string",group:"Misc",defaultValue:null},text:{type:"string",group:"Misc",defaultValue:null},active:{type:"boolean",group:"Misc",defaultValue:null},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:a.Inherit}},aggregations:{customContent:{type:"sap.ui.core.Control",multiple:false},_textControl:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},events:{press:{parameters:{domRef:{type:"string"}}}},dnd:{draggable:true,droppable:false}}});g.prototype.init=function(){this.setAggregation("_textControl",new n)};g.prototype._getUpdatedTextControl=function(){var t=this.getAggregation("customContent")||this.getAggregation("_textControl"),e=this.getTitle(),i=this.getAggregation("customContent")?this.getAggregation("customContent").getText():this.getText(),n=this.getTextDirection(),o=this.getParent(),s=sap.ui.getCore().getConfiguration().getRTL(),g,p=true,u="";if(n===a.LTR&&s){u="‎"}if(n===a.RTL&&!s){u="‏"}i=u+i+u;if(e){i=e+": "+i}t.setProperty("text",i,true);if(o instanceof sap.m.ObjectListItem){p=false;g=r.MAX_LINES.SINGLE_LINE}this._setControlWrapping(t,p,g);return t};g.prototype._setControlWrapping=function(t,e,i){if(t.isA("sap.m.Link")){t.setProperty("wrapping",e,true)}if(t.isA("sap.m.Text")){t.setProperty("maxLines",i,true)}};g.prototype.ontap=function(t){if(this._isSimulatedLink()&&t.target.id===this.getId()+"-text"){this.firePress({domRef:this.getDomRef()})}};g.prototype.onsapenter=function(t){if(this._isSimulatedLink()){this.firePress({domRef:this.getDomRef()});t.setMarked()}};g.prototype.onsapspace=function(t){t.preventDefault()};g.prototype.onkeyup=function(t){if(t.which===o.SPACE){this.onsapenter(t)}};g.prototype._isEmpty=function(){if(this.getAggregation("customContent")&&!(this.getAggregation("customContent").isA("sap.m.Link")||this.getAggregation("customContent").isA("sap.m.Text"))){s.warning('Only sap.m.Link or sap.m.Text are allowed in "sap.m.ObjectAttribute.customContent" aggregation');return true}return!(this.getText().trim()||this.getTitle().trim())};g.prototype.ontouchstart=function(t){if(this._isSimulatedLink()){t.originalEvent._sapui_handledByControl=true}};g.prototype.getPopupAnchorDomRef=function(){return this.getDomRef("text")};g.prototype._isSimulatedLink=function(){return this.getActive()&&this.getText()!==""&&!this.getAggregation("customContent")};g.prototype.setCustomContent=function(t){if(t&&t.isA("sap.m.Link")){t._getTabindex=function(){return"-1"}}return this.setAggregation("customContent",t)};g.prototype._isClickable=function(){return this.getActive()&&this.getText()!==""||this.getAggregation("customContent")&&this.getAggregation("customContent").isA("sap.m.Link")};return g});