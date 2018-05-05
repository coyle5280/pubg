/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('PubgTeamPage.view.main.matches.MatchesController', {
    alias: 'controller.matches',
    extend: 'Ext.app.ViewController',
    formatGameMode: (name) => {
        let prettyName
        switch (name) {
            case 'squad-fpp':
                prettyName = 'Squads'
                break;
            case 'duo-fpp':
                prettyName = 'Duo'
                break;
            case 'solo-fpp':
                prettyName = 'Solo'
                break
            default:
                prettyName = 'Unknown'
        }
        return prettyName
    },
    matchSelect: function (DataViewModel, record) {
        let {game_mode, finish, match_id} = record.getData()
        // if (this.matchWindows.length === 4) {
        //     this.matchWindows[0].close()
        //     this.matchWindows.splice(0, 1)
        // }
        let matchWindow = Ext.create({
            matchId: match_id,
            title: `${this.formatGameMode(game_mode)} Finish ${finish}`,
            xtype: 'matchwindow'
        })
        matchWindow.show()
    }
});
