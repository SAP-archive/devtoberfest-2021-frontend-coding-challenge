/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Binding","sap/ui/base/SyncPromise","sap/base/Log","sap/base/assert","./SimpleType","./DataState"],function(t,e,n,r){"use strict";var o=t.extend("sap.ui.model.PropertyBinding",{constructor:function(e,n,r,o){t.apply(this,arguments)},metadata:{abstract:true,publicMethods:["getValue","setValue","setType","getType","setFormatter","getFormatter","getExternalValue","setExternalValue","getBindingMode"]}});o.prototype._getBoundValue=function(t){var e=this.getValue();return t(e)};o.prototype._setBoundValue=function(t,n){var r=this.getDataState(),o=this;if(this.oType){return e.resolve(t).then(function(t){return n(t)}).then(function(t){return e.all([t,o.oType.validateValue(t)])}).then(function(t){return t[0]}).then(function(t){r.setInvalidValue(undefined);o.setValue(t)}).catch(function(e){r.setInvalidValue(t);o.checkDataState();throw e}).unwrap()}else{r.setInvalidValue(undefined);o.setValue(t)}};o.prototype._rawToExternal=function(t){if(this.oType){t=this.oType.formatValue(t,this.sInternalType)}if(this.fnFormatter){t=this.fnFormatter(t)}return t};o.prototype._externalToRaw=function(t){if(this.oType){t=this.oType.parseValue(t,this.sInternalType)}return t};o.prototype._rawToInternal=function(t){var e;if(this.oType&&t!==null&&t!==undefined){e=this.oType.getModelFormat();r(e&&typeof e.parse==="function","The input format of "+this.oType+" should be an object with the 'parse' method");t=e.parse(t)}return t};o.prototype._internalToRaw=function(t){var e;if(t!==null&&t!==undefined){e=this.oType.getModelFormat();r(e&&typeof e.format==="function","The model format of "+this.oType+" should be an object with the 'format' method");t=e.format(t)}return t};o.prototype.getExternalValue=function(){switch(this.sInternalType){case"raw":return this.getRawValue();case"internal":return this.getInternalValue();default:return this._getBoundValue(this._rawToExternal.bind(this))}};o.prototype.setExternalValue=function(t){switch(this.sInternalType){case"raw":return this.setRawValue(t);case"internal":return this.setInternalValue(t);default:if(this.fnFormatter){n.warning("Tried to use twoway binding, but a formatter function is used");return}return this._setBoundValue(t,this._externalToRaw.bind(this))}};o.prototype.getInternalValue=function(){return this._getBoundValue(this._rawToInternal.bind(this))};o.prototype.setInternalValue=function(t){return this._setBoundValue(t,this._internalToRaw.bind(this))};o.prototype.getRawValue=function(){return this._getBoundValue(function(t){return t})};o.prototype.setRawValue=function(t){return this._setBoundValue(t,function(t){return t})};o.prototype.setType=function(t,e){this.oType=t;this.sInternalType=e};o.prototype.getType=function(){return this.oType};o.prototype.setFormatter=function(t){this.fnFormatter=t};o.prototype.getFormatter=function(){return this.fnFormatter};o.prototype.getBindingMode=function(){return this.sMode};o.prototype.setBindingMode=function(t){this.sMode=t};o.prototype.resume=function(){this.bSuspended=false;this.checkUpdate(true)};return o});