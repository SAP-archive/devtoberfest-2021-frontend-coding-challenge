/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([
	"sap/ui/base/ManagedObject",
	"sap/base/util/extend",
	"./formatters/DateTimeFormatter",
	"./formatters/NumberFormatter",
	"./bindingFeatures/DateRange"
	], function (
		ManagedObject,
		extend,
		DateTimeFormatter,
		NumberFormatter,
		DateRange
	) {
		"use strict";

		/**
		 * Matches cards placeholders like "{{parameters.param1}}". It checks for two opening braces and two closing braces.
		 * Does not match the framework's binding syntax: "{= ${url}}".
		 *
		 * \{\{ - two opening braces
		 * ([^}]+) - everything which is not a closing brace
		 * \}\} - two closing braces
		 *
		 * @type {RegExp}
		 */
		var rCardPlaceholderPattern = /\{\{([^}]+)\}\}/g;

		/**
		 * Helper class for working with bindings.
		 *
		 * @author SAP SE
		 * @version 1.76.0
		 *
		 * @private
		 * @alias sap.f.cards.BindingHelper
		 */
		var BindingHelper = {};

		/**
		 * Map of cards formatters.
		 */
		var mFormatters = {
			date: DateTimeFormatter.date,
			dateTime: DateTimeFormatter.dateTime,
			currency: NumberFormatter.currency,
			"float": NumberFormatter.float,
			integer: NumberFormatter.integer,
			percent: NumberFormatter.percent,
			unit: NumberFormatter.unit
		};

		BindingHelper.mLocals = {
			"format": mFormatters,
			"dateRange": DateRange
		};

		/**
		 * Resolves expression bindings with our formatters. Also creates binding infos, if there is a binding syntax.
		 *
		 * @param {string} sValue The string with binding.
		 * @returns {object|string} Created binding info
		 */
		BindingHelper.extractBindingInfo = function (sValue) {
			// TO DO: Check if "bindingSyntax" is "complex"
			// ManagedObject.bindingParser == BindingParser.complexParser

			sValue = BindingHelper.escapeCardPlaceholders(sValue);

			return ManagedObject.bindingParser(
				sValue,
				undefined, // oContext
				true, // bUnescape - when set to 'true' expressions that don't contain bindings are also resolved, else they are treated as strings
				undefined, // bTolerateFunctionsNotFound
				undefined, // bStaticContext
				undefined, // bPreferContext
				BindingHelper.mLocals // mLocals - functions which will be used in expression binding
			);
		};

		/**
		 * Calls <code>BindingHelper.extractBindingInfo</code> for the given vItem. If it is array or object, it will be processed recursively.
		 * The given vItem won't be modified.
		 *
		 * @param {*} vItem Object, Array, or any other type.
		 * @returns {*} Processed variant of vItem which is turned to binding info(s).
		 */
		BindingHelper.createBindingInfos = function (vItem) {

			if (!vItem) {
				return vItem;
			}

			if (Array.isArray(vItem)) {
				return vItem.map(BindingHelper.createBindingInfos);
			}

			if (typeof vItem === "object") {
				var oItemCopy = {};

				for (var sKey in vItem) {
					oItemCopy[sKey] = BindingHelper.createBindingInfos(vItem[sKey]);
				}

				return oItemCopy;
			}

			return BindingHelper.extractBindingInfo(vItem) || vItem;
		};


		/**
		 * Creates a binding info with formatter or applies formatter directly if the value is string.
		 *
		 * @param {array|object|string} vValue Can be array with parts, object that represents a binding info or a string.
		 * @param {function} fnFormatter Formatter function.
		 * @returns {object|string} New binding info object with the formatter, or a formatted string.
		 */
		BindingHelper.formattedProperty = function(vValue, fnFormatter) {

			var vBindingInfo = {};

			if (Array.isArray(vValue)) { // multiple values - create binding info with 'parts' and 'formatter'
				vBindingInfo.parts = vValue.map(function (vInfo) {
					return typeof vInfo === "object" ? extend({} , vInfo) : vInfo;
				});

				vBindingInfo.formatter = fnFormatter;
			} else if (typeof vValue === "object") { // create binding info with a 'formatter'
			vBindingInfo = extend({}, vValue);

				if (vValue.formatter) {

					var fnInitialFormatter = vBindingInfo.formatter;

					vBindingInfo.formatter = function () {
						var sInitialFormatterResult = fnInitialFormatter.apply(this, arguments);
						return fnFormatter(sInitialFormatterResult);
					};
				} else {
					vBindingInfo.formatter = fnFormatter;
				}

			} else { // single string value - just apply the formatter on it
				vBindingInfo = fnFormatter(vValue);
			}

			return vBindingInfo;
		};

		/**
		 * Escapes the cards placeholders with double braces, so that the binding parser does not consider it as a binding.
		 * The string "{{destinations.myDestination}}" will become "\\{\\{destinations.myDestination\\}\\}".
		 *
		 * @param {string} sValue The value to escape.
		 * @returns {string} The escaped value.
		 */
		BindingHelper.escapeCardPlaceholders = function (sValue) {
			if (typeof sValue !== "string") {
				return sValue;
			}

			return sValue.replace(rCardPlaceholderPattern, "\\{\\{$1\\}\\}");
		};

		return BindingHelper;
	});

