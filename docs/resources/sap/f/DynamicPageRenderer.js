/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device"],function(e){"use strict";var t={apiVersion:2};t.render=function(a,n){var o=n.getTitle(),r=n.getHeader(),s=n.getFooter(),i=n.getContent(),l=n.getHeaderExpanded(),c=r?r.getContent():[],d=c.length>0,p=n.getShowFooter(),g=n._preserveHeaderStateOnScroll(),F=g||n._bHeaderInTitleArea,f=n.getLandmarkInfo(),C=n._getHeaderTag(f),m=n._getFooterTag(f);a.openStart("article",n);a.class("sapFDynamicPage");if(n.getToggleHeaderOnTitleClick()){a.class("sapFDynamicPageTitleClickEnabled")}a.attr("aria-roledescription",n._getAriaRoleDescription());a.accessibilityState(n,n._formatLandmarkInfo(f,"Root"));a.openEnd();if(e.system.desktop){a.renderControl(n._getScrollBar())}a.openStart(C,n.getId()+"-header");a.class("sapContrastPlus");a.class("sapFDynamicPageTitleWrapper");if(!l){a.class(e.system.phone&&o&&o.getSnappedTitleOnMobile()?"sapFDynamicPageTitleSnappedTitleOnMobile":"sapFDynamicPageTitleSnapped")}if(!d){a.class("sapFDynamicPageTitleOnly")}a.accessibilityState(n,n._formatLandmarkInfo(f,"Header"));a.attr("data-sap-ui-customfastnavgroup",true);a.openEnd();a.renderControl(o);a.openStart("div",n.getId()+"-stickyPlaceholder");a.openEnd();if(F){a.renderControl(r)}a.close("div");a.close(C);a.openStart("div",n.getId()+"-contentWrapper");a.class("sapFDynamicPageContentWrapper");if(n.getBackgroundDesign()){a.class("sapFDynamicPageContentWrapper"+n.getBackgroundDesign())}a.openEnd();if(!F){a.renderControl(r)}a.openStart("div",n.getId()+"-content");a.class("sapFDynamicPageContent");a.accessibilityState(n,n._formatLandmarkInfo(f,"Content"));a.openEnd();a.openStart("div",n.getId()+"-contentFitContainer");if(n.getFitContent()){a.class("sapFDynamicPageContentFitContainer")}if(s&&p){a.class("sapFDynamicPageContentFitContainerFooterVisible")}a.openEnd();a.renderControl(i);a.close("div");a.close("div");a.close("div");t.renderFooter(a,n,s,p,m,f);a.close("article")};t.renderFooter=function(e,t,a,n,o,r){if(a){e.openStart(o,t.getId()+"-footerWrapper");e.class("sapContrast").class("sapContrastPlus").class("sapFDynamicPageFooter").class("sapMFooter-CTX");if(!n){e.class("sapUiHidden")}e.accessibilityState(t,t._formatLandmarkInfo(r,"Footer"));e.openEnd();a.addStyleClass("sapFDynamicPageActualFooterControl");e.renderControl(a);e.close(o)}};return t},true);