module.exports = {
    get_newteam : function(req, res) {
        
    },
    
    get_editteam : function(req, res) {
        const team_id = parseInt(req.params.teamid);
    },
    
    get_deleteteam : function(req, res) {
        const team_id = parseInt(req.params.teamid);
    }
    
}