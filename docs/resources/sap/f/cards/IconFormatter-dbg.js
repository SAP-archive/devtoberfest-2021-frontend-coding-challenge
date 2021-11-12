/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/IconPool"], function (IconPool) {
	"use strict";

	/**
	 * @private
	 */
	var IconFormatter = {

		/**
		 * Format relative icon sources to be relative to the provided sap.app/id.
		 *
		 * @private
		 * @param {string} sUrl The URL to format.
		 * @param {string} sAppId The ID in the "sap.app" namespace of the manifest.
		 * @returns {string} The formatted URL.
		 */
		formatSrc:  function (sUrl, sAppId) {
			var iIndex = 0;

			if (!sUrl || !sAppId) {
				return sUrl;
			}

			// Do not format absolute icon sources.
			if (IconPool.isIconURI(sUrl) || sUrl.startsWith("http://") || sUrl.startsWith("https://") || sUrl.startsWith("//")) {
				return sUrl;
			}

			if (sUrl.startsWith("..")) {
				iIndex = 2;
			} else if (sUrl.startsWith(".")) {
				iIndex = 1;
			}

			return sap.ui.require.toUrl(sAppId.replace(/\./g, "/") + sUrl.slice(iIndex, sUrl.length));
		}
	};

	return IconFormatter;
});
