/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'PubgTeamPage.Application',

    name: 'PubgTeamPage',

    requires: [
        // This will automatically load all classes in the PubgTeamPage namespace
        // so that application classes do not need to require each other.
        'PubgTeamPage.*'
    ],

    // The name of the initial view to create.
    mainView: 'PubgTeamPage.view.main.Main'
});
