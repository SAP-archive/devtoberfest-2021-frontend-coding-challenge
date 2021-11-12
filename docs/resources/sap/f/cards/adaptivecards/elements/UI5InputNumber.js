/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/thirdparty/adaptivecards"],function(t){"use strict";function e(){t.NumberInput.apply(this,arguments)}e.prototype=Object.create(t.NumberInput.prototype);e.prototype.internalRender=function(){this._numberInputElement=document.createElement("ui5-input");this._numberInputElement.type="Number";this._numberInputElement.id=this.id;this._numberInputElement.placeholder=this.placeholder||"";this._numberInputElement.value=this.defaultValue||"";this._numberInputElement.addEventListener("change",function(t){if(t.target.value>this._max){t.target.value=this._max}if(t.target.value<this._min){t.target.value=this._min}this.valueChanged()}.bind(this));return this._numberInputElement};return e});