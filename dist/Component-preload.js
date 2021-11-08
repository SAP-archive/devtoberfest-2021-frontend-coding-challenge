//@ui5-bundle com/devtoberfest/devtoberfests2021FrontendCodingChallenge/Component-preload.js
sap.ui.require.preload({
	"com/devtoberfest/devtoberfests2021FrontendCodingChallenge/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","com/devtoberfest/devtoberfest2021FrontendCodingChallenge/model/models"],function(e,t,o){"use strict";return e.extend("com.devtoberfest.devtoberfest2021FrontendCodingChallenge.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(o.createDeviceModel(),"device")}})});
},
	"com/devtoberfest/devtoberfests2021FrontendCodingChallenge/controller/BaseController.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/routing/History","sap/ui/core/UIComponent","com/devtoberfest/devtoberfest2021FrontendCodingChallenge/model/formatter"],function(e,t,o,n){"use strict";return e.extend("com.devtoberfest.devtoberfest2021FrontendCodingChallenge.controller.BaseController",{formatter:n,getModel:function(e){return this.getView().getModel(e)},setModel:function(e,t){return this.getView().setModel(e,t)},getResourceBundle:function(){return this.getOwnerComponent().getModel("i18n").getResourceBundle()},navTo:function(e,t,o){this.getRouter().navTo(e,t,o)},getRouter:function(){return o.getRouterFor(this)},onNavBack:function(){var e=t.getInstance().getPreviousHash();if(e!==undefined){window.history.back()}else{this.getRouter().navTo("appHome",{},true)}}})});
},
	"com/devtoberfest/devtoberfests2021FrontendCodingChallenge/controller/MainView.controller.js":function(){sap.ui.define(["com/devtoberfest/devtoberfest2021FrontendCodingChallenge/controller/BaseController","sap/ui/model/json/JSONModel","com/devtoberfest/devtoberfest2021FrontendCodingChallenge/model/formatter"],function(e,t,o){"use strict";return e.extend("com.devtoberfest.devtoberfest2021FrontendCodingChallenge.controller.MainView",{formatter:o,onInit:function(){const e=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches;if(e){sap.ui.getCore().applyTheme("sap_fiori_3_dark")}const o=new t({search:"",lightTheme:!e});this.getView().setModel(o,"settings")},liveSearch:function(e){const t=e.getParameter("newValue");const o=this.getView().byId("all-list");const r=o.getBinding("items");const n=new sap.ui.model.Filter({path:"name",operator:sap.ui.model.FilterOperator.Contains,value1:t});const a=new sap.ui.model.Filter({path:"description",operator:sap.ui.model.FilterOperator.Contains,value1:t});const i=new sap.ui.model.Filter({path:"category",operator:sap.ui.model.FilterOperator.Contains,value1:t});r.filter(new sap.ui.model.Filter({filters:[n,a,i],and:false}))},onToggleTheme:function(e){const t=e.getParameter("state");sap.ui.getCore().applyTheme(t?"sap_fiori_3":"sap_fiori_3_dark")}})});
},
	"com/devtoberfest/devtoberfests2021FrontendCodingChallenge/i18n/i18n_en.properties":'title=Devtoberfest 2021 - Frontend Coding Challenge\nappDescription=App Description\ndark=Dark\nlight=Light\nforkMe=Fork me on GitHub\nError=Error\nInformation=Information\nSuccess=Success\nWarning=Warning\nperformanceNote=Please be aware that this application deliberately ignores best practices and therefore has a mediocre loading performance. Visit the GitHub page to learn more about this\nperformanceNoteLink=Devtoberfest 2021 Coding Challenge.\n',
	"com/devtoberfest/devtoberfests2021FrontendCodingChallenge/manifest.json":'{"_version":"1.21.0","sap.app":{"id":"com.devtoberfest.devtoberfests2021FrontendCodingChallenge","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"1.0.0"},"title":"{{title}}","description":"{{appDescription}}","dataSources":{"dataSource":{"uri":"model/sampleData.json","type":"JSON"}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"rootView":{"viewName":"com.devtoberfest.devtoberfest2021FrontendCodingChallenge.view.MainView","type":"XML","id":"idAppControl","async":true},"dependencies":{"minUI5Version":"1.60.0","libs":{"sap.ui.core":{},"sap.m":{},"sap.ui.layout":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"com.devtoberfest.devtoberfest2021FrontendCodingChallenge.i18n.i18n"}},"sample":{"type":"sap.ui.model.json.JSONModel","dataSource":"dataSource"}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","viewPath":"com.devtoberfest.devtoberfest2021FrontendCodingChallenge.view","controlId":"idAppControl","controlAggregation":"pages","async":true},"routes":[{"name":"RouteMainView","pattern":"RouteMainView","target":["TargetMainView"]}],"targets":{"TargetMainView":{"viewType":"XML","viewLevel":1,"viewId":"idAppControl","viewName":"MainView"}}}}}',
	"com/devtoberfest/devtoberfests2021FrontendCodingChallenge/model/formatter.js":function(){sap.ui.define([],function(){"use strict";return{translateState:function(e){if(!e){return""}const t=this.getView().getModel("i18n").getResourceBundle();return t.getText(e)}}});
},
	"com/devtoberfest/devtoberfests2021FrontendCodingChallenge/model/models.js":function(){sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"com/devtoberfest/devtoberfests2021FrontendCodingChallenge/view/MainView.view.xml":'<mvc:View controllerName="com.devtoberfest.devtoberfest2021FrontendCodingChallenge.controller.MainView"\n  displayBlock="true" xmlns="sap.m" xmlns:f="sap.f" xmlns:tnt="sap.tnt" xmlns:core="sap.ui.core"\n  xmlns:mvc="sap.ui.core.mvc"><tnt:ToolPage id="toolPage"><tnt:header><tnt:ToolHeader><Image src="resources/img/favicon.ico"><layoutData><OverflowToolbarLayoutData priority="Disappear" /></layoutData></Image><Text text="{i18n>title}" wrapping="false"><layoutData><OverflowToolbarLayoutData priority="NeverOverflow" /></layoutData></Text><ToolbarSpacer /><Image src="resources/img/github.png" height="50%" press="goToRepo" /><Link text="{i18n>forkMe}" target="_blank"\n          href="https://github.com/SAP-samples/devtoberfest-2021-frontend-coding-challenge"\n          visible="{= ${device>/orientation/landscape} || !${device>/browser/mobile} }" class="sapUiMediumMarginEnd" /><core:Icon id="barDarkIcon" visible="{= ${device>/orientation/landscape} || !${device>/browser/mobile} }"\n          src="sap-icon://energy-saving-lightbulb" color="{= !${settings>/lightTheme} ? \'#f9d001\' : \'\'}"\n          tooltip="{i18n>dark}" /><Switch id="barThemeSwitch" visible="{= ${device>/orientation/landscape} || !${device>/browser/mobile} }"\n          state="{settings>/lightTheme}" customTextOff="{i18n>dark}" customTextOn="{i18n>light}" change="onToggleTheme"\n          tooltip="{= ${settings>/lightTheme} ? ${i18n>dark} : ${i18n>light} }" /><core:Icon id="barLightIcon" visible="{= ${device>/orientation/landscape} || !${device>/browser/mobile} }"\n          src="sap-icon://circle-task-2" color="{= ${settings>/lightTheme} ? \'#f9d001\' : \'\'}" tooltip="{i18n>light}"\n          class="sapUiMediumMarginEnd" /></tnt:ToolHeader></tnt:header><tnt:mainContents><ScrollContainer id="all-page" horizontal="false" vertical="true" height="100%"><List id="all-list" items="{sample>/}"><headerToolbar><OverflowToolbar id="all-list-bar"><Title id="all-bar-info" text="{i18n>SAP BTP Services}" level="H4" /><ToolbarSpacer id="all-bar-spacer" /><SearchField id="all-bar-search" width="60%" placeholder="{i18n>Search for the name or description}"\n                liveChange=".liveSearch" /></OverflowToolbar></headerToolbar><StandardListItem title="{sample>name}" description="{sample>description}" infoState="Information"\n            icon="{sample>icon}" info="{sample>category}" /></List></ScrollContainer></tnt:mainContents></tnt:ToolPage></mvc:View>'
});
