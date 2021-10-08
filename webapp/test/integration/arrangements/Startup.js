sap.ui.define(["sap/ui/test/Opa5"], function (Opa5) {
    "use strict";

    return Opa5.extend(
        "com.devtoberfest.devtoberfest2021FrontendCodingChallenge.test.integration.arrangements.Startup",
        {
            iStartMyApp: function () {
                this.iStartMyUIComponent({
                    componentConfig: {
                        name: "com.devtoberfest.devtoberfest2021FrontendCodingChallenge",
                        async: false,
                        manifest: true,
                    },
                });
            },
        }
    );
});
