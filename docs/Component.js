sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","com/devtoberfest/devtoberfest2021FrontendCodingChallenge/model/models"],function(e,t,o){"use strict";return e.extend("com.devtoberfest.devtoberfest2021FrontendCodingChallenge.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(o.createDeviceModel(),"device")}})});