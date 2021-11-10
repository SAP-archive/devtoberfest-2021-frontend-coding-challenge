/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/BindingMode","sap/ui/model/Model","./ResourcePropertyBinding","sap/base/i18n/ResourceBundle","sap/base/Log"],function(e,n,t,i,o){"use strict";var r=/^(?:\/|\.)*/;var s=n.extend("sap.ui.model.resource.ResourceModel",{constructor:function(t){var r;n.apply(this,arguments);this.aCustomBundles=[];this.bReenhance=false;this.bAsync=!!(t&&t.async);this.sDefaultBindingMode=t.defaultBindingMode||e.OneWay;this.mSupportedBindingModes={OneWay:true,TwoWay:false,OneTime:!this.bAsync};if(this.bAsync&&this.sDefaultBindingMode==e.OneTime){o.warning("Using binding mode OneTime for asynchronous ResourceModel is not supported!")}this.oData=Object.assign({},t);r=Array.isArray(this.oData.enhanceWith)&&this.oData.enhanceWith.some(function(e){return e instanceof i});if(t&&t.bundle){this._oResourceBundle=t.bundle;r=true}else if(t&&(t.bundleUrl||t.bundleName)){if(r){delete this.oData.enhanceWith;if(t.terminologies||t.activeTerminologies){throw new Error("'terminologies' parameter and 'activeTerminologies' parameter are not"+" supported in configuration when enhanceWith contains ResourceBundles")}}a(this)}else{throw new Error("At least bundle, bundleName or bundleUrl must be provided!")}if(r&&Array.isArray(t.enhanceWith)){if(this.bAsync){this._pEnhanced=t.enhanceWith.reduce(function(e,n){return e.then(this.enhance.bind(this,n))}.bind(this),Promise.resolve())}else{t.enhanceWith.forEach(this.enhance.bind(this))}}}});s._sanitizeBundleName=function(e){if(e&&(e[0]==="/"||e[0]===".")){o.error('Incorrect resource bundle name "'+e+'"',"Leading slashes or dots in resource bundle names are ignored, since such names are"+' invalid UI5 module names. Please check whether the resource bundle "'+e+'" is actually needed by your application.',"sap.base.i18n.ResourceBundle");e=e.replace(r,"")}return e};s.loadResourceBundle=function(e,n){var t=sap.ui.getCore().getConfiguration(),o=e.bundleLocale,r;if(!o){o=t.getLanguage()}e.bundleName=s._sanitizeBundleName(e.bundleName);r=Object.assign({async:n,includeInfo:t.getOriginInfo(),locale:o},e);return i.create(r)};s.prototype.enhance=function(e){var n=this,t,o=this.bAsync?new Promise(function(e){t=e}):null;function r(){if(e instanceof i){n._oResourceBundle._enhance(e);n.checkUpdate(true);if(o){t(true)}}else{if(e.terminologies){throw new Error("'terminologies' parameter is not"+" supported for enhancement")}var r=s.loadResourceBundle(e,n.bAsync);if(r instanceof Promise){r.then(function(e){n._oResourceBundle._enhance(e);n.checkUpdate(true);t(true)},function(){t(true)})}else if(r){n._oResourceBundle._enhance(r);n.checkUpdate(true)}}}if(this._oPromise){Promise.resolve(this._oPromise).then(r)}else{r()}if(!this.bReenhance){this.aCustomBundles.push(e)}return o};s.prototype.bindProperty=function(e){return new t(this,e)};s.prototype.getProperty=function(e){return this._oResourceBundle?this._oResourceBundle.getText(e):null};s.prototype.getResourceBundle=function(){if(!this.bAsync){return this._oResourceBundle}else{var e=this._oPromise;if(e){return new Promise(function(n,t){function i(e){n(e)}e.then(i,i)})}else{return Promise.resolve(this._oResourceBundle)}}};s.prototype._handleLocalizationChange=function(){a(this)};s.prototype._reenhance=function(){this.bReenhance=true;this.aCustomBundles.forEach(function(e){this.enhance(e)}.bind(this));this.bReenhance=false};function a(e){var n=e.oData;if(n&&(n.bundleUrl||n.bundleName)){var t=s.loadResourceBundle(n,n.async);if(t instanceof Promise){var o={url:i._getUrl(n.bundleUrl,s._sanitizeBundleName(n.bundleName)),async:true};e.fireRequestSent(o);e._oPromise=t;e._oPromise.then(function(n){e._oResourceBundle=n;e._reenhance();delete e._oPromise;e.checkUpdate(true);e.fireRequestCompleted(o)})}else{e._oResourceBundle=t;e._reenhance();e.checkUpdate(true)}}}return s});