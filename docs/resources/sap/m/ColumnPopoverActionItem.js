/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ColumnPopoverItem","sap/m/Button"],function(t,e){"use strict";var n=t.extend("sap.m.ColumnPopoverActionItem",{library:"sap.m",metadata:{properties:{icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},text:{type:"string",group:"Misc",defaultValue:null}},events:{press:{}}}});n.prototype._createButton=function(t,n){return new e(t,{icon:this.getIcon(),type:"Transparent",tooltip:this.getText(),visible:this.getVisible(),press:[function(t){if(n._oShownCustomContent){n._oShownCustomContent.setVisible(false);n._oShownCustomContent=null;n._cleanSelection(this)}this.firePress()},this]})};return n});