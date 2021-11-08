/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/IntervalTrigger","sap/ui/core/format/DateFormat","sap/ui/core/date/UniversalDate","sap/m/Text"],function(t,e,a,i,s){"use strict";var r=6e4;var p=t.extend("sap.f.cards.BaseHeader",{metadata:{library:"sap.f",abstract:true,properties:{dataTimestamp:{type:"string",defaultValue:""},dataTimestampUpdating:{type:"boolean",defaultValue:false,visibility:"hidden"}},aggregations:{_dataTimestamp:{type:"sap.m.Text",multiple:false,visibility:"hidden"},toolbar:{type:"sap.ui.core.Control",multiple:false},_error:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}}}});p.prototype.exit=function(){this._removeTimestampListener()};p.prototype.onBeforeRendering=function(){var t=this.getToolbar();if(t){t.addStyleClass("sapFCardHeaderToolbar")}};p.prototype.setDataTimestamp=function(t){var e=this.getDataTimestamp();if(e&&!t){this.destroyAggregation("_dataTimestamp");this._removeTimestampListener()}this.setProperty("dataTimestamp",t);if(t){this._updateDataTimestamp();this._addTimestampListener()}return this};p.prototype.setDataTimestampUpdating=function(t){var e=this._createDataTimestamp();this.setProperty("dataTimestampUpdating",t);if(t){e.setText("updating...");e.addStyleClass("sapFCardDataTimestampUpdating");this._removeTimestampListener()}else{e.removeStyleClass("sapFCardDataTimestampUpdating")}return this};p.prototype._createDataTimestamp=function(){var t=this.getAggregation("_dataTimestamp");if(!t){t=new s({wrapping:false,textAlign:"End"});t.addStyleClass("sapFCardDataTimestamp");this.setAggregation("_dataTimestamp",t)}return t};p.prototype._updateDataTimestamp=function(){var t=this._createDataTimestamp(),e=this.getDataTimestamp(),s,r,p;if(!e){t.setText("");return}s=a.getDateTimeInstance({relative:true});r=new i(e);p=s.format(r);if(r.getTime()+59e3>(new Date).getTime()){p="now"}t.setText(p);t.removeStyleClass("sapFCardDataTimestampUpdating")};p.prototype._addTimestampListener=function(){p.getTimestampIntervalTrigger().addListener(this._updateDataTimestamp,this);this._bHasTimestampListener=true};p.prototype._removeTimestampListener=function(){if(!this._bHasTimestampListener){return}p.getTimestampIntervalTrigger().removeListener(this._updateDataTimestamp,this);this._bHasTimestampListener=false};p.getTimestampIntervalTrigger=function(){if(!p._oTimestampIntervalTrigger){p._oTimestampIntervalTrigger=new e(r)}return p._oTimestampIntervalTrigger};p.prototype.getAriaRole=function(){return this.hasListeners("press")?"button":"heading"};p.prototype.getAriaHeadingLevel=function(){return this.hasListeners("press")?undefined:"3"};p.prototype.getAriaRoleDescription=function(){return this.hasListeners("press")?this._oRb.getText("ARIA_ROLEDESCRIPTION_INTERACTIVE_CARD_HEADER"):this._oRb.getText("ARIA_ROLEDESCRIPTION_CARD_HEADER")};return p});