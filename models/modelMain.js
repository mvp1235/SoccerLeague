var connection = require('../mysql').connection;

module.exports = {
    
    getPlayers : function(req, res) {
        connection.query(
            "SELECT PlayerID, CONCAT(FirstName, ' ', LastName) FullName, Number, TeamName " + 
                "FROM player, team " + 
                "WHERE player.TeamID = team.TeamID"
            , function(err, results, fields) {
            if (err) {
               console.log(err);
               return res.status(500).json({
                   code: "playersNotFound",
                   message: "Error occured while getting players from database."
               });
            } 
            return res.status(200).json({
                code: "playersFound",
                data: results
            });
        });
    },
    
    showPlayerByID : function(req, res) {
        const player_id = parseInt(req.params.playerid);
        connection.query(
            "SELECT p.PlayerID, CONCAT(FirstName, ' ', LastName) FullName, NickName, Number, Position, TeamName " + 
                "FROM player as p, team as t, player_position as pp " + 
                "WHERE p.TeamID = t.TeamID AND p.PlayerID = pp.PlayerID AND p.PlayerID = ?", [player_id]
            , function(err, results, fields) {
            if (err) {
               console.log(err);
               return res.status(500).json({
                   code: "playerNotFound",
                   message: "Error occured while getting the player from database."
               });
            } 
            if (results.length === 0) {
                return res.status(404).json({ 
                    code: "playerNotFound",
                    message: "No player with given ID existed."
                });
            }
            return res.status(200).json({
                code: "playerFound",
                data: results
            });
        });
    },
    
    getTeams : function(req, res) {
        connection.query(
            "SELECT TeamID, TeamName, City, LeagueName " +
            "FROM team, league " +
            "WHERE team.LeagueID = league.LeagueID"
            , function(err, results, fields) {
            if (err) {
               console.log(err);
               return res.status(500).json({
                   code: "teamsNotFound",
                   message: "Error occured while getting teams from database."
               });
            } 
            return res.status(200).json({
                code: "teamsFound",
                data: results
            });
        });
    },
    
    showTeamByID : function(req, res) {
        const team_id = parseInt(req.params.teamid);
        connection.query(
            "SELECT TeamID, TeamName, City, LeagueName " +
            "FROM team, league " +
            "WHERE team.LeagueID = league.LeagueID AND TeamID = ?",[team_id]
            , function(err, results, fields) {
            if (err) {
               console.log(err);
               return res.status(500).json({
                   code: "teamNotFound",
                   message: "Error occured while getting the team from database."
               });
            } 
            if (results.length === 0) {
                return res.status(404).json({ 
                    code: "teamNotFound",
                    message: "No team with given ID existed."
                });
            }
            return res.status(200).json({
                code: "teamFound",
                data: results
            });
        });
    },
    
    getLeagues : function(req, res) {
        connection.query(
            "SELECT * FROM league"
            , function(err, results, fields) {
            if (err) {
               console.log(err);
               return res.status(500).json({
                   code: "leaguesNotFound",
                   message: "Error occured while getting leagues from database."
               });
            } 
            return res.status(200).json({
                code: "leaguesFound",
                data: results
            });
        });
    },
    
    showLeagueByID : function(req, res) {
        const league_id = parseInt(req.params.leagueid);
        connection.query(
            "SELECT * FROM league WHERE LeagueID = ?",[league_id]
            , function(err, results, fields) {
            if (err) {
               console.log(err);
               return res.status(500).json({
                   code: "leagueNotFound",
                   message: "Error occured while getting the league from database."
               });
            } 
            if (results.length === 0) {
                return res.status(404).json({ 
                    code: "leagueNotFound",
                    message: "No league with given ID existed."
                });
            }
            return res.status(200).json({
                code: "leagueFound",
                data: results
            });
        });
    }
    
}