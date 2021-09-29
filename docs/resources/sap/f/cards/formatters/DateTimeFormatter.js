/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/format/DateFormat","sap/ui/core/date/UniversalDate","sap/f/cards/Utils"],function(e,a,t){"use strict";var r={dateTime:function(r,n,s){var i=t.processFormatArguments(n,s),o=e.getDateTimeInstance(i.formatOptions,i.locale),u=t.parseJsonDateTime(r);var c=new a(u);var m=o.format(c);return m},date:function(e,a,t){return r.dateTime.apply(this,arguments)}};return r});