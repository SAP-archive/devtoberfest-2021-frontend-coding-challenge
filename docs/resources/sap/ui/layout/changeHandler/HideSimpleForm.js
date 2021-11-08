/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/util/reflection/JsControlTreeModifier","sap/base/Log"],function(e,t){"use strict";var n={};var r=function(e,t){var n=t.getControlType(e);return n==="sap.ui.core.Title"||n==="sap.m.Title"||n==="sap.m.Toolbar"||n==="sap.m.OverflowToolbar"};var o=function(e,t){var n;for(n=0;n<e.length;++n){if(r(e[n],t)){return e[n]}}return undefined};function i(e){return e.modifier.targets==="xmlTree"}n.applyChange=function(e,n,a){var s=a.modifier;var l=a.view;var u=a.appComponent;var g=e.getDefinition();if(i(a)){return Promise.reject(Error("Change cannot be applied in XML. Retrying in JS."))}var f=s.bySelector(g.content.elementSelector||g.content.sHideId,u,l);var c;return this._getState(n,s,u).then(function(t){e.setRevertData(t);return s.getAggregation(n,"content")}).then(function(e){c=e;return s.removeAllAggregation(n,"content")}).then(function(){return c.reduce(function(e,t,r){return e.then(s.insertAggregation.bind(s,n,"content",t,r,l))},Promise.resolve())}).then(function(){var e=-1;if(g.changeType==="hideSimpleFormField"){c.some(function(t,n){if(t===f){e=n;s.setVisible(t,false)}if(e>=0&&n>e){if(s.getControlType(t)==="sap.m.Label"||s.getControlType(t)==="sap.ui.comp.smartfield.SmartLabel"||r(t,s)){return true}else{s.setVisible(t,false)}}})}else if(g.changeType==="removeSimpleFormGroup"){var t=[];var i=o(c,s);var a=i&&!f;c.some(function(o,u){if(!i){s.setVisible(o,false)}else if(a){e=0;s.setVisible(o,false);a=false}else{if(o===f){e=u}if(e>=0&&u>e){if(r(o,s)){if(e===0){t.push(function(){return Promise.resolve().then(s.removeAggregation.bind(s,n,"content",o,l))});t.push(function(){return Promise.resolve().then(s.insertAggregation.bind(s,n,"content",o,0,l))})}return true}else{s.setVisible(o,false)}}}});if(f){t.push(function(){return Promise.resolve().then(s.removeAggregation.bind(s,n,"content",f,l))});t.push(function(){return Promise.resolve().then(s.insertAggregation.bind(s,n,"dependents",f,0,l))})}if(t.length>0){return t.reduce(function(e,t){return e.then(t)},Promise.resolve())}}return Promise.resolve()}).catch(function(n){e.resetRevertData();t.error(n.message||n.name)})};n._getStableElement=function(e){if(e.getMetadata().getName()==="sap.ui.layout.form.FormContainer"){return e.getTitle()||e.getToolbar()}else if(e.getMetadata().getName()==="sap.ui.layout.form.FormElement"){return e.getLabel()}else{return e}};n.completeChangeContent=function(t,n,r){var o=t.getDefinition();if(n.removedElement&&n.removedElement.id){var i=this._getStableElement(sap.ui.getCore().byId(n.removedElement.id));o.content.elementSelector=e.getSelector(i,r.appComponent);t.addDependentControl(i,"elementSelector",r)}else{throw new Error("oSpecificChangeInfo.removedElement.id attribute required")}};n._getState=function(e,t,n){return Promise.resolve().then(function(){return t.getAggregation(e,"content")}).then(function(e){if(!e){return Promise.reject(new Error("Cannot get control state: 'content' aggregation doesn't exist"))}return{content:e.map(function(r){return{elementSelector:t.getSelector(t.getId(r),n),visible:r.getVisible?r.getVisible():undefined,index:e.indexOf(r)}})}})};n.revertChange=function(e,t,n){var r=e.getRevertData();var o=n.appComponent;var i=n.modifier;return Promise.resolve().then(i.removeAllAggregation.bind(i,t,"content")).then(function(){return r.content.reduce(function(e,r){var a=i.bySelector(r.elementSelector,o,n.view);var s=i.getId(a);return e.then(i.getAggregation.bind(i,t,"dependents")).then(function(e){var r=Promise.resolve();e.some(function(e){var o=i.getId(e);if(o===s){r=r.then(i.removeAggregation.bind(i,t,"dependents",e,n.view));return true}});return r}).then(i.insertAggregation.bind(i,t,"content",a,r.index,n.view)).then(function(){i.setProperty(a,"visible",r.visible)})},Promise.resolve()).then(function(){e.resetRevertData()})})};n.getChangeVisualizationInfo=function(t,n){var r=t.getDefinition().content.elementSelector;var o=e.bySelector(r,n);var i=t.getChangeType()==="removeSimpleFormGroup"?o.getParent().getId():o.getParent().getParent().getId();return{affectedControls:[r],displayControls:[i]}};return n},true);