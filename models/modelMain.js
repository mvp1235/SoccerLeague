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
    },
    
    post_addplayer : function(req, res) {
        var requestData = req.body;

        var firstName = requestData.firstname;
        var lastName = requestData.lastname;
        var nickname = requestData.nickname;
        var number = requestData.number;
        var teamID = req.body.teamid;
        
        if (!firstName || !lastName || !number || !teamID ) {
            return res.status(400).json({
                code: "playerCreationFailed",
                message: "Player was not added to the database. Please provide all required inputs."
            });
        }
        
        var player = {
            FirstName: firstName,
            LastName: lastName,
            Nickname: nickname,
            Number: number,
            TeamID: teamID
        };
        
        connection.query(
            "INSERT INTO player SET ?", player
            , function(err, results, fields) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        code: "playerCreationFailed",
                        message: "Player was not added to the database."
                    });
                }
                
                //The next ID which was given to the newly created player
                var insertID = results.insertId;
                var playerPosition = req.body.position;
                
                var position = {
                    Position: playerPosition,
                    PlayerID: insertID
                };
                
                
                
                connection.query(
                    "INSERT INTO player_position SET ?", position
                    , function(err, results, fields) {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({
                                code: "positionCreationFailed",
                                message: "Position was not added to the database."
                            });
                        }
                        
                        //Successfully added player and player position
                        return res.status(500).json({
                            code: "playerCreationSuccess",
                            message: requestData.firstname + " " + requestData.lastname + " was added to the database."
                        });
                    });
            });
    },
    
    post_editplayer : function(req, res) {
        var requestData = req.body;
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    

    
}