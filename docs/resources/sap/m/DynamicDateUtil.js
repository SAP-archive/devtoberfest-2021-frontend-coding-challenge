/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./StandardDynamicDateOption","./StandardDynamicDateRangeKeys","sap/base/Log"],function(e,T,n){"use strict";var y={_options:{TODAY:new e({key:"TODAY",valueTypes:[]}),YESTERDAY:new e({key:"YESTERDAY",valueTypes:[]}),TOMORROW:new e({key:"TOMORROW",valueTypes:[]}),THISWEEK:new e({key:"THISWEEK",valueTypes:[]}),THISMONTH:new e({key:"THISMONTH",valueTypes:[]}),THISQUARTER:new e({key:"THISQUARTER",valueTypes:[]}),THISYEAR:new e({key:"THISYEAR",valueTypes:[]}),LASTWEEK:new e({key:"LASTWEEK",valueTypes:[]}),LASTMONTH:new e({key:"LASTMONTH",valueTypes:[]}),LASTQUARTER:new e({key:"LASTQUARTER",valueTypes:[]}),LASTYEAR:new e({key:"LASTYEAR",valueTypes:[]}),NEXTWEEK:new e({key:"NEXTWEEK",valueTypes:[]}),NEXTMONTH:new e({key:"NEXTMONTH",valueTypes:[]}),NEXTQUARTER:new e({key:"NEXTQUARTER",valueTypes:[]}),NEXTYEAR:new e({key:"NEXTYEAR",valueTypes:[]}),LASTDAYS:new e({key:"LASTDAYS",valueTypes:["int"]}),LASTWEEKS:new e({key:"LASTWEEKS",valueTypes:["int"]}),LASTMONTHS:new e({key:"LASTMONTHS",valueTypes:["int"]}),LASTQUARTERS:new e({key:"LASTQUARTERS",valueTypes:["int"]}),LASTYEARS:new e({key:"LASTYEARS",valueTypes:["int"]}),NEXTDAYS:new e({key:"NEXTDAYS",valueTypes:["int"]}),NEXTWEEKS:new e({key:"NEXTWEEKS",valueTypes:["int"]}),NEXTMONTHS:new e({key:"NEXTMONTHS",valueTypes:["int"]}),NEXTQUARTERS:new e({key:"NEXTQUARTERS",valueTypes:["int"]}),NEXTYEARS:new e({key:"NEXTYEARS",valueTypes:["int"]}),FROM:new e({key:"FROM",valueTypes:["date"]}),TO:new e({key:"TO",valueTypes:["date"]}),YEARTODATE:new e({key:"YEARTODATE",valueTypes:[]}),TODAYFROMTO:new e({key:"TODAYFROMTO",valueTypes:["int","int"]}),QUARTER1:new e({key:"QUARTER1",valueTypes:[]}),QUARTER2:new e({key:"QUARTER2",valueTypes:[]}),QUARTER3:new e({key:"QUARTER3",valueTypes:[]}),QUARTER4:new e({key:"QUARTER4",valueTypes:[]}),SPECIFICMONTH:new e({key:"SPECIFICMONTH",valueTypes:["int"]}),DATERANGE:new e({key:"DATERANGE",valueTypes:["date","date"]}),DATE:new e({key:"DATE",valueTypes:["date"]})},_allKeys:T.slice(0)};y.addOption=function(e){if(!e||!e.getKey()){return}var T=e.getKey();y._options[T]=e;if(y._allKeys.indexOf(T)===-1){y._allKeys.push(T)}};y.getAllOptionKeys=function(){return y._allKeys.slice(0)};y.getOption=function(e){return y._options[e]};y.parse=function(e,E){if(typeof e!=="string"){n.error("DynamicDateFormat can only parse a String.");return[]}var a=[],t;var A=Object.keys(y._options).sort(function(e,n){return T.indexOf(e)-T.indexOf(n)}).map(function(e){return y._options[e]});for(var s=0;s<A.length;s++){t=A[s].parse(e.trim(),E);if(t){t.operator=A[s].getKey();a.push(t)}}return a};y.toDates=function(e){var T=e.operator;return y._options[T].toDates(e)};return y},true);