var deck;

function submitPlayers(form){
	var players = [];
	players[0] = form.player1.value;
	players[1] = form.player2.value;
	players[2] = form.player3.value;
	players[3] = form.player4.value;
	return players;
}
function startGame(){
	var json = $.getJSON("http://ajstorch.com/suicide/json/gamedata.json");
	deck = json.deck; 
}

/*
var deck = [];

function getData(){
	return $.getJSON('http://ajstorch.com/suicide/json/gamedata.json');
}

getData().done(function(json){
	$.each(json, function(key, value){
    	deck[key] = {Category:val.Category};
    });
});

document.write(deck);
*/
	