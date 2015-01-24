//global variables
//array containing player names
var players = [];
//array with 1-54 to be used to id "cards"
var deck = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52];
//variable to hold card that is being used
var currentCard = 0;
//arrays to hold what cards are in a players hand
var p1hand = [];
var p2hand = [];
var p3hand = [];
var p4hand = [];
var hands = [p1hand,p2hand,p3hand,p4hand];
//will be used to determine who is up
var turn = 0;
//will be used to dertmine which round of the game it is
var round = 0;
//code to hide html content until it is needed later in the game
$(document).ready(function(){
	$("#round1").hide();
	$("#round2").hide();
	$("#round3").hide();
	$("#round4").hide();
	$("#hands").hide();
});

//functions to be called during the game

//stores the values submitted into the players array, then hides the player form and displays the html where players hands will be stored, begins round1
function submitPlayers(form){
	players[0] = form.player1.value;
	players[1] = form.player2.value;
	players[2] = form.player3.value;
	players[3] = form.player4.value;
	$(document).ready(function(){
		$(".players").hide();
		$("#hands").show();
		$("#round1").show();
		setPlayer(players[turn]);
	});
}

//brings up html for round1, player is the name of the player who is up
function setPlayer(player){
	//update html to show whos turn it is
	$(document).ready(function(){
		$(".whosTurn").replaceWith("It's "+player+ " turn!");
	});
}

//Function that uses Fisher-Yates algorithm to "shuffle the deck"
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

//function used to determine which card has been drawn based on the integer taken from the deck array
function idCard(card){
	//card mod 4 to get suit 1 heart 2 diamond 3 spade 0 club
	var suit = card % 4;
	var number = Math.floor(card / 4);
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

/*this function will run if button 'a' is pressed during round 1.
it: pops from the deck, compares the card versus option 'a', displays the instructions to the player,
places the card in the players "hand", advances to the next players turn, and if that was the last player
for that round, it will move to the next round.*/
function submitRoundOneA(){
	currentCard = deck.pop();
	var cardAsString = idCard(currentCard);
	//see if players guess is correct
	var suit = currentCard % 4;
	if (suit === 1 || suit === 2){
		//TODO create equation to determine the amount of drinks to assign
		$(".instructions").replaceWith("Assign Drinks!");
	} else {
		$(".instructions").replaceWith("Take Drinks!");
	}
	//put card in players hand
	hands[turn].push(cardAsString);
	//move to next players turn
	turn++;
	if (turn === 4){
		//TODO is it possible to but some sort of pause here?
		//hide current round and show next
		$("#round1").hide();
		$("#round2").show();
		//reset turns
		turn = 0;
		round++;
	}
	setPlayer(players[turn]);
}
/*this function will run if button 'b' is pressed during round 1.
it: pops from the deck, compares the card versus option 'b', displays the instructions to the player,
places the card in the players "hand", advances to the next players turn, and if that was the last player
for that round, it will move to the next round.*/
function submitRoundOneB(){
	currentCard = deck.pop();
	var cardAsString = idCard(currentCard);
	//see if players guess is correct
	var suit = currentCard % 4;
	if (suit === 0 || suit === 3){
		//TODO create functions to give drinks as number
		$(".insturctions").replaceWith("Assign Drinks!");
	} else {
		$(".insturctions").replaceWith("Take Drinks!");
	}
	//put card in players hand
	hands[turn].push(cardAsString);
	//move to next players turn
	turn++;
	//check to see if that was the last player for that round
	if (turn === 4){
		//hide current round and show next
		//TODO pause?
		$("#round1").hide();
		$("#round2").show();
		//reset turn
		turn = 0;
		round++;
	}
	setPlayer(players[turn]);
}

function submitRoundTwoA(){
	currentCard = deck.pop();
	var cardAsString = idCard(currentCard);
	//see if players guess is correct
	var currentPlayerHand = hands[turn];
	var firstCard = currentPlayerHand[0];
	//correct if currentCard is higher
	var fCardNumber = Math.floor(firstCard/4);
	var curCardNumber = Math.floor(currentCard/4);
	if(fCardNumber<curCardNumber){
		//win
		$(".instructions").replaceWith("Assign Drinks!");
	}else{
		//loss
		$(".instructions").replaceWith("Take Drinks!");
	}
	hands[turn].push(cardAsString);
	turn++;
	if (turn ===4){
		$("#round2").hide();
		$("#round3").show();
		turn = 0;
		round++;
	}
}

function submitRoundTwoB(){
	currentCard = deck.pop();
	var cardAsString = idCard(currentCard);
	//see if players guess is correct
	var currentPlayerHand = hands[turn];
	var firstCard = currentPlayerHand[0];
	//correct if currentCard is higher
	var fCardNumber = Math.floor(firstCard/4);
	var curCardNumber = Math.floor(currentCard/4);
	if(fCardNumber<curCardNumber){
		//win
		$(".instructions").replaceWith("Take Drinks!");
	}else{
		//loss
		$(".instructions").replaceWith("Assign Drinks!");
	}
	hands[turn].push(cardAsString);
	turn++;
	if (turn ===4){
		$("#round2").hide();
		$("#round3").show();
		turn = 0;
		round++;
	}
}

//this function is used to update the players hands
function updateHands(){
	//TODO write a function to update the players hands in html (probably $var.append())
	$(document).ready(function(){
		$("#p1hand").append("<li>" + p1hand + "</li>");
		$("#p2hand").append("<li>" + p2hand + "</li>");
		$("#p3hand").append("<li>" + p3hand + "</li>");
		$("#p4hand").append("<li>" + p4hand + "</li>");
	});
}

//begin main program under this line

//shuffle the deck using fisher-yates
shuffleArray(deck);
//TODO write function to get player response using buttons
//TODO write function that compares user guess to actual card

//set up p1 round 1
setPlayer(players[turn]);



	
