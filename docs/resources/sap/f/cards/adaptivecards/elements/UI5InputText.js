/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/thirdparty/adaptivecards"],function(e){"use strict";function t(){e.TextInput.apply(this,arguments)}t.prototype=Object.create(e.TextInput.prototype);t.prototype.internalRender=function(){if(this.isMultiline){var e=document.createElement("ui5-textarea");e.id=this.id;e.placeholder=this.placeholder||"";e.value=this.defaultValue||"";e.maxlength=this.maxLength||null;e.addEventListener("change",function(){this.valueChanged()}.bind(this));return e}var t=document.createElement("ui5-input");switch(this.style){case 1:t.type="Tel";break;case 2:t.type="URL";break;case 3:t.type="Email";break;default:t.type="Text"}t.id=this.id;t.placeholder=this.placeholder||"";t.value=this.defaultValue||"";t.maxlength=this.maxLength||null;t.addEventListener("change",function(){this.valueChanged()}.bind(this));return t};return t});