module.exports = {
    get_newleague : function(req, res) {
        
    },
    
    get_editleague : function(req, res) {
        const league_id = parseInt(req.params.leagueid);
    },
    
    get_deleteleague : function(req, res) {
        const league_id = parseInt(req.params.leagueid);
    }
}