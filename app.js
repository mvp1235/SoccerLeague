var express = require('express');
var bodyParser = require('body-parser');
var ctrlMain = require('./controllers/ctrlMain');
var modelMain = require('./models/modelMain');
var path = require('path');
var logger = require('morgan');
var methodOverride = require('method-override');
var app = express();

//applying middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Method override - POST TO PUT
app.use(methodOverride('_method'))

//View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/', ctrlMain.home);

///PLAYERS

//GET NEW PLAYER PAGE
app.get('/players/new', ctrlMain.get_newplayer);
//GET EDIT PLAYER PAGE
app.get('/players/:playerid/edit', ctrlMain.get_editplayer);
//ADD NEW PLAYER POST REQUEST
app.post('/players', modelMain.post_addplayer);
//UPDATE PLAYER PUT REQUEST
app.put('/players/:playerid', modelMain.updatePlayerByID);
app.delete('/players/:playerid', modelMain.deletePlayerByID);
//GET ALL PLAYERS
app.get('/players', modelMain.getPlayers);
//GET PLAYER BY ID
app.get('/players/:playerid', modelMain.showPlayerByID);


app.get('/teams', modelMain.getTeams);
app.get('/teams/:teamid', modelMain.showTeamByID);
app.get('/leagues', modelMain.getLeagues);
app.get('/leagues/:leagueid', modelMain.showLeagueByID);


app.listen(3000, function() {
   console.log("Listening to the port 3000..."); 
});