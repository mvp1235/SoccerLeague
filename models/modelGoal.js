var analyticalConnection = require('../mysql').analyticalConnection;

module.exports = {
    getGoalPerPlayer : function(req, res) {
        analyticalConnection.query(
            "SELECT l.LeagueID, l.LeagueName, t.TeamID, t.TeamName, p.PlayerID, CONCAT(p.PlayerFirstName, ' ', p.PlayerLastName) PlayerName, COUNT(*) Goals " +
            "FROM goalsbyplayerbymatch g, league l, match_details m, player p, team t " +
            "WHERE g.LeagueKey = l.LeagueKey AND g.MatchKey = m.MatchKey AND g.PlayerKey = p.PlayerKey AND g.TeamKey = t.TeamKey " +
            "GROUP BY PlayerName " +
            "ORDER BY LeagueName, TeamName, PlayerName DESC"
        , function(err, results, fields) {
            if (err) {
               console.log(err);
               return res.status(500).json({
                   code: "goalsNotFound",
                   message: "Error occured while getting goals from database."
               });
            }
            res.render('goalperplayer', { rows: results });
        });
    },
    
    getGoalDetails : function(req, res) {
        analyticalConnection.query(
            "SELECT g.GID, l.LeagueID, l.LeagueName, t.TeamID, t.TeamName, p.PlayerID, CONCAT(p.PlayerFirstName, ' ', p.PlayerLastName) PlayerName, m.MatchDate, g.MinuteScored, g.SecondScored " +
            "FROM goalsbyplayerbymatch g, league l, match_details m, player p, team t " +
            "WHERE g.LeagueKey = l.LeagueKey AND g.MatchKey = m.MatchKey AND g.PlayerKey = p.PlayerKey AND g.TeamKey = t.TeamKey"
        , function(err, results, fields) {
            if (err) {
               console.log(err);
               return res.status(500).json({
                   code: "leaguesNotFound",
                   message: "Error occured while getting leagues from database."
               });
            }
            res.render('goaldetails', { rows: results });
        });
    },
    
    getGoalPerTeam : function(req, res) {
        analyticalConnection.query(
            "SELECT l.LeagueID, l.LeagueName, t.TeamID, t.TeamName, COUNT(*) Goals " +
            "FROM goalsbyplayerbymatch g, league l, match_details m, player p, team t " +
            "WHERE g.LeagueKey = l.LeagueKey AND g.MatchKey = m.MatchKey AND g.PlayerKey = p.PlayerKey AND g.TeamKey = t.TeamKey " +
            "GROUP BY TeamName " +
            "ORDER BY LeagueName, TeamName DESC"
        , function(err, results, fields) {
            if (err) {
               console.log(err);
               return res.status(500).json({
                   code: "goalsNotFound",
                   message: "Error occured while getting goals from database."
               });
            }
            res.render('goalperteam', { rows: results });
        });
    },
    
}