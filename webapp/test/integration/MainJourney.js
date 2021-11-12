sap.ui.define(["sap/ui/test/opaQunit"], function (opaTest) {
    "use strict";

    opaTest("Should see the product list", function (Given, When, Then) {
        // Arrangements
        Given.iStartMyApp();

        // Assertions
        Then.onTheMainPage.iShouldSeeTheTitle();

        // Assertions
        Then.onTheMainPage.iShouldSeeSomeListItems();

        // Cleanup
        Then.iTeardownMyApp();
    });
});
