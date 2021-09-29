sap.ui.define(
    [
        "com/devtoberfest/devtoberfest2021FrontendCodingChallenge/controller/BaseController",
        "sap/ui/model/json/JSONModel",
        "com/devtoberfest/devtoberfest2021FrontendCodingChallenge/model/formatter",
    ],
    function (Controller, JSONModel, formatter) {
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
                    const value = oEvent.getParameter("newValue");
                    const list = this.getView().byId("all-list");
                    const listBinding = list.getBinding("items");
                    const nameFilter = new sap.ui.model.Filter({
                        path: "name",
                        operator: sap.ui.model.FilterOperator.Contains,
                        value1: value,
                    });
                    const descFilter = new sap.ui.model.Filter({
                        path: "description",
                        operator: sap.ui.model.FilterOperator.Contains,
                        value1: value,
                    });
                    const stateFilter = new sap.ui.model.Filter({
                        path: "state",
                        operator: sap.ui.model.FilterOperator.Contains,
                        value1: value,
                    });
                    listBinding.filter(
                        new sap.ui.model.Filter({
                            filters: [nameFilter, descFilter, stateFilter],
                            and: false,
                        })
                    );
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
