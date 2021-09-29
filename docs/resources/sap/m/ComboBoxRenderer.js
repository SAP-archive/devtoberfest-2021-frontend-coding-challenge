/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ComboBoxBaseRenderer","sap/ui/core/Renderer"],function(s,e){"use strict";var a=e.extend(s);a.apiVersion=2;a.CSS_CLASS_COMBOBOX="sapMComboBox";a.addOuterClasses=function(e,C){s.addOuterClasses.apply(this,arguments);e.class(a.CSS_CLASS_COMBOBOX)};a.addInnerClasses=function(e,C){s.addInnerClasses.apply(this,arguments);e.class(a.CSS_CLASS_COMBOBOX+"Inner")};a.addButtonClasses=function(e,C){s.addButtonClasses.apply(this,arguments);e.class(a.CSS_CLASS_COMBOBOX+"Arrow")};a.addPlaceholderClasses=function(e,C){s.addPlaceholderClasses.apply(this,arguments);e.class(a.CSS_CLASS_COMBOBOX+"Placeholder")};return a},true);