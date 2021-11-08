/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseTreeModifier","sap/ui/base/ManagedObject","sap/ui/base/DataType","sap/base/util/merge","sap/ui/util/XMLHelper","sap/ui/core/mvc/EventHandlerResolver","sap/base/util/includes","sap/base/util/ObjectPath","sap/base/util/isPlainObject","sap/ui/core/Fragment"],function(e,t,n,r,i,o,a,u,g){"use strict";var f="http://schemas.sap.com/sapui5/extension/sap.ui.core.CustomData/1";var s=r({},e,{targets:"xmlTree",setVisible:function(e,t){if(t){e.removeAttribute("visible")}else{e.setAttribute("visible",t)}},getVisible:function(e){return s.getProperty(e,"visible")},setStashed:function(e,t){if(!t){e.removeAttribute("stashed")}else{e.setAttribute("stashed",t)}s.setVisible(e,!t)},getStashed:function(e){return Promise.all([s.getProperty(e,"stashed"),s.getProperty(e,"visible")]).then(function(e){return!!e[0]||!e[1]})},bindProperty:function(e,t,n){e.setAttribute(t,"{"+n+"}")},unbindProperty:function(e,t){e.removeAttribute(t)},_setProperty:function(e,t,n,r){var i=s._getSerializedValue(n);if(r){i=s._escapeCurlyBracketsInString(i)}e.setAttribute(t,i)},setProperty:function(e,t,n){s._setProperty(e,t,n,true)},getProperty:function(e,r){var i;var o;var a=e.getAttribute(r);return s.getControlMetadata(e).then(function(t){i=t.getProperty(r);if(i){o=i.getType();if(r==="value"&&s.getControlType(e)==="sap.ui.core.CustomData"){return s.getProperty(e,"key").then(function(e){if(e==="sap-ui-custom-settings"){o=n.getType("object")}})}}return undefined}).then(function(){if(i){if(a===null){a=i.getDefaultValue()||o.getDefaultValue()}else{var e=t.bindingParser(a,undefined,true);if(g(e)){if(e.path||e.parts){a=undefined}else{a=e}}else{a=o.parseValue(e||a)}}}return a})},isPropertyInitial:function(e,t){var n=e.getAttribute(t);return n==null},setPropertyBinding:function(e,t,n){if(typeof n!=="string"){throw new Error("For XML, only strings are supported to be set as property binding.")}e.setAttribute(t,n)},getPropertyBinding:function(e,n){var r=e.getAttribute(n);if(r){var i=t.bindingParser(r,undefined,true);if(i&&(i.path||i.parts)){return i}}return undefined},createAndAddCustomData:function(e,t,n){e.setAttributeNS(f,"custom.data.via.modifier:"+t,s._escapeCurlyBracketsInString(n));return Promise.resolve()},createControl:function(e,t,n,r,i,o){var a,u,g;if(!s.bySelector(r,t,n)){var f=e.split(".");var c="";if(f.length>1){u=f.pop();c=f.join(".")}var l=n.ownerDocument.createElementNS(c,u);a=s.getControlIdBySelector(r,t);if(a){l.setAttribute("id",a)}return Promise.resolve().then(function(){if(i){return s.applySettings(l,i)}return undefined}).then(function(){return Promise.resolve(l)})}else{g=new Error("Can't create a control with duplicated ID "+a);return Promise.reject(g)}},applySettings:function(e,t){return s.getControlMetadata(e).then(function(n){var r=n.getJSONKeys();Object.keys(t).forEach(function(n){var i=r[n];var o=t[n];switch(i._iKind){case 0:s._setProperty(e,n,o,false);break;case 3:s.setAssociation(e,n,o);break;default:throw new Error("Unsupported in applySettings on XMLTreeModifier: "+n)}})})},_byId:function(e,t){if(t){if(t.ownerDocument&&t.ownerDocument.getElementById&&t.ownerDocument.getElementById(e)){return t.ownerDocument.getElementById(e)}return t.querySelector("[id='"+e+"']")}return undefined},getId:function(e){return e.getAttribute("id")},getParent:function(e){var t=e.parentNode;if(!s.getId(t)&&!s._isExtensionPoint(t)){t=t.parentNode}return t},_getLocalName:function(e){return e.localName||e.baseName||e.nodeName},getControlType:function(e){return s._getControlTypeInXml(e)},setAssociation:function(e,t,n){if(typeof n!=="string"){n=s.getId(n)}e.setAttribute(t,n)},getAssociation:function(e,t){return e.getAttribute(t)},getAllAggregations:function(e){return s.getControlMetadata(e).then(function(e){return e.getAllAggregations()})},getAggregation:function(e,t){var n=[];var r;return s._isSingleValueAggregation(e,t).then(function(n){r=n;return s._findAggregationNode(e,t)}).then(function(i){if(i){return s._getControlsInAggregation(e,i).then(function(e){n=e})}return s._isAltTypeAggregation(e,t).then(function(i){if(i&&r){return s.getProperty(e,t).then(function(e){n.push(e)})}return undefined})}).then(function(){if(t==="customData"){var i;var o=Array.prototype.slice.call(e.attributes).reduce(function(t,n){var r=s._getLocalName(n);if(n.namespaceURI===f){var o=e.ownerDocument.createElementNS("sap.ui.core","CustomData");o.setAttribute("key",r);o.setAttribute("value",n.value);t.push(o)}else if(n.namespaceURI&&n.name.indexOf("xmlns:")!==0){if(!i){i={}}if(!i.hasOwnProperty(n.namespaceURI)){i[n.namespaceURI]={}}i[n.namespaceURI][r]=n.nodeValue}return t},[]);n=n.concat(o);if(i){var a=e.ownerDocument.createElementNS("sap.ui.core","CustomData");a.setAttribute("key","sap-ui-custom-settings");s.setProperty(a,"value",i);n.push(a)}}return r?n[0]:n})},insertAggregation:function(e,t,n,r,i,o){return s._findAggregationNode(e,t).then(function(n){if(!n){var r=e.namespaceURI;return s.createControl(r+"."+t,undefined,i).then(function(t){e.appendChild(t);return t})}return n}).then(function(t){if(!o){var i=t.children;var a=0;var u=r<i.length?r:i.length;for(var g=0;g<u;g++){if(i[g].namespaceURI==="sap.ui.core"&&i[g].tagName.indexOf("ExtensionPoint")>-1){a=a+1-i[g].children.length}}r=r+a}if(r>=t.childElementCount){t.appendChild(n)}else{return s._getControlsInAggregation(e,t).then(function(e){t.insertBefore(n,e[r])})}return undefined})},removeAggregation:function(e,t,n){return s._findAggregationNode(e,t).then(function(e){e.removeChild(n)})},removeAllAggregation:function(e,t){return s._findAggregationNode(e,t).then(function(t){if(e===t){return s._getControlsInAggregation(e,e).then(function(t){t.forEach(function(t){e.removeChild(t)})})}return e.removeChild(t)})},_findAggregationNode:function(e,t){var n;var r=s._children(e);for(var i=0;i<r.length;i++){var o=r[i];if(o.localName===t){n=o;break}}var a=Promise.resolve(n);if(!n){a=a.then(s._isDefaultAggregation.bind(s,e,t)).then(function(t){if(t){return e}return n})}return a},_isDefaultAggregation:function(e,t){return s.getControlMetadata(e).then(function(e){var n=e.getDefaultAggregation();return n&&t===n.name})},_isNotNamedAggregationNode:function(e,t){return s.getAllAggregations(e).then(function(n){var r=n[t.localName];return e.namespaceURI!==t.namespaceURI||!r})},_isSingleValueAggregation:function(e,t){return s.getAllAggregations(e).then(function(e){var n=e[t];return!n.multiple})},_isAltTypeAggregation:function(e,t){return s.getControlMetadata(e).then(function(e){return e.getAllAggregations()[t]}).then(function(e){return!!e.altTypes})},_isExtensionPoint:function(e){return s._getControlTypeInXml(e)==="sap.ui.core.ExtensionPoint"},getControlMetadata:function(e){return s._getControlMetadataInXml(e)},_getControlsInAggregation:function(e,t){var n=Array.prototype.slice.call(s._children(t));return Promise.all(n.map(function(t){return s._isNotNamedAggregationNode(e,t).then(function(e){return e?t:undefined})})).then(function(e){return e.filter(function(e){return!!e})})},_children:function(e){if(e.children){return e.children}else{var t=[];for(var n=0;n<e.childNodes.length;n++){var r=e.childNodes[n];if(r.nodeType===r.ELEMENT_NODE){t.push(r)}}return t}},getBindingTemplate:function(e,t){return s._findAggregationNode(e,t).then(function(e){if(e){var t=s._children(e);if(t.length===1){return t[0]}}return undefined})},updateAggregation:function(e,t){},findIndexInParentAggregation:function(e){var t=s.getParent(e);if(!t){return Promise.resolve(-1)}return s.getParentAggregationName(e,t).then(function(e){return s.getAggregation(t,e)}).then(function(t){if(Array.isArray(t)){var n=t.map(function(e){return Promise.resolve().then(function(){if(s._isExtensionPoint(e)){return e}return s.getProperty(e,"stashed").then(function(t){return!t?e:undefined})})});return Promise.all(n).then(function(t){return t.filter(function(e){return!!e}).indexOf(e)})}else{return 0}})},getParentAggregationName:function(e,t){return Promise.resolve().then(function(){if(!t.isSameNode(e.parentNode)){return false}else{return s._isNotNamedAggregationNode(t,e)}}).then(function(n){if(n){return s.getControlMetadata(t).then(function(e){return e.getDefaultAggregationName()})}else{return s._getLocalName(e.parentNode)}})},findAggregation:function(e,t){return s.getControlMetadata(e).then(function(e){return e.getAllAggregations()}).then(function(e){if(e){return e[t]}return undefined})},validateType:function(e,t,n,r,i){var o=t.type;return s.getAggregation(n,t.name).then(function(e){if(t.multiple===false&&e&&e.length>0){return false}var n=sap.ui.xmlfragment({fragmentContent:r});if(!Array.isArray(n)){n=[n]}var a=n[i].isA(o);n.forEach(function(e){e.destroy()});return a})},instantiateFragment:function(e,t,n){var r=i.parse(e);return s._checkAndPrefixIdsInFragment(r,t).then(function(e){var t;if(e.localName==="FragmentDefinition"){t=s._getElementNodeChildren(e)}else{t=[e]}t.forEach(function(e){if(s._byId(e.getAttribute("id"),n)){throw Error("The following ID is already in the view: "+e.getAttribute("id"))}});return t})},templateControlFragment:function(t,n){return e._templateFragment(t,n).then(function(e){return s._children(e)})},destroy:function(e){var t=e.parentNode;if(t){t.removeChild(e)}},_getFlexCustomData:function(e,t){if(!e){return undefined}return e.getAttributeNS("sap.ui.fl",t)},attachEvent:function(e,t,n,r){if(typeof u.get(n)!=="function"){return Promise.reject(new Error("Can't attach event because the event handler function is not found or not a function."))}return s.getProperty(e,t).then(function(i){i=i||"";var u=o.parse(i);var g=n;var f=["$event"];if(r){f.push(JSON.stringify(r))}g+="("+f.join(",")+")";if(!a(u,g)){u.push(g)}e.setAttribute(t,u.join(";"))})},detachEvent:function(e,t,n){if(typeof u.get(n)!=="function"){return Promise.reject(new Error("Can't attach event because the event handler function is not found or not a function."))}return s.getProperty(e,t).then(function(r){r=r||"";var i=o.parse(r);var a=i.findIndex(function(e){return e.includes(n)});if(a>-1){i.splice(a,1)}if(i.length){e.setAttribute(t,i.join(";"))}else{e.removeAttribute(t)}})},bindAggregation:function(e,t,n,r){return Promise.resolve().then(function(){s.bindProperty(e,t,n.path);return s.insertAggregation(e,t,n.template,0,r)})},unbindAggregation:function(e,t){return Promise.resolve().then(function(){if(e.hasAttribute(t)){e.removeAttribute(t);return s.removeAllAggregation(e,t)}return undefined})},getExtensionPointInfo:function(e,t){return Promise.resolve().then(function(){if(t&&e){var n=Array.prototype.slice.call(t.getElementsByTagNameNS("sap.ui.core","ExtensionPoint"));var r=n.filter(function(t){return t.getAttribute("name")===e});var i=r.length===1?r[0]:undefined;if(i){var o=s.getParent(i);return Promise.all([s.getParentAggregationName(i,o),s.findIndexInParentAggregation(i)]).then(function(e){var t={parent:o,aggregationName:e[0],index:e[1]+1,defaultContent:Array.prototype.slice.call(s._children(i))};return t})}}return undefined})}});return s},true);