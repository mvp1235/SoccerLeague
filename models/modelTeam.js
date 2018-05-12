var connection = require('../mysql').connection;

module.exports = {
    getTeams : function(req, res) {
        connection.query(
            "SELECT TeamID, TeamName, City, league.LeagueID, LeagueName " +
            "FROM team, league " +
            "WHERE team.LeagueID = league.LeagueID " + 
            "ORDER BY TeamID"
            , function(err, results, fields) {
            if (err) {
               console.log(err);
               return res.status(500).json({
                   code: "teamsNotFound",
                   message: "Error occured while getting teams from database."
               });
            } 
                
            res.render('teamlist', {rows: results});
        });
    },
    
    showTeamByID : function(req, res) {
        const team_id = parseInt(req.params.teamid);
        connection.query(
            "SELECT TeamID, TeamName, City, league.LeagueID, LeagueName " +
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
            
            res.render('teamdetail', {rows: results});
        });
    },
    
    post_addteam : function(req, res) {
        var requestData = req.body;
        
        var teamName = requestData.teamname;
        var teamCity = requestData.teamcity;
        var leagueID = requestData.leagueid;
        
        if (!teamName || !teamCity || !leagueID) {
            return res.status(400).json({
                code: "teamCreationFailed",
                message: "Team was not added to the database. Please provide all required inputs."
            });
        }
        
        var team = {
            TeamName: teamName,
            City: teamCity,
            LeagueID: leagueID
        };
        
        connection.query(
        "INSERT INTO team SET ?", team
        , function(err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    code: "teanCreationFailed",
                    message: "Team was not added to the database."
                });
            }
            
            //Successfully added team to the database
            res.status(200).json({
                code: "teamCreationSuccess",
                message: teamName + " was added to the database." 
            });
            
        });
    },
    
    updateTeamByID : function(req, res) {
        var team_id = req.params.teamid;
        
        if (!req.body.teamname || !req.body.teamcity || !req.body.leagueid) {
            return res.status(400).json({
                code: "teamUpdateFailed",
                message: "Team was not updated. Please provide all required inputs."
            });
        }
        
        var team = {
            TeamName: req.body.teamname,
            City: req.body.teamcity,
            LeagueID: req.body.leagueid
        };
        
        //Update team database
        connection.query(
        "UPDATE team SET ? WHERE TeamID = ?", [team, team_id]
        , function(err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    code: "teamUpdateFailed",
                    message: "Team was not updated on the database."
                });
            }
            
            //Successully updated team
            return res.status(200).json({
                code: "teamUpdateSuccess",
                message: "Team with ID " + team_id + " was updated on the database."
            });
        });
        
    },
    
    deleteTeamByID : function(req, res) {
        var team_id = req.params.teamid;
        
        //Delete team
        connection.query(
        "DELETE FROM team WHERE TeamID = ?", [team_id]
        , function(err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    code: "teamDeleteFailure",
                    message: "Team with id " + team_id + " was not deleted from the database."
                });
            }
            
            return res.status(200).json({
                code: "teamDeleteSuccess",
                message: "Team with ID " + team_id + " was deleted from the database."
            });
        });
    }
}