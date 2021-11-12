/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","./YearPicker","./YearRangePickerRenderer","./CalendarDate","sap/ui/core/date/UniversalDate","./CalendarUtils","sap/ui/thirdparty/jquery"],function(e,t,a,r,i,s,n){"use strict";var o=t.extend("sap.ui.unified.calendar.YearRangePicker",{metadata:{library:"sap.ui.unified",properties:{years:{type:"int",group:"Appearance",defaultValue:9},columns:{type:"int",group:"Appearance",defaultValue:3},rangeSize:{type:"int",group:"Appearance",defaultValue:20}}}});o.prototype.setDate=function(e){var t,a,i,n,o;e&&s._checkJSDateObject(e);a=e.getFullYear();s._checkYearInValidRange(a);t=r.fromLocalJSDate(e,this.getPrimaryCalendarType());t.setMonth(0,1);this.setProperty("date",e);this.setProperty("year",t.getYear());this._oDate=t;i=this.getYears();o=Math.floor(i/2);n=new r(this._oDate,this.getPrimaryCalendarType());n=this._checkFirstDate(n);this._iSelectedIndex=o;this.setProperty("_middleDate",n);return this};o.prototype._checkFirstDate=function(e){var t=this.getYears();var a=new r(this._oMaxDate,this.getPrimaryCalendarType());if(!a.isSame(s._maxDate(this.getPrimaryCalendarType()))){return e}a.setYear(a.getYear()-Math.floor(t/2)*this.getRangeSize()+1-Math.floor(this.getRangeSize()/2));if(e.isAfter(a)&&e.getYear()!=a.getYear()){e=new r(a,this.getPrimaryCalendarType());e.setMonth(0,1)}else if(e.isBefore(this._oMinDate)&&e.getYear()!=this._oMinDate.getYear()){e=new r(this._oMinDate,this.getPrimaryCalendarType());e.setMonth(0,1)}return e};o.prototype._updatePage=function(e,t,a){var i=this._oItemNavigation.getItemDomRefs(),s=r.fromLocalJSDate(this._oFormatYyyymmdd.parse(n(i[0]).attr("data-sap-year-start")),this.getPrimaryCalendarType()),o=this.getYears(),h=this.getRangeSize();if(e){var p=new r(this._oMaxDate,this.getPrimaryCalendarType());p.setYear(p.getYear()-o*h+1);if(s.isBefore(p)){s.setYear(s.getYear()+o*h+Math.floor(h/2)+Math.floor(o/2)*h);s=this._checkFirstDate(s)}else{return}}else{if(s.isAfter(this._oMinDate)){s.setYear(s.getYear()-o*h);if(s.isBefore(this._oMinDate)){s=new r(this._oMinDate,this.getPrimaryCalendarType())}s.setYear(s.getYear()+Math.floor(o/2)*h+Math.floor(h/2));s=this._checkFirstDate(s)}else{return}}this._iSelectedIndex=t;this.setProperty("_middleDate",s);if(a){this.firePageChange()}};o.prototype._checkDateEnabled=function(e,t){if(s._isBetween(this._oMinDate,e,t,true)||s._isBetween(this._oMaxDate,e,t,true)||this._oMinDate.isBefore(e)&&this._oMaxDate.isAfter(t)){return true}return false};o.prototype._selectYear=function(e){var t=this._oItemNavigation.getItemDomRefs(),a=n(t[e]),i=a.attr("data-sap-year-start"),s=r.fromLocalJSDate(this._oFormatYyyymmdd.parse(i),this.getPrimaryCalendarType());if(a.hasClass("sapUiCalItemDsbl")){return false}this.setProperty("date",s.toLocalJSDate());this.setProperty("year",s.getYear());return true};return o});