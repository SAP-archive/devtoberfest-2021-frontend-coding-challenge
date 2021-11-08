sap.ui.require(["sap/ui/test/Opa5"], function (Opa5) {
    "use strict";

    var sViewName = "com.devtoberfest.devtoberfest2021FrontendCodingChallenge.view.MainView";

    Opa5.createPageObjects({
        onTheMainPage: {
            viewName: sViewName,

            assertions: {
                // add assertion functions here
                iShouldSeeTheTitle: function () {
                    return this.waitFor({
                        controlType: "sap.m.Text",
                        properties: {
                            text: "Devtoberfest 2021 - Frontend Coding Challenge",
                        },
                        success: function () {
                            Opa5.assert.ok(true, "The page shows the correct title");
                        },
                        errorMessage:
                            "App does not show the expected title Devtoberfest 2021 - Frontend Coding Challenge",
                    });
                },

                iShouldSeeSomeListItems: function () {
                    return this.waitFor({
                        id: "all-list",
                        success: function (oList) {
                            Opa5.assert.ok(
                                oList.getItems().length >= 20,
                                "The list did contain " + oList.getItems().length + " products"
                            );
                        },
                        errorMessage: "The list doesn't contain enough items.",
                    });
                },
            },
        },
    });
});
