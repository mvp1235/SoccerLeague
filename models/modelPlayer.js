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
    
    post_addplayer : function(req, res) {
        var requestData = req.body;

        var firstName = requestData.firstname;
        var lastName = requestData.lastname;
        var nickname = requestData.nickname;
        var number = requestData.number;
        var teamID = requestData.teamid;
        
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
                        return res.status(200).json({
                            code: "playerCreationSuccess",
                            message: requestData.firstname + " " + requestData.lastname + " was added to the database."
                        });
                    });
            });
    },
    
    updatePlayerByID : function(req, res) {
        var playerid = req.params.playerid;
        
        if (!req.body.firstname || !req.body.lastname || !req.body.number || !req.body.teamid ) {
            return res.status(400).json({
                code: "playerUpdateFailed",
                message: "Player was not updated. Please provide all required inputs."
            });
        }
        
        var player = {
            FirstName : req.body.firstname,
            LastName : req.body.lastname,
            Nickname : req.body.nickname,
            Number : req.body.number,
            TeamID : req.body.teamid
        };
        //Update player database
        connection.query(
            "UPDATE player SET ? WHERE PlayerID = ?", [player, playerid]
            , function(err, results, fields) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        code: "playerUpdateFailed",
                        message: "Player was not updated on the database."
                    });
                }
                

                connection.query(
                    "UPDATE player_position SET Position = ? WHERE PlayerID = ?", [req.body.position, playerid]
                    , function(err, results, fields) {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({
                                code: "positionUpdateFailed",
                                message: "Position was not updated on the database."
                            });
                        }

                        //Successfully updated player and player position
                        return res.status(200).json({
                            code: "playerUpdateSuccess",
                            message: "Player with ID " + playerid + " was updated on the database."
                        });
                    });

                 
            });
                
    },
    
    deletePlayerByID : function(req, res) {
        const playerID = req.params.playerid;
            
        //DELETE position
        connection.query(
        "DELETE FROM player_position WHERE PlayerID = ?", [playerID]
        , function(err, positionResults, fields) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    code: "positionDeleteFailure",
                    message: "Error occured when deleting player position"
                });
            }

            //Delete player
            connection.query(
            "DELETE FROM player WHERE PlayerID = ?", [playerID]
            , function(err, deleteResults, fields) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        code: "playerDeleteFailure",
                        message: "Player with id " + req.params.playerid + " was not deleted from the database"
                    });
                }

                return res.status(200).json({
                    code: "playerDeleteSuccess",
                    message: "Player with id " + req.params.playerid + " was deleted from the database"
                });
            });
        });
        
    }
}