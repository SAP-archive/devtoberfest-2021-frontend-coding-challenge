/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.getCore().loadLibrary("sap.ui.unified");sap.ui.define(["sap/ui/unified/CalendarLegend","sap/ui/unified/CalendarAppointment","./PlanningCalendarLegendRenderer"],function(e,t,n){"use strict";var i=e.extend("sap.m.PlanningCalendarLegend",{metadata:{library:"sap.m",properties:{itemsHeader:{type:"string",group:"Appearance",defaultValue:"Calendar"},appointmentItemsHeader:{type:"string",group:"Appearance",defaultValue:"Appointments"}},aggregations:{appointmentItems:{type:"sap.ui.unified.CalendarLegendItem",multiple:true,singularName:"appointmentItem"}},designtime:"sap/m/designtime/PlanningCalendarLegend.designtime"}});i._COLUMN_WIDTH_DEFAULT="auto";i.prototype.init=function(){e.prototype.init.call(this);this.setProperty("columnWidth",i._COLUMN_WIDTH_DEFAULT);this.addStyleClass("sapMPlanCalLegend")};i.prototype.setColumnWidth=function(e){if(e==undefined){e=i._COLUMN_WIDTH_DEFAULT}return this.setProperty("columnWidth",e)};i.findLegendItemForItem=function(e,n){var i=e?e.getAppointmentItems():null,a=e?e.getItems():null,r=n instanceof t,p=r?i:a,d=r?n.getType():n.type,s,l,u;if(p&&p.length){for(u=0;u<p.length;u++){s=p[u];if(s.getType()===d){l=s.getText();break}}}if(!l){l=d}return l};return i});