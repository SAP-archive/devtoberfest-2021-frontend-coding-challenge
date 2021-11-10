sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/UIComponent",
    ],
    function (Controller,  UIComponent) {
        "use strict";

        return Controller.extend(
            "com.devtoberfest.devtoberfest2021FrontendCodingChallenge.controller.BaseController",
            {
                /**
                 * Convenience method for getting the view model by name in every controller of the application.
                 * @public
                 * @param {string} sName the model name
                 * @returns {sap.ui.model.Model} the model instance
                 */
                getModel: function (sName) {
                    return this.getView().getModel(sName);
                },

                /**
                 * Convenience method for setting the view model in every controller of the application.
                 * @public
                 * @param {sap.ui.model.Model} oModel the model instance
                 * @param {string} sName the model name
                 * @returns {sap.ui.mvc.View} the view instance
                 */
                setModel: function (oModel, sName) {
                    return this.getView().setModel(oModel, sName);
                },

            }
        );
    }
);
