/* global QUnit */

QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
    "use strict";

    sap.ui.require(
        ["com/devtoberfest/devtoberfest2021FrontendCodingChallenge/test/integration/AllJourneys"],
        function () {
            QUnit.start();
        }
    );
});
