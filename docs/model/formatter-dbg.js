sap.ui.define([], function () {
    "use strict";
    return {
        translateState: function (state) {
            if (!state) {
                return "";
            }
            const resourceBundle = this.getView()
                .getModel("i18n")
                .getResourceBundle();
            return resourceBundle.getText(state);
        },
    };
});
