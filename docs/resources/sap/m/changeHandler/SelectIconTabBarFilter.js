/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(function(){"use strict";var e={};e.applyChange=function(e,t,r){var n=r.modifier;var a=e.getDefinition();var i=a.content;return n.getProperty(t,"selectedKey").then(function(r){var a={selectedKey:r};n.setProperty(t,"selectedKey",i);e.setRevertData(a)})};e.revertChange=function(e,t,r){var n=r.modifier;var a=e.getRevertData();var i=a.selectedKey;n.setProperty(t,"selectedKey",i)};e.completeChangeContent=function(e,t,r){};return e});