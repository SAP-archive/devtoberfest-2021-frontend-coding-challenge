/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/ParseException","sap/ui/model/ValidateException"],function(t,i){"use strict";var n=new Map,e=/\.(\d+)$/,s=/\.$/,r=/0+$/;function o(t,i){return sap.ui.getCore().getLibraryResourceBundle().getText(t,i)}function u(){return this}function a(t){if(this.mCustomUnits===undefined){throw new i("Cannot validate value without customizing")}}return function(i,m,p){function h(t,i){var e,s=this;if(this.mCustomUnits===undefined&&t&&t[2]!==undefined){if(t[2]===null){this.mCustomUnits=null}else{this.mCustomUnits=n.get(t[2]);if(!this.mCustomUnits){this.mCustomUnits={};Object.keys(t[2]).forEach(function(i){s.mCustomUnits[i]=s.getCustomUnitForKey(t[2],i)});n.set(t[2],this.mCustomUnits)}e={};e[p]=this.mCustomUnits;m.prototype.setFormatOptions.call(this,Object.assign(e,this.oFormatOptions))}}if(!t||t[0]===undefined||t[1]===undefined||this.mCustomUnits===undefined&&t[2]===undefined){return null}return m.prototype.formatValue.call(this,t.slice(0,2),i)}function l(i,n,u){var a,p,h,l,f;if(this.mCustomUnits===undefined){throw new t("Cannot parse value without customizing")}f=m.prototype.parseValue.apply(this,arguments);l=f[1]||u[1];if(f[0].includes(".")){f[0]=f[0].replace(r,"").replace(s,"")}if(l&&this.mCustomUnits){h=e.exec(f[0]);p=h?h[1].length:0;a=this.mCustomUnits[l].decimals;if(p>a){throw new t(a?o("EnterNumberFraction",[a]):o("EnterInt"))}}if(!this.bParseAsString){f[0]=Number(f[0])}return f}function f(t,i){if(t&&t[p]){throw new Error("Format option "+p+" is not supported")}if(i){throw new Error("Constraints not supported")}if(arguments.length>2){throw new Error("Only the parameter oFormatOptions is supported")}this.bParseAsString=!t||!("parseAsString"in t)||t.parseAsString;t=Object.assign({unitOptional:true,emptyString:0},t,{parseAsString:true});m.call(this,t,i);this.mCustomUnits=undefined;this.bParseWithValues=true;this.setConstraints=function(){throw new Error("Constraints not supported")};this.setFormatOptions=function(){throw new Error("Format options are immutable")}}i._applyUnitMixin=f;i.formatValue=h;i.getInterface=u;i.parseValue=l;i.validateValue=a}},false);