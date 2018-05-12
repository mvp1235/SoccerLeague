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
            
            res.render('leaguelist', {rows: results});
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
            
            res.render('leaguedetail', {rows: results});
        });
    },
    
    post_addleague : function(req, res) {
        var requestData = req.body;
        
        var leagueName = requestData.leaguename;
        var country = requestData.country;
        
        if (!leagueName || !country) {
            return res.status(400).json({
                code: "leagueCreationFailed",
                message: "League was not added to the database. Please provide all required inputs."
            });
        }
        
        var league = {
            LeagueName: leagueName,
            Country: country
        };
        
        connection.query(
        "INSERT INTO league SET ?", league
        , function(err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    code: "leagueCreationFailed",
                    message: "League was not added to the database."
                });
            }
            
            //Successfully added player and player position
            res.status(200).json({
                code: "leagueCreationSuccess",
                message: leagueName + " was added to the database."
            });
        });
    },
    
    updateLeagueByID : function(req, res) {
        var league_id = req.params.leagueid;
        
        var requestData = req.body;
        
        if (!requestData.leaguename || !requestData.country) {
            return res.status(400).json({
                code: "leagueUpdateFailed",
                message: "League was not updated. Please provide all required inputs."
            });
        }
        
        var league = {
            LeagueName: requestData.leaguename,
            Country: requestData.country
        };
        
        //Update league database
        connection.query(
        "UPDATE league SET ? WHERE LeagueID = ?", [league, league_id]
        , function(err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    code: "leagueUpdateFailed",
                    message: "League was not updated on the database."
                });
            }
            
            //Successfully updated league
            return res.status(200).json({
                code: "leagueUpdateSuccess",
                message: "League with ID " + league_id + " was updated on the database."
            });
        });
        
    },
    
    deleteLeagueByID : function(req, res) {
        var league_id = req.params.leagueid;
        
        //Delete League
        connection.query(
        "DELETE FROM league WHERE LeagueID = ?", [league_id]
        , function(err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    code: "leagueDeleteFailure",
                    message: "League with ID " + league_id + " was not deleted from the database"
                });
            }
            
            return res.status(200).json({
                code: "leagueDeleteSuccess",
                message: "League with ID " + league_id + " was deleted from the database"
            });
            
        });
    }
    
}