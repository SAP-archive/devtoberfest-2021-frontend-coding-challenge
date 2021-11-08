/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","./library","sap/ui/core/Control","sap/m/ToggleButton","sap/ui/core/InvisibleText","sap/m/Toolbar","sap/m/ToolbarSpacer","sap/m/OverflowToolbarLayoutData","sap/m/OverflowToolbarAssociativePopover","sap/m/OverflowToolbarAssociativePopoverControls","sap/ui/core/ResizeHandler","sap/ui/core/IconPool","sap/ui/core/theming/Parameters","sap/ui/dom/units/Rem","sap/ui/Device","./OverflowToolbarRenderer","sap/base/Log","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/Focusable"],function(t,e,o,i,n,r,s,l,a,h,f,u,d,p,_,C,v,c){"use strict";var g=e.PlacementType;var y=e.ButtonType;var b=t.aria.HasPopup;var O=e.OverflowToolbarPriority;var T=r.extend("sap.m.OverflowToolbar",{metadata:{properties:{asyncMode:{type:"boolean",group:"Behavior",defaultValue:false}},aggregations:{_overflowButton:{type:"sap.m.ToggleButton",multiple:false,visibility:"hidden"},_popover:{type:"sap.m.Popover",multiple:false,visibility:"hidden"}},designtime:"sap/m/designtime/OverflowToolbar.designtime"}});T.ARIA_ROLE_DESCRIPTION="OVERFLOW_TOOLBAR_ROLE_DESCRIPTION";T.CONTENT_SIZE_TOLERANCE=1;T.prototype._callToolbarMethod=function(t,e){return r.prototype[t].apply(this,e)};T.prototype.init=function(){this._callToolbarMethod("init",arguments);this._iPreviousToolbarWidth=null;this._bOverflowButtonNeeded=false;this._bListenForControlPropertyChanges=false;this._bListenForInvalidationEvents=false;this._bControlsInfoCached=false;this._bSkipOptimization=false;this._aControlSizes={};this._iFrameRequest=null;this._iOverflowToolbarButtonSize=0;this._oOverflowToolbarButtonClone=null;this._aMovableControls=[];this._aToolbarOnlyControls=[];this._aPopoverOnlyControls=[];this._aAllCollections=[this._aMovableControls,this._aToolbarOnlyControls,this._aPopoverOnlyControls];this.addStyleClass("sapMOTB");this._sAriaRoleDescription=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText(T.ARIA_ROLE_DESCRIPTION);this._fnMediaChangeRef=this._fnMediaChange.bind(this);_.media.attachHandler(this._fnMediaChangeRef)};T.prototype.exit=function(){var t=this.getAggregation("_popover");if(t){t.destroy()}if(this._oOverflowToolbarButtonClone){this._oOverflowToolbarButtonClone.destroy()}if(this._iFrameRequest){window.cancelAnimationFrame(this._iFrameRequest);this._iFrameRequest=null}_.media.detachHandler(this._fnMediaChangeRef)};T.prototype.setAsyncMode=function(t){return this.setProperty("asyncMode",t,true)};T.prototype.onAfterRendering=function(){this._bInvalidatedAndNotRendered=false;if(this._bContentVisibilityChanged){this._bControlsInfoCached=false;this._bContentVisibilityChanged=false}if(this.getAsyncMode()){this._doLayoutAsync().then(this._applyFocus.bind(this))}else{this._doLayout();this._applyFocus()}};T.prototype.onsapfocusleave=function(){this._resetChildControlFocusInfo()};T.prototype.setWidth=function(t){this.setProperty("width",t);this._bResized=true;return this};T.prototype._doLayout=function(){var t=sap.ui.getCore(),e;if(!t.isThemeApplied()){v.debug("OverflowToolbar: theme not applied yet, skipping calculations",this);return}this._recalculateOverflowButtonSize();e=this.$().is(":visible")?this.$().width():0;this._bListenForControlPropertyChanges=false;this._bListenForInvalidationEvents=false;this._deregisterToolbarResize();if(e>0){if(!this._isControlsInfoCached()||this._bNeedUpdateOnControlsCachedSizes&&this._bResized){this._cacheControlsInfo()}if(this._iPreviousToolbarWidth!==e){this._iPreviousToolbarWidth=e;this._setControlsOverflowAndShrinking(e);this.fireEvent("_controlWidthChanged")}}this._registerToolbarResize();this._bListenForControlPropertyChanges=true;this._bListenForInvalidationEvents=true;this._bResized=false};T.prototype._doLayoutAsync=function(){return new Promise(function(t,e){this._iFrameRequest=window.requestAnimationFrame(function(){this._doLayout();t()}.bind(this))}.bind(this))};T.prototype._applyFocus=function(){var t,e,o=this.$().lastFocusableDomRef();if(this.sFocusedChildControlId){t=sap.ui.getCore().byId(this.sFocusedChildControlId);e=t&&t.$()}if(e&&e.length){e.trigger("focus")}else if(this._bControlWasFocused){this._getOverflowButton().focus();this._bControlWasFocused=false;this._bOverflowButtonWasFocused=true}else if(this._bOverflowButtonWasFocused&&!this._getOverflowButtonNeeded()){o&&o.focus();this._bOverflowButtonWasFocused=false}};T.prototype._preserveChildControlFocusInfo=function(){var t=sap.ui.getCore().getCurrentFocusedControlId();if(this._getControlsIds().indexOf(t)!==-1){this._bControlWasFocused=true;this.sFocusedChildControlId=t}else if(t===this._getOverflowButton().getId()){this._bOverflowButtonWasFocused=true;this.sFocusedChildControlId=""}};T.prototype._resetChildControlFocusInfo=function(){this._bControlWasFocused=false;this._bOverflowButtonWasFocused=false;this.sFocusedChildControlId=""};T.prototype._registerToolbarResize=function(){if(r.isRelativeWidth(this.getWidth())){var t=this._handleResize.bind(this);this._sResizeListenerId=f.register(this,t)}};T.prototype._deregisterToolbarResize=function(){if(this._sResizeListenerId){f.deregister(this._sResizeListenerId);this._sResizeListenerId=""}};T.prototype._handleResize=function(){this._bResized=true;if(this._bInvalidatedAndNotRendered){return}this._callDoLayout()};T.prototype._fnMediaChange=function(){this._bControlsInfoCached=false;this._iPreviousToolbarWidth=null;this._callDoLayout()};T.prototype._callDoLayout=function(){if(this.getAsyncMode()){this._doLayoutAsync()}else{this._doLayout()}};T.prototype._cacheControlsInfo=function(){var t,e,o=parseInt(this.$().css("padding-right"))||0,i=parseInt(this.$().css("padding-left"))||0;this._iOldContentSize=this._iContentSize;this._iContentSize=0;this._bNeedUpdateOnControlsCachedSizes=false;this.getContent().forEach(this._updateControlsCachedSizes,this);if(_.system.phone){this._iContentSize-=1}if(this._aPopoverOnlyControls.length){t=this._aPopoverOnlyControls.filter(function(t){return t.getVisible()});e=t.length>0;if(e){this._iContentSize+=this._getOverflowButtonSize()}}this._bControlsInfoCached=true;if(this._iOldContentSize!==this._iContentSize){this.fireEvent("_contentSizeChange",{contentSize:this._iContentSize+o+i+1})}};T.prototype._updateControlsCachedSizes=function(t){var e,o,i;e=this._getControlPriority(t);o=this._calculateControlSize(t);this._aControlSizes[t.getId()]=o;i=r.getOrigWidth(t.getId());if(i&&r.isRelativeWidth(i)){this._bNeedUpdateOnControlsCachedSizes=true}if(e!==O.AlwaysOverflow){this._iContentSize+=o}};T.prototype._calculateControlSize=function(t){return this._getOptimalControlWidth(t,this._aControlSizes[t.getId()])};T.prototype._isControlsInfoCached=function(){return this._bControlsInfoCached};T.prototype._flushButtonsToPopover=function(){this._aButtonsToMoveToPopover.forEach(this._moveButtonToPopover,this)};T.prototype._invalidateIfHashChanged=function(t){if(typeof t==="undefined"||this._getPopover()._getContentIdsHash()!==t){this._preserveChildControlFocusInfo();this.invalidate()}};T.prototype._addOverflowButton=function(){if(!this._getOverflowButtonNeeded()){this._iCurrentContentSize+=this._getOverflowButtonSize();this._setOverflowButtonNeeded(true)}};T.prototype._aggregateMovableControls=function(){var t={},e=[],o,i,n,r,s;this._aMovableControls.forEach(function(l){o=T._getControlGroup(l);i=T._oPriorityOrder;if(o){n=this._getControlPriority(l);r=this._getControlIndex(l);t[o]=t[o]||[];s=t[o];s.unshift(l);if(!s._priority||i[s._priority]<i[n]){s._priority=n}if(!s._index||s._index<r){s._index=r}}else{e.push(l)}},this);Object.keys(t).forEach(function(o){e.push(t[o])});return e};T.prototype._extractControlsToMoveToOverflow=function(t,e){var o,i;for(o=0;o<t.length;o++){i=t[o];if(i.length){i.forEach(this._addToPopoverArrAndUpdateContentSize,this)}else{this._addToPopoverArrAndUpdateContentSize(i)}if(this._getControlPriority(i)!==O.Disappear){this._addOverflowButton()}if(this._iCurrentContentSize<=e){break}}};T.prototype._addToPopoverArrAndUpdateContentSize=function(t){this._aButtonsToMoveToPopover.unshift(t);this._iCurrentContentSize-=this._aControlSizes[t.getId()]};T.prototype._sortByPriorityAndIndex=function(t,e){var o=T._oPriorityOrder,i=this._getControlPriority(t),n=this._getControlPriority(e),r=o[i]-o[n];if(r!==0){return r}else{return this._getControlIndex(e)-this._getControlIndex(t)}};T.prototype._setControlsOverflowAndShrinking=function(t){var e;this._iCurrentContentSize=this._iContentSize;this._aButtonsToMoveToPopover=[];if(this._bSkipOptimization){this._bSkipOptimization=false}else{e=this._getPopover()._getContentIdsHash()}this._resetToolbar();this._collectPopoverOnlyControls();this._markControlsWithShrinkableLayoutData();if(this._iCurrentContentSize<=t+T.CONTENT_SIZE_TOLERANCE){this._flushButtonsToPopover();this._invalidateIfHashChanged(e);return}this._moveControlsToPopover(t);this._flushButtonsToPopover();if(this._iCurrentContentSize>t){this._checkContents()}this._invalidateIfHashChanged(e)};T.prototype._markControlsWithShrinkableLayoutData=function(){this.getContent().forEach(this._markControlWithShrinkableLayoutData,this)};T.prototype._collectPopoverOnlyControls=function(){var t=this._aPopoverOnlyControls.length,e,o;if(t){for(e=t-1;e>=0;e--){o=this._aPopoverOnlyControls[e];if(o.getVisible()){this._aButtonsToMoveToPopover.unshift(o)}}if(this._aButtonsToMoveToPopover.length>0){this._setOverflowButtonNeeded(true)}}};T.prototype._moveControlsToPopover=function(t){var e=[];if(this._aMovableControls.length){e=this._aggregateMovableControls();e.sort(this._sortByPriorityAndIndex.bind(this));this._extractControlsToMoveToOverflow(e,t)}};T.prototype._markControlWithShrinkableLayoutData=function(t){var e,o;t.removeStyleClass(r.shrinkClass);e=r.getOrigWidth(t.getId());if(!r.isRelativeWidth(e)){return}o=t.getLayoutData();if(o&&o.isA("sap.m.ToolbarLayoutData")&&o.getShrinkable()){t.addStyleClass(r.shrinkClass)}};T.prototype._resetToolbar=function(){this._getPopover().close();this._getPopover()._getAllContent().forEach(this._restoreButtonInToolbar,this);this._setOverflowButtonNeeded(false);this.getContent().forEach(this._removeShrinkingClass)};T.prototype._removeShrinkingClass=function(t){t.removeStyleClass(r.shrinkClass)};T.prototype._moveButtonToPopover=function(t){this._getPopover().addAssociatedContent(t)};T.prototype._restoreButtonInToolbar=function(t){if(typeof t==="object"){t=t.getId()}this._getPopover().removeAssociatedContent(t)};T.prototype._resetAndInvalidateToolbar=function(t){if(this._bIsBeingDestroyed){return}this._resetToolbar();this._bControlsInfoCached=false;this._iPreviousToolbarWidth=null;if(t){this._bSkipOptimization=true}if(this.$().length){this._preserveChildControlFocusInfo();this.invalidate()}};T.prototype.invalidate=function(){this._bInvalidatedAndNotRendered=true;o.prototype.invalidate.apply(this,arguments)};T.prototype._getVisibleContent=function(){var t=this.getContent(),e=this._getPopover()._getAllContent();return t.filter(function(t){return e.indexOf(t)===-1})};T.prototype._getVisibleAndNonOverflowContent=function(){return this._getVisibleContent().filter(function(t){return t.getVisible()})};T.prototype._getToggleButton=function(t){return new i({ariaHasPopup:b.Menu,id:this.getId()+t,icon:u.getIconURI("overflow"),press:this._overflowButtonPressed.bind(this),ariaLabelledBy:n.getStaticId("sap.ui.core","Icon.overflow"),type:y.Transparent})};T.prototype._getOverflowButton=function(){var t;if(!this.getAggregation("_overflowButton")){t=this._getToggleButton("-overflowButton");this.setAggregation("_overflowButton",t,true)}return this.getAggregation("_overflowButton")};T.prototype._getOverflowButtonClone=function(){if(!this._oOverflowToolbarButtonClone){this._oOverflowToolbarButtonClone=this._getToggleButton("-overflowButtonClone").addStyleClass("sapMTBHiddenElement")}return this._oOverflowToolbarButtonClone};T.prototype._overflowButtonPressed=function(t){var e=this._getPopover(),o=this._getBestPopoverPlacement();if(e.getPlacement()!==o){e.setPlacement(o)}if(e.isOpen()){e.close()}else{e.openBy(t.getSource())}};T.prototype._getPopover=function(){var t;if(!this.getAggregation("_popover")){t=new a(this.getId()+"-popover",{showHeader:false,showArrow:false,modal:false,horizontalScrolling:_.system.phone?false:true,contentWidth:_.system.phone?"100%":"auto",offsetY:this._detireminePopoverVerticalOffset(),ariaLabelledBy:n.getStaticId("sap.m","INPUT_AVALIABLE_VALUES")});t._adaptPositionParams=function(){a.prototype._adaptPositionParams.call(this);this._myPositions=["end top","begin center","end bottom","end center"];this._atPositions=["end bottom","end center","end top","begin center"]};if(_.system.phone){t.attachBeforeOpen(this._shiftPopupShadow,this)}t.attachAfterClose(this._popOverClosedHandler,this);this.setAggregation("_popover",t,true)}return this.getAggregation("_popover")};T.prototype._shiftPopupShadow=function(){var t=this._getPopover(),e=t.getCurrentPosition();if(e===g.Bottom){t.addStyleClass("sapMOTAPopoverNoShadowTop");t.removeStyleClass("sapMOTAPopoverNoShadowBottom")}else if(e===g.Top){t.addStyleClass("sapMOTAPopoverNoShadowBottom");t.removeStyleClass("sapMOTAPopoverNoShadowTop")}};T.prototype._popOverClosedHandler=function(){this._getOverflowButton().setPressed(false);if(c(document.activeElement).control(0)){return}this._getOverflowButton().focus()};T.prototype._getOverflowButtonNeeded=function(){return this._bOverflowButtonNeeded};T.prototype._setOverflowButtonNeeded=function(t){if(this._bOverflowButtonNeeded!==t){this._bOverflowButtonNeeded=t}return this};T.prototype._updateContentInfoInControlsCollections=function(){this.getContent().forEach(function(t){if(t){this._removeContentFromControlsCollections(t);this._moveControlInSuitableCollection(t,this._getControlPriority(t))}},this)};T.prototype._moveControlInSuitableCollection=function(t,e){var o=e!==O.NeverOverflow,i=e===O.AlwaysOverflow;if(h.supportsControl(t)&&i){this._aPopoverOnlyControls.push(t)}else{if(h.supportsControl(t)&&o&&t.getVisible()){this._aMovableControls.push(t)}else{this._aToolbarOnlyControls.push(t)}}};T.prototype._removeContentFromControlsCollections=function(t){var e,o,i;for(e=0;e<this._aAllCollections.length;e++){o=this._aAllCollections[e];i=o.indexOf(t);if(i!==-1){o.splice(i,1)}}};T.prototype._clearAllControlsCollections=function(){this._aMovableControls=[];this._aToolbarOnlyControls=[];this._aPopoverOnlyControls=[];this._aAllCollections=[this._aMovableControls,this._aToolbarOnlyControls,this._aPopoverOnlyControls]};T.prototype.onLayoutDataChange=function(t){this._resetAndInvalidateToolbar(true);t&&this._updateContentInfoInControlsCollections()};T.prototype.addContent=function(t){this._registerControlListener(t);this._resetAndInvalidateToolbar(false);if(t){this._moveControlInSuitableCollection(t,this._getControlPriority(t))}this._informNewFlexibleContentAdded(t);return this._callToolbarMethod("addContent",arguments)};T.prototype.insertContent=function(t,e){this._registerControlListener(t);this._resetAndInvalidateToolbar(false);if(t){this._moveControlInSuitableCollection(t,this._getControlPriority(t))}this._informNewFlexibleContentAdded(t);return this._callToolbarMethod("insertContent",arguments)};T.prototype.removeContent=function(){var t=this._callToolbarMethod("removeContent",arguments);if(t){this._getPopover().removeAssociatedContent(t.getId())}this._resetAndInvalidateToolbar(false);this._deregisterControlListener(t);this._removeContentFromControlsCollections(t);return t};T.prototype.removeAllContent=function(){var t=this._callToolbarMethod("removeAllContent",arguments);t.forEach(this._deregisterControlListener,this);t.forEach(this._removeContentFromControlsCollections,this);this._resetAndInvalidateToolbar(false);this._clearAllControlsCollections();return t};T.prototype.destroyContent=function(){this._resetAndInvalidateToolbar(false);setTimeout(function(){this._resetAndInvalidateToolbar(false)}.bind(this),0);this._clearAllControlsCollections();return this._callToolbarMethod("destroyContent",arguments)};T.prototype._informNewFlexibleContentAdded=function(t){if(t&&t.isA("sap.m.IOverflowToolbarFlexibleContent")){this.fireEvent("_contentSizeChange",{contentSize:null})}};T.prototype._registerControlListener=function(t){var e;if(t){t.attachEvent("_change",this._onContentPropertyChangedOverflowToolbar,this);if(t.getMetadata().getInterfaces().indexOf("sap.m.IOverflowToolbarContent")>-1){e=t.getOverflowToolbarConfig().invalidationEvents;if(e&&Array.isArray(e)){e.forEach(function(e){t.attachEvent(e,this._onInvalidationEventFired,this)},this)}}}};T.prototype._deregisterControlListener=function(t){var e;if(t){t.detachEvent("_change",this._onContentPropertyChangedOverflowToolbar,this);if(t.getMetadata().getInterfaces().indexOf("sap.m.IOverflowToolbarContent")>-1){e=t.getOverflowToolbarConfig().invalidationEvents;if(e&&Array.isArray(e)){e.forEach(function(e){t.detachEvent(e,this._onInvalidationEventFired,this)},this)}}}};T.prototype._onContentPropertyChangedOverflowToolbar=function(t){var e=t.getSource(),o,i;this._updateContentInfoInControlsCollections();if(!this._bListenForControlPropertyChanges){return}o=h.getControlConfig(e);i=t.getParameter("name");if(i!=="visible"&&!e.getVisible()){return}if(typeof o!=="undefined"&&o.noInvalidationProps.indexOf(i)!==-1){return}if(i==="visible"){this._bContentVisibilityChanged=true}if(e.isA("sap.m.IOverflowToolbarFlexibleContent")&&e.getVisible()){this.fireEvent("_contentSizeChange",{contentSize:null})}this._resetAndInvalidateToolbar(true)};T.prototype._onInvalidationEventFired=function(t){var e=t.getSource();if(!this._bListenForInvalidationEvents){return}if(e.isA("sap.m.IOverflowToolbarFlexibleContent")){this.fireEvent("_contentSizeChange",{contentSize:null})}this._resetAndInvalidateToolbar(true)};T.prototype._getOverflowButtonSize=function(){return this._iOverflowToolbarButtonSize};T.prototype._getBestPopoverPlacement=function(){var t=this.getHTMLTag();if(t==="Footer"){return g.Top}else if(t==="Header"){return g.Bottom}return g.Vertical};T.prototype._getControlsIds=function(){return this.getContent().map(function(t){return t.getId()})};T.prototype._getControlIndex=function(t){return t.length?t._index:this.indexOfContent(t)};T.prototype._getOptimalControlWidth=function(t,e){var o,i=t.getLayoutData(),n=i&&i.isA("sap.m.ToolbarLayoutData")?i.getShrinkable():false,r=n?this._getMinWidthOfShrinkableControl(t):0,s=t.getVisible(),l;if(t.isA("sap.m.ToolbarSpacer")){l=parseInt(t.$().css("width"));r=t.getWidth()&&l?l:0;o=T._getOptimalWidthOfShrinkableControl(t,r)}else if(n&&r>0&&s){o=T._getOptimalWidthOfShrinkableControl(t,r)}else{o=s?T._getControlWidth(t):0}if(o===null){o=typeof e!=="undefined"?e:0}return o};T.prototype._getMinWidthOfShrinkableControl=function(t){var e=t.$().css("min-width"),o=parseInt(e),i=r.isRelativeWidth(e);if(i){return o*this.$().width()/100}else{return o}};T.prototype._getControlPriority=function(t){var e,o,i,n;if(t.length){return t._priority}e=t.getMetadata().getInterfaces().indexOf("sap.m.IOverflowToolbarContent")>-1;n=e&&t.getOverflowToolbarConfig().getCustomImportance;if(e&&typeof n==="function"){return n()}o=t.getLayoutData&&t.getLayoutData();if(o&&o instanceof l){if(o.getMoveToOverflow()===false){return O.NeverOverflow}if(o.getStayInOverflow()===true){return O.AlwaysOverflow}i=o.getPriority();if(i===O.Never){return O.NeverOverflow}if(i===O.Always){return O.AlwaysOverflow}return i}return O.High};T._getControlMargins=function(t){return t.$().outerWidth(true)-t.$().outerWidth()};T._getOptimalWidthOfShrinkableControl=function(t,e){return e+T._getControlMargins(t)};T._getControlWidth=function(t){var e=t&&t.getDomRef();if(e&&t.$().is(":visible")){return Math.round(e.getBoundingClientRect().width+T._getControlMargins(t))}return null};T._getControlGroup=function(t){var e=t.getLayoutData();if(e instanceof l){return e.getGroup()}};T._oPriorityOrder=function(){var t={};t[O.Disappear]=1;t[O.Low]=2;t["Medium"]=3;t[O.High]=4;return t}();T.prototype._detireminePopoverVerticalOffset=function(){return this.$().parents().hasClass("sapUiSizeCompact")?2:3};T.prototype._recalculateOverflowButtonSize=function(){var t=this._getOverflowButtonClone().$(),e;if(!this._getOverflowButtonSize()&&t.width()>0){e=t.outerWidth(true);this._iOverflowToolbarButtonSize=e?e:0}};T.prototype.onThemeChanged=function(){this._resetAndInvalidateToolbar();this._iOverflowToolbarButtonSize=0;this._recalculateOverflowButtonSize();for(var t in this._aControlSizes){if(this._aControlSizes.hasOwnProperty(t)){this._aControlSizes[t]=0}}};T.prototype.closeOverflow=function(){this._getPopover().close()};return T});