/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/IconPool"],function(t){"use strict";var r={formatSrc:function(r,i){var s=0;if(!r||!i){return r}if(t.isIconURI(r)||r.startsWith("http://")||r.startsWith("https://")||r.startsWith("//")){return r}if(r.startsWith("..")){s=2}else if(r.startsWith(".")){s=1}return sap.ui.require.toUrl(i.replace(/\./g,"/")+r.slice(s,r.length))}};return r});