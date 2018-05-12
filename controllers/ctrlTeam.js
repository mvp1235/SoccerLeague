var connection = require('../mysql').connection;

module.exports = {
    get_newteam : function(req, res) {
        res.render('newteam', {
            "title": 'Add New Team'
        });
    },
    
    get_editteam : function(req, res) {
        const team_id = parseInt(req.params.teamid);
        
        connection.query(
        "SELECT * FROM team WHERE TeamID = ?", [team_id]
        , function(err, results, fields) {
            if (err) {
                console.log(err);
                return res.send("Error accessing database");
            } else if (results.length === 0) {
                return res.send("No team with given ID exists in the database.");
            } else {
                res.render('editteam', 
                {
                    "title": 'Edit Team: ' + results[0].TeamName,
                    "teamid": results[0].TeamID,
                    "teamname": results[0].TeamName,
                    "teamcity": results[0].City,
                    "leagueid": results[0].LeagueID
                });
            }
        });
        
    },
    
    get_deleteteam : function(req, res) {
        const team_id = parseInt(req.params.teamid);
        
        connection.query(
        "SELECT * FROM team WHERE TeamID = ?", [team_id]
        , function(err, results, fields) {
            if (err) {
                console.log(err);
                return res.send("Error accessing database");
            } else if (results.length === 0) {
                return res.send("No team with given ID exists in the database");
            } else  {
                res.render('deleteteam',
                {
                    "title": "Delete Team " + results[0].TeamName,
                    "teamname": results[0].TeamName,
                    "teamid": results[0].TeamID
                });
            }
        });
    }
    
}