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
    }
    
}