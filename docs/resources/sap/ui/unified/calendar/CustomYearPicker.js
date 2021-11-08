/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","sap/ui/unified/Calendar","sap/ui/unified/CalendarRenderer","sap/ui/unified/calendar/CalendarDate","sap/ui/unified/calendar/Header","sap/ui/unified/DateRange"],function(e,t,i,r,a,n){"use strict";var s=e.extend(i);s.apiVersion=2;var o=t.extend("sap.ui.unified.internal.CustomYearPicker",{metadata:{library:"sap.ui.unified"},renderer:s});o.prototype.init=function(){t.prototype.init.apply(this,arguments);this.setProperty("_currentPicker","yearPicker");this._bNamesLengthChecked=true};o.prototype.onBeforeRendering=function(){var e=this.getSelectedDates(),i=e.length?e[0].getStartDate():undefined,a=this._getYearPicker(),n,s;if(i){n=r.fromLocalJSDate(i);n.setMonth(0,1);s=new r(this._getFocusedDate());s.setMonth(0,1);if(s.isSame(n)){a.setDate(i)}}else{a.setProperty("_middleDate",this._getFocusedDate());a.setDate(this._getFocusedDate().toLocalJSDate())}t.prototype.onBeforeRendering.call(this,arguments)};o.prototype.exit=function(){t.prototype.exit.apply(this,arguments);if(this._fnYPDelegate){this.getAggregation("yearPicker").removeDelegate(this._fnYPDelegate)}};o.prototype._initializeHeader=function(){var e=new a(this.getId()+"--Head",{visibleButton1:false});e.attachEvent("pressPrevious",this._handlePrevious,this);e.attachEvent("pressNext",this._handleNext,this);e.attachEvent("pressButton2",this._handleButton2,this);this._afterHeaderRenderAdjustCSS=this._createOnAfterRenderingDelegate(e);e.addDelegate(this._afterHeaderRenderAdjustCSS);this.setAggregation("header",e)};o.prototype._closePickers=function(){this.setProperty("_currentPicker","yearPicker");this._togglePrevNexYearPicker()};o.prototype._selectYear=function(){var e=this.getSelectedDates()[0],t=this._getYearPicker();if(!e){e=new n}if(!t.getIntervalSelection()){e.setStartDate(this._getYearPicker().getDate());this.addSelectedDate(e)}this.fireSelect()};o.prototype.onsapescape=function(e){this.fireCancel()};o.prototype.setShowCurrentDateButton=function(e){return this};return o});