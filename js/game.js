var players = [];
var deck = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52];
var p1hand = [];
var p2hand = [];
var p3hand = [];
var p4hand = [];
//will be used to determine who is up
var turn = 0;
//will be used to dertmine which round of the game it is
var round = 0;
$(document).ready(function(){
	$("#round1").hide();
	$("#round2").hide();
	$("#round3").hide();
	$("#round4").hide();
	$("#hands").hide();
});

function submitPlayers(form){
	players[0] = form.player1.value;
	players[1] = form.player2.value;
	players[2] = form.player3.value;
	players[3] = form.player4.value;
	$(document).ready(function(){
		$("#players").hide();
	});

}

function playerTurn(pHand){
	
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function idCard(card){
	//card mod 4 to get suit 1 heart 2 diamond 3 spade 0 club
	var suit = card % 4;
	var number = card / 4;
	var suitString = "";
	if (suit === 1){
		suitString = "hearts";
	} else if (suit === 2){
		suitString = "diamonds";
	} else if (suit === 3){
		suitString = "spades";
	} else {
		suitString = "clubs";
	}
	var cardName = number+" of "+suitString;
	return cardName;
}

//begin main program under this line
shuffleArray(deck);


/*
function startGame(){
	var json = $.getJSON("http://ajstorch.com/suicide/json/gamedata.json");
	deck = json.deck; 
}
*/

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
	