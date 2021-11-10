/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Label","./library","sap/ui/Device","sap/ui/core/Control","sap/ui/core/EnabledPropagator","sap/ui/core/library","./CheckBoxRenderer","sap/ui/thirdparty/jquery","sap/ui/events/KeyCodes","sap/ui/core/LabelEnablement","sap/ui/core/message/MessageMixin"],function(e,t,a,i,r,o,n,s,l,p,u){"use strict";var d=o.ValueState;var c=o.TextAlign;var g=o.TextDirection;var h=i.extend("sap.m.CheckBox",{metadata:{interfaces:["sap.ui.core.IFormContent","sap.ui.core.ISemanticFormContent"],library:"sap.m",properties:{selected:{type:"boolean",group:"Data",defaultValue:false},partiallySelected:{type:"boolean",group:"Data",defaultValue:false},enabled:{type:"boolean",group:"Behavior",defaultValue:true},name:{type:"string",group:"Misc",defaultValue:null},text:{type:"string",group:"Appearance",defaultValue:null},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:g.Inherit},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:c.Begin},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:""},useEntireWidth:{type:"boolean",group:"Appearance",defaultValue:false},activeHandling:{type:"boolean",group:"Misc",defaultValue:true},editable:{type:"boolean",group:"Behavior",defaultValue:true},valueState:{type:"sap.ui.core.ValueState",group:"Data",defaultValue:d.None},valueStateText:{type:"string",group:"Misc",defaultValue:null,visibility:"hidden"},displayOnly:{type:"boolean",group:"Behavior",defaultValue:false},wrapping:{type:"boolean",group:"Appearance",defaultValue:false}},aggregations:{_label:{type:"sap.m.Label",group:"Behavior",multiple:false,visibility:"hidden"}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{select:{parameters:{selected:{type:"boolean"}}}},dnd:{draggable:true,droppable:false},designtime:"sap/m/designtime/CheckBox.designtime"}});r.call(h.prototype);u.call(h.prototype);h.prototype.init=function(){this.addActiveState(this);this._handleReferencingLabels()};h.prototype.exit=function(){this._oLabel=null;delete this._iTabIndex};h.prototype.setText=function(e){var t=this._getLabel();this.setProperty("text",e);t.setText(e);return this};h.prototype.setWidth=function(e){this.setProperty("width",e,true);this._setWidth();return this};h.prototype.setUseEntireWidth=function(e){this.setProperty("useEntireWidth",e,true);this._setWidth();return this};h.prototype.setTextDirection=function(e){var t=this._getLabel();this.setProperty("textDirection",e);t.setTextDirection(e);return this};h.prototype.setTextAlign=function(e){var t=this._getLabel();this.setProperty("textAlign",e);t.setTextAlign(e);return this};h.prototype.setValueStateText=function(e){return this.setProperty("valueStateText",e)};h.prototype.setWrapping=function(e){var t=this._getLabel();this.setProperty("wrapping",e);t.setWrapping(e);return this};h.prototype.addActiveState=function(e){if(a.os.blackberry){e.addDelegate({ontouchstart:function(t){s(e.getDomRef()).addClass("sapMActive")},ontouchend:function(t){s(e.getDomRef()).removeClass("sapMActive")}})}};h.prototype.getFormattedState=function(){var e=sap.ui.getCore().getLibraryResourceBundle("sap.m");return this.getSelected()?e.getText("ACC_CTR_STATE_CHECKED"):e.getText("ACC_CTR_STATE_NOT_CHECKED")};h.prototype.getFormFormattedValue=function(){return this.getFormattedState()};h.prototype.getFormValueProperty=function(){return"selected"};h.prototype.ontouchstart=function(e){e.originalEvent._sapui_handledByControl=true};h.prototype.ontap=function(e){var t;if(this.getEnabled()&&this.getEditable()&&!this.getDisplayOnly()){this.$().trigger("focus");t=this._getSelectedState();this.setSelected(t);this.setPartiallySelected(false);this.fireSelect({selected:t});e&&e.setMarked()}};h.prototype.onkeyup=function(e){if(e&&e.which===l.SPACE&&!e.shiftKey){this.ontap(e);e.preventDefault()}};h.prototype.onsapspace=function(e){e.preventDefault()};h.prototype.onsapenter=function(e){this.ontap(e)};h.prototype.setTabIndex=function(e){this._iTabIndex=e;this.$("CbBg").attr("tabindex",e);return this};h.prototype.getTabIndex=function(){if(this.hasOwnProperty("_iTabIndex")){return this._iTabIndex}return this.getEnabled()&&!this.getDisplayOnly()?0:-1};h.prototype._getLabel=function(){if(!this._oLabel){this._oLabel=new e(this.getId()+"-label",{labelFor:this.getId()}).addStyleClass("sapMCbLabel");this.setAggregation("_label",this._oLabel,true)}return this.getAggregation("_label")};h.prototype._setWidth=function(){var e=this._getLabel(),t=this.$(),a=this.getWidth();if(this.getUseEntireWidth()){e.setWidth("");t.outerWidth(a)}else{t.outerWidth("");e.setWidth(a)}};h.prototype._getSelectedState=function(){var e=this.getSelected(),t=this.getPartiallySelected();return e===t||!e&&t};h.prototype._getAriaChecked=function(){var e=this.getSelected();if(this.getPartiallySelected()&&e){return"mixed"}return e};h.prototype._fnLabelTapHandler=function(){this.$().trigger("focus")};h.prototype._handleReferencingLabels=function(){var e=p.getReferencingLabels(this),t=this;if(e.length>0){e.forEach(function(e){sap.ui.getCore().byId(e).addEventDelegate({ontap:function(){t._fnLabelTapHandler()}})})}};h.prototype.getAccessibilityInfo=function(){var e=sap.ui.getCore().getLibraryResourceBundle("sap.m"),t=this.getText();return{role:"checkbox",type:e.getText("ACC_CTR_TYPE_CHECKBOX"),description:(t?t+" ":"")+this.getFormattedState(),focusable:this.getEnabled()&&!this.getDisplayOnly(),enabled:this.getEnabled(),editable:this.getEditable()}};h.prototype.getFormDoNotAdjustWidth=function(){return this.getText()?false:true};return h});