/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ODataMetaModel","sap/ui/model/Context","sap/ui/model/ChangeReason","sap/ui/model/PropertyBinding","sap/base/util/deepEqual","sap/ui/model/ChangeReason"],function(t,e,i,a,s){"use strict";var o=a.extend("sap.ui.model.odata.ODataPropertyBinding",{constructor:function(t,e,i,s){a.apply(this,arguments);this.bInitial=true;this.oValue=this._getValue();this.vOriginalValue;this.getDataState().setValue(this.oValue);this.setIgnoreMessages(s&&s.ignoreMessages)}});o.prototype.initialize=function(){if(this.oModel.oMetadata.isLoaded()&&this.bInitial){this.checkUpdate(true);this.bInitial=false}};o.prototype.getValue=function(){return this.oValue};o.prototype._getValue=function(){return this.oModel._getObject(this.sPath,this.oContext)};o.prototype.setValue=function(t){if(this.bSuspended){return}if(!s(t,this.oValue)&&this.oModel.setProperty(this.sPath,t,this.oContext,true)){this.oValue=t;var e=this.getDataState();e.setValue(this.oValue);this.oModel.firePropertyChange({reason:i.Binding,path:this.sPath,context:this.oContext,value:t})}};o.prototype.setContext=function(t){var i,a=this.oContext;if(t&&t.isPreliminary()){return}if(e.hasChanged(this.oContext,t)){this.oContext=t;if(this.isRelative()){i=!!(a!==t&&this.getDataState().getControlMessages().length);this.checkUpdate(i)}}};o.prototype.checkUpdate=function(e){var a,o=this;if(this.bSuspended&&!e){return}a=t.getCodeListTerm(this.sPath);if(a){if(this.bInitial){this.oModel.getMetaModel().fetchCodeList(a).then(function(t){o.oValue=t;o._fireChange({reason:i.Change})},function(){})}return}var n=this.getDataState();var h=false;var r=this.oModel.getOriginalProperty(this.sPath,this.oContext);if(e||!s(r,this.vOriginalValue)){this.vOriginalValue=r;n.setOriginalValue(r);h=true}var u=this._getValue();if(e||!s(u,this.oValue)){this.oValue=u;n.setValue(this.oValue);this._fireChange({reason:i.Change});h=true}if(h){this.checkDataState()}};o.prototype.checkDataState=function(t){var e=this.oModel.resolve(this.sPath,this.oContext,true)||this.getResolvedPath();this.getDataState().setLaundering(!!t&&!!(e in t));a.prototype._checkDataState.call(this,e,t)};o.prototype.supportsIgnoreMessages=function(){return true};return o});