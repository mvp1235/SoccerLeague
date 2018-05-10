var connection = require('../mysql').connection;

module.exports = {
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
    
    post_addleague : function(req, res) {
        
    },
    
    updateLeagueByID : function(req, res) {
        
    },
    
    deleteLeagueByID : function(req, res) {
        
    }
    
}