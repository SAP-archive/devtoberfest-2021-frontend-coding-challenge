sap.ui.define(
    [
        "sap/ui/core/UIComponent",
        "sap/ui/model/json/JSONModel",
        "com/devtoberfest/devtoberfest2021FrontendCodingChallenge/model/models",
    ],
    function (UIComponent, JSONModel, models) {
        "use strict";

        return UIComponent.extend(
            "com.devtoberfest.devtoberfest2021FrontendCodingChallenge.Component",
            {
                metadata: {
                    manifest: "json",
                },

                /**
                 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
                 * @public
                 * @override
                 */
                init: function () {
                    // call the base component's init function
                    UIComponent.prototype.init.apply(this, arguments);

                    // enable routing
                    this.getRouter().initialize();

                    // set the device model
                    this.setModel(models.createDeviceModel(), "device");

                    // set the settings model
                    const useDarkTheme =
                        window.matchMedia &&
                        window.matchMedia("(prefers-color-scheme: dark)")
                            .matches;

                    const settingsModel = new JSONModel({
                        search: "",
                        lightTheme: !useDarkTheme,
                    });
                    this.setModel(settingsModel, "settings");
                },

                onBeforeRendering: function () {
                    $("#busyIndicator").remove();
                }
            }
        );
    }
);
