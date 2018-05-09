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
            , function(err, result, fields) {
                if (err) {
                    return res.send(err);
                    return res.send("Error accessing database");
                } else if (result.length === 0) {
                    return res.send("No player with given ID exists in the database.");
                } else {
                    res.render('editplayer',
                    {
                        "title" : 'Edit Player ' + result.FullName,
                        "playerid" : result.PlayerID,
                        "firstname" : result.FirstName,
                        "lastname" : result.LastName,
                        "nickname" : result.NickName,
                        "number" : result.Number,
                        "position" : result.Position,
                        "teamid" : result.TeamID
                    });
                }
            });
    }
    
}