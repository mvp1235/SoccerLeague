var connection = require('../mysql').connection;

module.exports = {
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
    
    post_addteam : function(req, res) {
        
    },
    
    updateTeamByID : function(req, res) {
        var team_id = req.params.teamid;
        
    },
    
    deleteTeamByID : function(req, res) {
        var team_id = req.params.teamid;
        
    }
}