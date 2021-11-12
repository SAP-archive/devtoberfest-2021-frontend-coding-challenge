/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.getCore().loadLibrary("sap.ui.unified");sap.ui.define(["sap/ui/unified/calendar/CalendarDate","sap/ui/unified/calendar/CalendarUtils","sap/ui/unified/calendar/Month","sap/ui/core/date/UniversalDate","./PlanningCalendarLegend","sap/ui/core/InvisibleText","sap/ui/core/Core","sap/ui/unified/library"],function(e,a,t,n,l,i,s,r){"use strict";var o=r.CalendarDayType;var d={apiVersion:2};d.render=function(e,a){var t=a._getCoreLocaleData();var n=a._getDensitySizes();e.openStart("div",a);e.class("sapMSinglePCGrid");e.class("sapMSPCMonthGrid");e.openEnd();this.renderDayNames(e,a,t);e.openStart("div");e.class("sapMSinglePCGridContent");e.openEnd();this.renderCells(e,a,t,n);e.close("div");e.close("div")};d.renderCells=function(e,a,t,n){var l=a._getCells(),i=a._getVerticalLabels(),s=a._getColumns(),r=[],o=[],d,p,c,g,f=[],u,v,S,C;for(S=0;S<a._getRows();S++){v=0;e.openStart("div");e.attr("role","grid");e.class("sapMSPCMonthWeek");e.openEnd();e.openStart("div");e.class("sapMSPCMonthWeekNumber");e.openEnd();e.text(i[S]);e.close("div");for(C=0;C<s;C++){d=S*s+C;p=l[d];c=a._getAppointmetsForADay(p);g=a._getPreviousAppointmetsForADay(p);f.push(g);u=a._getMoreCountPerCell(d);r.push(u);o.push(c);v=Math.max(v,a._aAppsLevelsPerDay[d].length)}e.openStart("div");e.class("sapMSPCMonthDays");e.class("sapMSPCMonthDaysMax"+v);e.attr("role","row");e.openEnd();for(C=0;C<s;C++){d=S*s+C;p=l[d];this.renderDay(e,a,p,t,r[d],d)}e.openStart("div");e.class("sapMSinglePCBlockers");e.class("sapUiCalendarRowVisFilled");e.attr("role","list");e.openEnd();for(C=0;C<s;C++){d=S*s+C;p=l[d];if(C===0){this.renderAppointments(e,a,f[d],C,r[d],n,S)}this.renderAppointments(e,a,o[d],C,r[d],n,S)}e.close("div");e.close("div");e.close("div")}};d.renderDay=function(n,i,r,o,d,p){var c=i._getSpecialDates(),g=t.prototype._getDateTypes.call(i,r),f=i._getDateFormatter(),u=r.isSame(e.fromLocalJSDate(new Date)),v,S;n.openStart("div");n.class("sapMSPCMonthDay");if(u){n.class("sapMSPCMonthDayToday")}n.attr("role","gridcell");if(a._isWeekend(r,o)||!a._isSameMonthAndYear(r,e.fromLocalJSDate(i.getStartDate()))){n.class("nonWorkingTimeframe")}if(c){if(g&&g[0]){v=g[0];n.class("sapUiCalendarSpecialDay"+v.type);S=l.findLegendItemForItem(s.byId(i._sLegendId),v)}}n.attr("sap-ui-date",r.valueOf().toString());n.attr("tabindex",-1);n.attr("aria-labelledby",f.format(r.toLocalJSDate())+"-Descr");n.openEnd();this.renderDndPlaceholder(n,i.getAggregation("_appsPlaceholders")[p]);if(u){n.openStart("div");n.class("sapMSPCMonthNowMarker");n.openEnd()}n.openStart("div");n.class("specialDateIndicator");n.openEnd();n.close("div");n.openStart("div");n.class("sapMSPCMonthDayNumber");n.openEnd();n.text(r.getDate());n.close("div");if(d){n.openStart("div");n.class("sapMSPCMonthLnkMore");n.openEnd();n.renderControl(i._getMoreLink(d,r,p));n.close("div")}n.openStart("span",f.format(r.toLocalJSDate())+"-Descr");n.class("sapUiInvisibleText");n.openEnd();n.text(i._getCellStartInfo(r.toLocalJSDate()));if(i._sLegendId&&S){n.text(S)}n.close("span");if(u){n.close("div")}n.close("div")};d.renderAppointments=function(e,a,t,n,l,i,s){var r=a._getMaxAppointments(),o=l?r-2:r-1;for(var d=0;d<t.length;d++){if(t[d].level<=o){this.renderAppointment(e,a,t[d],n,i,s)}}};d.renderAppointment=function(e,a,t,n,l,r){var d=t.data,p=t.width,c=t.level,g=a._getColumns(),f=d.getTooltip_AsString(),u=d.getType(),v=d.getColor(),S=d.getTitle(),C=d.getText(),y=d.getIcon(),D=d.getId(),b=d.getParent().getEnableAppointmentsDragAndDrop(),h={role:"listitem",labelledby:{value:i.getStaticId("sap.ui.unified","APPOINTMENT"),append:true},selected:null},A=g-n-p,M=s.getConfiguration().getRTL(),m,T=s.getConfiguration().getTheme().indexOf("_hc")?2:1;A=A<0?0:A;if(S){h["labelledby"].value=h["labelledby"].value+" "+D+"-Title"}h["labelledby"].value=h["labelledby"].value+" "+D+"-Descr";if(C){h["labelledby"].value=h["labelledby"].value+" "+D+"-Text"}if(d.getTentative()){h["labelledby"].value=h["labelledby"].value+" "+i.getStaticId("sap.ui.unified","APPOINTMENT_TENTATIVE")}if(d.getSelected()){h["labelledby"].value=h["labelledby"].value+" "+i.getStaticId("sap.ui.unified","APPOINTMENT_SELECTED")}e.openStart("div",d.getId()+"-"+n+"_"+r);e.attr("draggable",b);e.attr("data-sap-ui-draggable",b);e.attr("data-sap-ui-related",d.getId());e.attr("data-sap-level",c);e.attr("data-sap-width",p);e.attr("tabindex",0);if(f){e.attr("title",f)}e.accessibilityState(d,h);e.class("sapMSinglePCAppointmentWrap");e.class("sapUiCalendarRowApps");if(!v&&u!==o.None){e.class("sapUiCalendarApp"+u)}if(v){if(s.getConfiguration().getRTL()){e.style("border-right-color",v)}else{e.style("border-left-color",v)}}e.style(M?"right":"left","calc("+n*100/g+"% + "+T+"px)");e.style(M?"left":"right","calc("+A*100/g+"% + "+T+"px)");e.style("top",c*l.appHeight+l.cellHeaderHeight+"rem");e.openEnd();e.openStart("div");e.class("sapUiCalendarApp");if(d.getSelected()){e.class("sapUiCalendarAppSel")}if(d.getTentative()){e.class("sapUiCalendarAppTent")}if(y){e.class("sapUiCalendarAppWithIcon")}e.openEnd();e.openStart("div");e.class("sapUiCalendarAppCont");if(v){e.style("background-color",d._getCSSColorForBackground(v))}e.openEnd();if(t.hasPrevious<0){m=["sapUiCalendarAppArrowIconLeft","sapUiCalendarAppArrowIcon"];e.icon("sap-icon://arrow-left",m,{title:null})}if(y){m=["sapUiCalendarAppIcon"];var I={};I["id"]=D+"-Icon";I["title"]=null;e.icon(y,m,I)}if(S){e.openStart("span",D+"-Title");e.class("sapUiCalendarAppTitle");e.openEnd();e.text(S,true);e.close("span")}if(t.hasNext<0){m=["sapUiCalendarAppArrowIconRight","sapUiCalendarAppArrowIcon"];e.icon("sap-icon://arrow-right",m,{title:null})}e.openStart("span",D+"-Descr");e.class("sapUiInvisibleText");e.openEnd();e.text(a._getAppointmentAnnouncementInfo(d));e.close("span");e.close("div");e.close("div");e.close("div")};d.renderDayNames=function(t,n,l){var i=l.getFirstDayOfWeek(),r=n.getId(),o,d=s.getConfiguration().getCalendarType(),p=l.getDaysStandAlone("abbreviated",d),c=l.getDaysStandAlone("wide",d),g=a._getFirstDateOfWeek(e.fromLocalJSDate(n.getStartDate())),f;t.openStart("div",r+"-Names");t.class("sapMSPCMonthDayNames");t.openEnd();for(var u=0;u<7;u++){f=(u+i)%7;o=r+"-WH"+f;t.openStart("div",o);t.class("sapUiCalWH");if(u===0){t.class("sapUiCalFirstWDay")}if(a._isWeekend(g,l)){t.class("sapUiCalItemWeekEnd")}g.setDate(g.getDate()+1);t.accessibilityState(null,{role:"columnheader",label:c[f]});t.openEnd();t.text(p[f%7]);t.close("div")}t.close("div")};d.renderDndPlaceholder=function(e,a){e.openStart("div");e.class("sapMSinglePCOverlay");e.openEnd();e.renderControl(a);e.close("div")};return d},true);