sap.ui.define(
    [
        "sap/ui/core/Core",
        // avoid library preloads as we don't need the entire lib
        "sap/ui/core/library",
        "sap/m/library", 
        "sap/ui/layout/library",
        "sap/ui/unified/library",
        "sap/f/library",
        "sap/tnt/library",
    ],
    async (Core) => {
        // preload the library resources bundles async
        // which happens automatically for library preload
        await Promise.all([
            Core.getLibraryResourceBundle("sap.ui.core", true),
            Core.getLibraryResourceBundle("sap.m", true),
            Core.getLibraryResourceBundle("sap.ui.layout", true),
            Core.getLibraryResourceBundle("sap.ui.unified", true),
            Core.getLibraryResourceBundle("sap.ui.f", true),
            Core.getLibraryResourceBundle("sap.tnt", true),
        ])
        // boot the Core:
        //   - loads the Component-bundle defined in data-sap-ui-modules
        //   - using the ComponentSupport in sap-ui-onInit to load the declared component
        Core.boot()
    }
)
