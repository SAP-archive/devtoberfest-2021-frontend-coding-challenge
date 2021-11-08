/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/support/library","sap/ui/support/supportRules/util/StringAnalyzer","sap/ui/model/ListBinding","sap/ui/model/json/JSONModel","sap/ui/model/odata/ODataMetadata","sap/ui/model/CompositeBinding","sap/ui/model/PropertyBinding"],function(e,t,a,i,n,o){"use strict";var d=e.Categories;var s=e.Severity;var r=e.Audiences;function c(e,a){var i=-1;var n=false;e.forEach(function(e){var o=t.calculateLevenshteinDistance(a,e);if(i===-1||o<i){i=o;n=e}});return n}var u={id:"bindingPathSyntaxValidation",audiences:[r.Control,r.Application],categories:[d.Bindings],enabled:true,minversion:"1.32",title:"Model: Unresolved binding path",description:"The binding path used in the model could not be resolved",resolution:"Check the binding path for typos",resolutionurls:[{href:"https://sapui5.hana.ondemand.com/#/api/sap.ui.model.Context",text:"API Reference: Context"},{href:"https://sapui5.hana.ondemand.com/#/topic/e5310932a71f42daa41f3a6143efca9c",text:"Documentation: Data Binding Tutorial"},{href:"https://sapui5.hana.ondemand.com/#/topic/97830de2d7314e93b5c1ee3878a17be9",text:"Documentation: Data Binding Tutorial - Step 12: Aggregation Binding Using Templates"},{href:"https://sapui5.hana.ondemand.com/#/topic/6c7c5c266b534e7ea9a28f861dc515f5",text:"Documentation: Data Binding Tutorial - Step 13: Element Binding"}],check:function(e,t,d){var r=d.getElements();Object.keys(r).forEach(function(t){var d=r[t],u=d.mBindingInfos;Object.keys(u).forEach(function(t){var r=u[t].binding;if(r&&!(r instanceof o)&&r.getModel&&r.getModel()){var l=r.getModel();if(r.getValue&&r.getValue()===undefined||r instanceof a&&r.getLength()===0){var g=false;if(l instanceof i){var h=l.getObject(r.getPath());if(!h){var f=l.getData();g=c(Object.keys(f),r.getPath())}}else if(l.oMetadata&&l.oMetadata instanceof n){var p=l.oMetadata._getEntityTypeByPath(r.getPath());if(!p){var m=[];l.oMetadata.getServiceMetadata().dataServices.schema.forEach(function(e){if(e.entityContainer){e.entityContainer.forEach(function(e){if(e.entitySet){e.entitySet.forEach(function(e){if(e.name){m.push(e.name)}})}})}});g=c(m,r.getPath())}}if(g){e.addIssue({severity:s.Medium,details:"Element "+d.getId()+" with binding path '"+r.getPath()+"' has unresolved bindings."+" You could try '"+g+"' instead",context:{id:d.getId()}})}}else if(r.getValue&&r.getValue()===r.getPath()){e.addIssue({severity:s.Low,details:"Element "+d.getId()+" with binding path '"+r.getPath()+"' has the same value as the path. Potential Error.",context:{id:d.getId()}})}}})})}};return[u]},true);