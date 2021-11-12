sap.ui.define(
    [
        "com/devtoberfest/devtoberfest2021FrontendCodingChallenge/controller/BaseController",
        "sap/ui/model/json/JSONModel",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "com/devtoberfest/devtoberfest2021FrontendCodingChallenge/model/formatter",
    ],
    function (Controller, JSONModel, Filter, FilterOperator,  formatter) {
        "use strict";

        return Controller.extend(
            "com.devtoberfest.devtoberfest2021FrontendCodingChallenge.controller.MainView",
            {
                formatter,

                onInit: function () {
                    const useDarkTheme =
                        window.matchMedia &&
                        window.matchMedia("(prefers-color-scheme: dark)")
                            .matches;
                    if (useDarkTheme) {
                        sap.ui.getCore().applyTheme("sap_fiori_3_dark");
                    }
                    const settingsModel = new JSONModel({
                        search: "",
                        lightTheme: !useDarkTheme,
                    });
                    this.getView().setModel(settingsModel, "settings");
                },

                liveSearch: function (oEvent) {
                    const list = this.getView().byId("all-list");
                    const listBinding = list.getBinding("items");

                    // add filter for search
                    var aFilters = [];
                    var sQuery = oEvent.getSource().getValue();
                    if (sQuery && sQuery.length > 0) {
                        aFilters.push(new Filter("name", FilterOperator.Contains, sQuery));
                        aFilters.push(new Filter("description", FilterOperator.Contains, sQuery));
                        aFilters.push(new Filter("category", FilterOperator.Contains, sQuery));

                        listBinding.filter(
                            new Filter({
                                filters: aFilters,
                                and: false,
                            })
                        );
                    }
                    else{
                        listBinding.filter([]);
                    }

                },

                onToggleTheme: function (oEvent) {
                    const lightTheme = oEvent.getParameter("state");
                    sap.ui
                        .getCore()
                        .applyTheme(
                            lightTheme ? "sap_fiori_3" : "sap_fiori_3_dark"
                        );
                },
            }
        );
    }
);
