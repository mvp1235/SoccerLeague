var connection = require('../mysql').connection;

module.exports = {
    home : function(req, res) {
        res.render('index', {
            "title": 'Soccer League' 
        });
    },
    
    get_newplayer : function(req, res) {
        res.render('newplayer', {
            "title": 'Add New Player' 
        });
    },
    
    get_editplayer : function(req, res) {
        
        const player_id = parseInt(req.params.playerid);
        connection.query(
            "SELECT p.PlayerID, FirstName, LastName, NickName, Number, Position, t.TeamID " + 
                "FROM player as p, team as t, player_position as pp " + 
                "WHERE p.TeamID = t.TeamID AND p.PlayerID = pp.PlayerID AND p.PlayerID = ?", [player_id]
            , function(err, results, fields) {
                if (err) {
                    return res.send(err);
                    return res.send("Error accessing database");
                } else if (results.length === 0) {
                    return res.send("No player with given ID exists in the database.");
                } else {
                    res.render('editplayer',
                    {
                        "title" : 'Edit Player: ' + results[0].FirstName + ' ' + results[0].LastName,
                        "playerid" : results[0].PlayerID,
                        "firstname" : results[0].FirstName,
                        "lastname" : results[0].LastName,
                        "nickname" : results[0].NickName,
                        "number" : results[0].Number,
                        "position" : results[0].Position,
                        "teamid" : results[0].TeamID
                    });
                }
            });
    }
    
}