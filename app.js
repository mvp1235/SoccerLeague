var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var logger = require('morgan');
var methodOverride = require('method-override');
var app = express();

//GET CONTROLLERS AND MODELS
var ctrlMain = require('./controllers/ctrlMain');
var ctrlPlayer = require('./controllers/ctrlPlayer');
var modelPlayer = require('./models/modelPlayer');
var ctrlTeam = require('./controllers/ctrlTeam');
var modelTeam = require('./models/modelTeam');
var ctrlLeague = require('./controllers/ctrlLeague');
var modelLeague = require('./models/modelLeague');
var ctrlGoal = require('./controllers/ctrlGoal');
var modelGoal = require('./models/modelGoal');

//applying middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Method override - POST TO PUT (for updating)
app.use(methodOverride('_method'))

//View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//GET THE HOME PAGE
app.get('/', ctrlMain.home);

///PLAYERS///
//GET NEW PLAYER PAGE
app.get('/players/new', ctrlPlayer.get_newplayer);
//GET EDIT PLAYER PAGE
app.get('/players/:playerid/edit', ctrlPlayer.get_editplayer);
//ADD NEW PLAYER POST REQUEST
app.post('/players', modelPlayer.post_addplayer);
//UPDATE PLAYER PUT REQUEST
app.put('/players/:playerid', modelPlayer.updatePlayerByID);
//DELETE PLAYER BY ID
app.delete('/players/:playerid', modelPlayer.deletePlayerByID);
//GET ALL PLAYERS
app.get('/players', modelPlayer.getPlayers);
//GET PLAYER BY ID
app.get('/players/:playerid', modelPlayer.showPlayerByID);

///TEAMS///
//GET NEW TEAM PAGE
app.get('/teams/new', ctrlTeam.get_newteam);
//GET EDIT TEAM PAGE
app.get('/teams/:teamid/edit', ctrlTeam.get_editteam);
//ADD NEW TEAM POST REQUEST
app.post('/teams', modelTeam.post_addteam);
//UPDATE TEAM PUT REQUEST
app.put('/teams/:teamid', modelTeam.updateTeamByID);
//DELETE TEAM BY ID
app.delete('/teams/:teamid', modelTeam.deleteTeamByID);
//GET ALL TEAMS
app.get('/teams', modelTeam.getTeams);
//GET TEAM BY ID
app.get('/teams/:teamid', modelTeam.showTeamByID);


//LEAGUES///
//GET NEW LEAGUE PAGE
app.get('/leagues/new', ctrlLeague.get_newleague);
//GET EDIT LEAGUE PAGE
app.get('/leagues/:leagueid/edit', ctrlLeague.get_editleague);
//ADD NEW LEAGUE POST REQUEST
app.post('/leagues', modelLeague.post_addleague);
//UPDATE LEAGUE PUT REQUEST
app.put('/leagues/:leagueid', modelLeague.updateLeagueByID);
//DELETE LEAGUE BY ID
app.delete('/leagues/:leagueid', modelLeague.deleteLeagueByID);
//GET ALL LEAGUES
app.get('/leagues', modelLeague.getLeagues);
//GET LEAGUE BY ID
app.get('/leagues/:leagueid', modelLeague.showLeagueByID);


//GOALS///
//GET NEW GOAL PAGE
app.get('/goals/new', ctrlGoal.get_newgoal);
//GET EDIT GOAL PAGE
app.get('/goals/:goalid/edit', ctrlGoal.get_editgoal);
//ADD NEW GOAL POST REQUEST
app.post('/goals', modelGoal.post_addgoal);
//UPDATE GOAL PUT REQUEST
app.put('/goals/:goalid', modelGoal.updateGoalByID);
//DELETE GOAL BY ID
app.delete('/goals/:goalid', modelGoal.deleteGoalByID);
//GET ALL LEAGUES
app.get('/goals', modelGoal.getGoals);
//GET LEAGUE BY ID
app.get('/goals/:goalid', modelGoal.showGoalByID);


app.listen(3000, function() {
   console.log("Listening to the port 3000..."); 
});