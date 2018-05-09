var express = require('express');
var bodyParser = require('body-parser');
var ctrlMain = require('./controllers/ctrlMain');
var modelMain = require('./models/modelMain');
var path = require('path');
var logger = require('morgan');
var app = express();

//applying middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/', ctrlMain.home);

app.get('/newplayer', ctrlMain.get_newplayer)
app.post('/newplayer', modelMain.post_addplayer)

app.get('/players', modelMain.getPlayers);
app.get('/players/:playerid', modelMain.showPlayerByID);
app.get('/teams', modelMain.getTeams);
app.get('/teams/:teamid', modelMain.showTeamByID);
app.get('/leagues', modelMain.getLeagues);
app.get('/leagues/:leagueid', modelMain.showLeagueByID);


app.listen(3000, function() {
   console.log("Listening to the port 3000..."); 
});