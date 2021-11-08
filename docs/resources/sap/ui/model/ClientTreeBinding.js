/*!
  * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ChangeReason","./TreeBinding","sap/base/util/each","sap/ui/model/FilterProcessor","sap/ui/model/FilterType","sap/ui/model/SorterProcessor"],function(t,e,i,o,s,r){"use strict";var n=e.extend("sap.ui.model.ClientTreeBinding",{constructor:function(t,i,o,r,n,h){e.apply(this,arguments);if(!this.oContext){this.oContext=""}this._mLengthsCache={};this.filterInfo={};this.filterInfo.aFilteredContexts=[];this.filterInfo.oParentContext={};this.oCombinedFilter=null;this.mNormalizeCache={};if(r){this.oModel.checkFilterOperation(r);if(this.oModel._getObject(this.sPath,this.oContext)){this.filter(r,s.Application)}}}});n.prototype.getRootContexts=function(t,e){if(!t){t=0}if(!e){e=this.oModel.iSizeLimit}var o=this.getResolvedPath(),s=this,r,n,h;if(!o){return[]}if(!this.oModel.isList(o)){n=this.oModel.getContext(o);if(this.bDisplayRootNode){r=[n]}else{r=this.getNodeContexts(n,t,e)}}else{r=[];h=this._sanitizePath(o);i(this.oModel._getObject(h),function(t,e){s._saveSubContext(e,r,h,t)});this._applySorter(r);this._setLengthCache(h,r.length);r=r.slice(t,t+e)}return r};n.prototype.getNodeContexts=function(t,e,i){if(!e){e=0}if(!i){i=this.oModel.iSizeLimit}var o=this._sanitizePath(t.getPath());var s=[],r=this,n=this.oModel._getObject(o),h=this.mParameters&&this.mParameters.arrayNames,a;if(n){if(Array.isArray(n)){n.forEach(function(t,e){r._saveSubContext(t,s,o,e)})}else{a=h||Object.keys(n);a.forEach(function(t){var e=n[t];if(e){if(Array.isArray(e)){e.forEach(function(e,i){r._saveSubContext(e,s,o,t+"/"+i)})}else if(typeof e=="object"){r._saveSubContext(e,s,o,t)}}})}}this._applySorter(s);this._setLengthCache(o,s.length);return s.slice(e,e+i)};n.prototype.hasChildren=function(t){if(t==undefined){return false}return this.getChildCount(t)>0};n.prototype.getChildCount=function(t){var e=t?t.sPath:this.getPath();if(this.oContext){e=this.oModel.resolve(e,this.oContext)}e=this._sanitizePath(e);if(this._mLengthsCache[e]===undefined){if(t){this.getNodeContexts(t)}else{this.getRootContexts()}}return this._mLengthsCache[e]};n.prototype._sanitizePath=function(t){if(!t.endsWith("/")){t=t+"/"}if(!t.startsWith("/")){t="/"+t}return t};n.prototype._saveSubContext=function(t,e,i,o){if(t&&typeof t=="object"){var s=this.oModel.getContext(i+o);if(this.oCombinedFilter&&!this.bIsFiltering){if(this.filterInfo.aFilteredContexts.indexOf(s)!=-1){e.push(s)}}else{e.push(s)}}};n.prototype.filter=function(t,e){if(t&&!Array.isArray(t)){t=[t]}this.oModel.checkFilterOperation(t);if(e==s.Application){this.aApplicationFilters=t||[]}else if(e==s.Control){this.aFilters=t||[]}else{this.aFilters=t||[];this.aApplicationFilters=[]}this.oCombinedFilter=o.combineFilters(this.aFilters,this.aApplicationFilters);if(this.oCombinedFilter){this.applyFilter()}this._mLengthsCache={};this._fireChange({reason:"filter"});this._fireFilter({filters:t});return this};n.prototype.applyFilter=function(){this.filterInfo.aFilteredContexts=[];this.filterInfo.oParentContext={};this._applyFilterRecursive()};n.prototype._applyFilterRecursive=function(t){var e=this,s=[];if(!this.oCombinedFilter){return}this.bIsFiltering=true;var r;if(t){r=this.getNodeContexts(t,0,Number.MAX_VALUE)}else{r=this.getRootContexts(0,Number.MAX_VALUE)}this.bIsFiltering=false;if(r.length>0){i(r,function(i,o){o._parentContext=t;e._applyFilterRecursive(o)});s=o.apply(r,this.oCombinedFilter,function(t,i){return e.oModel.getProperty(i,t)},this.mNormalizeCache);if(s.length>0){this.filterInfo.aFilteredContexts=this.filterInfo.aFilteredContexts.concat(s);this.filterInfo.aFilteredContexts.push(t);this.filterInfo.oParentContext=t}if(r.indexOf(this.filterInfo.oParentContext)!=-1){this.filterInfo.aFilteredContexts.push(t);this.filterInfo.oParentContext=t}}};n.prototype.sort=function(e){e=e||[];this.aSorters=Array.isArray(e)?e:[e];this._fireChange({reason:t.Sort});return this};n.prototype._applySorter=function(t){var e=this;r.apply(t,this.aSorters,function(t,i){return e.oModel.getProperty(i,t)},function(t){return t.getPath()})};n.prototype._setLengthCache=function(t,e){this._mLengthsCache[t]=e};n.prototype.checkUpdate=function(t){this.applyFilter();this._mLengthsCache={};this._fireChange()};return n});