/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core"],function(t){"use strict";var o=function(o){if(o){this._oControl=o;this._oControl.addDelegate(this._controlDelegate,false,this)}this.oRb=t.getLibraryResourceBundle("sap.f")};o.prototype._controlDelegate={onBeforeRendering:function(){this.attachDelegates()}};o.prototype.attachDelegates=function(){this._oDelegateSecondTitle={onAfterRendering:this.onAfterRenderingSecondTitle};this._oDelegateSearch={onAfterRendering:this.onAfterRenderingSearch};this._oDelegateNotifications={onAfterRendering:this.onAfterRenderingNotifications};this._oDelegateAvatar={onAfterRendering:this.onAfterRenderingAvatar};this._oDelegateProducts={onAfterRendering:this.onAfterRenderingProducts};this._oDelegateNavButton={onAfterRendering:this.onAfterRenderingNavButton};this._oDelegateMenuButton={onAfterRendering:this.onAfterRenderingMenuButton};if(this._oControl._oSecondTitle){this._oControl._oSecondTitle.addDelegate(this._oDelegateSecondTitle,false,this)}if(this._oControl._oSearch){this._oControl._oSearch.addDelegate(this._oDelegateSearch,false,this)}if(this._oControl._oNotifications){this._oControl._oNotifications.addDelegate(this._oDelegateNotifications,false,this)}if(this._oControl._oAvatarButton){this._oControl._oAvatarButton.addDelegate(this._oDelegateAvatar,false,this)}if(this._oControl._oProductSwitcher){this._oControl._oProductSwitcher.addDelegate(this._oDelegateProducts,false,this)}if(this._oControl._oNavButton){this._oControl._oNavButton.addDelegate(this._oDelegateNavButton,false,this)}if(this._oControl._oMenuButton){this._oControl._oMenuButton.addDelegate(this._oDelegateMenuButton,false,this)}};o.prototype.getRootAttributes=function(){return{role:"banner",label:this.oRb.getText("SHELLBAR_CONTAINER_LABEL")}};o.prototype.getCoPilotAttributes=function(){return{role:"button",label:this.oRb.getText("SHELLBAR_COPILOT_TOOLTIP")}};o.prototype.getEntityTooltip=function(t){return this.oRb.getText("SHELLBAR_"+t+"_TOOLTIP")||""};o.prototype.updateNotificationsNumber=function(t){var o=this.getEntityTooltip("NOTIFICATIONS"),e=t?t+" "+o:o;this._oControl._oNotifications.setTooltip(e);this._oControl._oNotifications.$().attr("aria-label",e)};o.prototype.onAfterRenderingSecondTitle=function(){var t=this._oControl._oSecondTitle.$();t.attr("role","heading");t.attr("aria-level","2")};o.prototype.onAfterRenderingSearch=function(){this._oControl._oSearch.$().attr("aria-label",this.getEntityTooltip("SEARCH"))};o.prototype.onAfterRenderingNotifications=function(){var t=this._oControl._oNotifications.$(),o=this.getEntityTooltip("NOTIFICATIONS"),e=this._oControl._oNotifications.data("notifications"),i=e?e+" "+o:o;t.attr("aria-label",i);t.attr("aria-haspopup","dialog")};o.prototype.onAfterRenderingAvatar=function(){var t=this._oControl._oAvatarButton.$();t.attr("aria-label",this.getEntityTooltip("PROFILE"));t.attr("aria-haspopup","menu")};o.prototype.onAfterRenderingProducts=function(){var t=this._oControl._oProductSwitcher.$();t.attr("aria-label",this.getEntityTooltip("PRODUCTS"));t.attr("aria-haspopup","menu")};o.prototype.onAfterRenderingNavButton=function(){this._oControl._oNavButton.$().attr("aria-label",this.getEntityTooltip("BACK"))};o.prototype.onAfterRenderingMenuButton=function(){var t=this._oControl._oMenuButton.$();t.attr("aria-label",this.getEntityTooltip("MENU"));t.attr("aria-haspopup","menu")};o.prototype.exit=function(){if(this._oControl){this._oControl.removeDelegate(this._controlDelegate)}if(this._oControl._oSecondTitle){this._oControl._oSecondTitle.removeDelegate(this._oDelegateSecondTitle)}if(this._oControl._oSearch){this._oControl._oSearch.removeDelegate(this._oDelegateSearch)}if(this._oControl._oNotifications){this._oControl._oNotifications.removeDelegate(this._oDelegateNotifications)}if(this._oControl._oAvatarButton){this._oControl._oAvatarButton.removeDelegate(this._oDelegateAvatar)}if(this._oControl._oProductSwitcher){this._oControl._oProductSwitcher.removeDelegate(this._oDelegateProducts)}if(this._oControl._oNavButton){this._oControl._oNavButton.removeDelegate(this._oDelegateNavButton)}if(this._oControl._oMenuButton){this._oControl._oMenuButton.removeDelegate(this._oDelegateMenuButton)}};return o});