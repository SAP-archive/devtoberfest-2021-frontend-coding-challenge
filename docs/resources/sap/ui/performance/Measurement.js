/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/thirdparty/URI","sap/base/util/now"],function(e,t,r){"use strict";var t=window.URI;function n(){function n(e,t,r,n,i){this.id=e;this.info=t;this.start=r;this.end=n;this.pause=0;this.resume=0;this.duration=0;this.time=0;this.categories=i;this.average=false;this.count=0;this.completeDuration=0}function i(e){if(!o){return true}if(!e){return o===null}for(var t=0;t<o.length;t++){if(e.indexOf(o[t])>-1){return true}}return false}function s(e){if(!e){e=["javascript"]}e=typeof e==="string"?e.split(","):e;if(!i(e)){return null}return e}function u(e,t){for(var r=0;r<t.length;r++){if(e.categories.indexOf(t[r])>-1){return true}}return t.length===0}var a=false,f=XMLHttpRequest,o=null,l=[],d=[],c={},h={};this.getActive=function(){return a};this.setActive=function(e,r){var n,i;if(!r){r=null}else if(typeof r==="string"){r=r.split(",")}o=r;if(a===e){return}a=e;if(a){for(var s in c){this[s]=c[s].bind(this)}c={};n=this.end;i=this.start;XMLHttpRequest=function(){var e=new f,r=e.open,s;e.open=function(){s=new t(arguments[1],new t(document.baseURI).search("")).href();i(s,"Request for "+s,"xmlhttprequest");e.addEventListener("loadend",n.bind(null,s));r.apply(this,arguments)};return e}}else{XMLHttpRequest=f}return a};c["start"]=function(t,i,u){if(!a){return}u=s(u);if(!u){return}var f=r(),o=new n(t,i,f,0,u);if(e.getLevel("sap.ui.Performance")>=4&&window.console&&console.time){console.time(i+" - "+t)}e.info("Performance measurement start: "+t+" on "+f);if(o){h[t]=o;return this.getMeasurement(o.id)}else{return false}};c["pause"]=function(t){if(!a){return}var n=r();var i=h[t];if(i&&i.end>0){return false}if(i&&i.pause==0){i.pause=n;if(i.pause>=i.resume&&i.resume>0){i.duration=i.duration+i.pause-i.resume;i.resume=0}else if(i.pause>=i.start){i.duration=i.pause-i.start}}if(i){e.info("Performance measurement pause: "+t+" on "+n+" duration: "+i.duration);return this.getMeasurement(i.id)}else{return false}};c["resume"]=function(t){if(!a){return}var n=r();var i=h[t];if(i&&i.pause>0){i.pause=0;i.resume=n}if(i){e.info("Performance measurement resume: "+t+" on "+n+" duration: "+i.duration);return this.getMeasurement(i.id)}else{return false}};c["end"]=function(t){if(!a){return}var n=r();var i=h[t];if(i&&!i.end){e.info("Performance measurement end: "+t+" on "+n);i.end=n;if(i.end>=i.resume&&i.resume>0){i.duration=i.duration+i.end-i.resume;i.resume=0}else if(i.pause>0){i.pause=0}else if(i.end>=i.start){if(i.average){i.completeDuration+=i.end-i.start;i.count++;i.duration=i.completeDuration/i.count;i.start=n}else{i.duration=i.end-i.start}}if(i.end>=i.start){i.time=i.end-i.start}}if(i){if(e.getLevel("sap.ui.Performance")>=4&&window.console&&console.timeEnd){console.timeEnd(i.info+" - "+t)}return this.getMeasurement(t)}else{return false}};c["clear"]=function(){h={}};c["remove"]=function(e){delete h[e]};c["add"]=function(e,t,r,i,u,f,o){if(!a){return}o=s(o);if(!o){return false}var l=new n(e,t,r,i,o);l.time=u;l.duration=f;if(l){h[e]=l;return this.getMeasurement(l.id)}else{return false}};c["average"]=function(e,t,n){if(!a){return}n=s(n);if(!n){return}var i=h[e],u=r();if(!i||!i.average){this.start(e,t,n);i=h[e];i.average=true}else{if(!i.end){i.completeDuration+=u-i.start;i.count++}i.start=u;i.end=0}return this.getMeasurement(i.id)};this.getMeasurement=function(e){var t=h[e];if(t){var r={};for(var n in t){r[n]=t[n]}return r}else{return false}};this.getAllMeasurements=function(e){return this.filterMeasurements(function(e){return e},e)};this.filterMeasurements=function(){var e,t,r=0,n=[],i=typeof arguments[r]==="function"?arguments[r++]:undefined,s=typeof arguments[r]==="boolean"?arguments[r++]:undefined,a=Array.isArray(arguments[r])?arguments[r]:[];for(var f in h){e=this.getMeasurement(f);t=s===false&&e.end===0||s!==false&&(!s||e.end);if(t&&u(e,a)&&(!i||i(e))){n.push(e)}}return n};this.registerMethod=function(t,r,n,i){var s=r[n];if(s&&typeof s==="function"){var u=l.indexOf(s)>-1;if(!u){d.push({func:s,obj:r,method:n,id:t});var a=this;r[n]=function(){a.average(t,t+" method average",i);var e=s.apply(this,arguments);a.end(t);return e};l.push(r[n]);return true}}else{e.debug(n+" in not a function. Measurement.register failed")}return false};this.unregisterMethod=function(e,t,r){var n=t[r],i=l.indexOf(n);if(n&&i>-1){t[r]=d[i].func;l.splice(i,1);d.splice(i,1);return true}return false};this.unregisterAllMethods=function(){while(d.length>0){var e=d[0];this.unregisterMethod(e.id,e.obj,e.method)}};var m=location.search.match(/sap-ui-measure=([^\&]*)/);if(m&&m[1]){if(m[1]==="true"||m[1]==="x"||m[1]==="X"){this.setActive(true)}else{this.setActive(true,m[1])}}else{var p=function(){return null};for(var v in c){this[v]=p}}}return new n});