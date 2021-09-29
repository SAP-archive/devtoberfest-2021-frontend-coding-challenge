/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Locale","sap/base/util/isPlainObject","sap/base/Log"],function(e,a,t){"use strict";var r={};r.processFormatArguments=function(t,r){var n=a(t)?t:{},s=typeof t==="string"?new e(t):r&&new e(r);return{formatOptions:n,locale:s}};var n=1,s=2,i=3;r.parseJsonDateTime=function(e){var a=/^\/Date\((-?\d+)(\+|-)?(\d+)?\)\/$/,r;if(typeof e==="string"){r=a.exec(e)}if(r){var o=new Date(parseInt(r[n]));if(r[s]){var f=parseInt(r[i]);if(r[s]==="-"){f=-f}var u=o.getUTCMinutes();o.setUTCMinutes(u-f)}if(isNaN(o.valueOf())){t.error("Invalid JSON Date format - "+e)}else{e=o}}return e};return r});