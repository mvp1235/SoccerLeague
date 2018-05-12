var connection = require('../mysql').connection;

module.exports = {
    get_newleague : function(req, res) {
        res.render('newleague', {
            "title": 'Add New League'
        });
    },
    
    get_editleague : function(req, res) {
        const league_id = parseInt(req.params.leagueid);
        
        connection.query(
        "SELECT * FROM league WHERE LeagueID = ?", [league_id]
        , function(err, results, fields) {
            if (err) {
                console.log(err);
                return res.send("Error accessing database");
            } else if (results.length === 0) {
                return res.send("No league with given ID exists in the database.");
            } else {
                res.render('editleague',
                {
                    "title" : 'Edit League: ' + results[0].LeagueName,
                    "leagueid": results[0].LeagueID,
                    "leaguename" : results[0].LeagueName,
                    "country" : results[0].Country,
                });
            }
        });
        
    },
    
    get_deleteleague : function(req, res) {
        const league_id = parseInt(req.params.leagueid);
        
        connection.query(
        "SELECT * FROM league WHERE LeagueID = ?", [league_id]
        , function(err, results, fields) {
            if (err) {
                console.log(err);
                return res.send("Error accessing database");
            } else if (results.length === 0) {
                return res.send("No league with given ID exists in the database");
            } else {
                res.render('deleteleague', 
                {
                    "title" : "Delete League " + results[0].LeagueName,
                    "leaguename" : results[0].LeagueName,
                    "leagueid" : results[0].LeagueID
                });
            }
        });
    }
}