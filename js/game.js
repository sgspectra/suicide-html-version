//global variables
//array containing player names
var players = [];
//array with 1-54 to be used to id "cards"
var deck = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51];
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
		if(player.charAt(player.length-1) === "s"){
			$(".whosTurn").text("It's "+player+"' turn!");
		}else{
			$(".whosTurn").text("It's "+player+ "'s turn!");
		}
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
	var number = Math.floor(card / 4) + 2;
	var suitString = "";
	if (suit === 1){
		suitString = "Hearts";
	} else if (suit === 2){
		suitString = "Diamonds";
	} else if (suit === 3){
		suitString = "Spades";
	} else {
		suitString = "Clubs";
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
		$(".instructions").text("Give Drinks!");
	} else {
		$(".instructions").text("Take Drinks!");
	}
	//put card in players hand
	hands[turn].push(currentCard);
	updateHands();
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
		$(".instructions").text("Give Drinks!");
	} else {
		$(".instructions").text("Take Drinks!");
	}
	//put card in players hand
	hands[turn].push(currentCard);
	updateHands();
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
		$(".instructions").text("Give Drinks!");
	}else{
		//loss
		$(".instructions").text("Take Drinks!");
	}
	hands[turn].push(currentCard);
	updateHands();
	turn++;
	if (turn ===4){
		$("#round2").hide();
		$("#round3").show();
		turn = 0;
		round++;
	}
	setPlayer(players[turn]);
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
		//loss
		$(".instructions").text("Take Drinks!");
	}else{
		//win
		$(".instructions").text("Give Drinks!");
	}
	hands[turn].push(currentCard);
	updateHands();
	turn++;
	if (turn ===4){
		$("#round2").hide();
		$("#round3").show();
		turn = 0;
		round++;
	}
	setPlayer(players[turn]);
}

function submitRoundThreeA(){
	currentCard = deck.pop();
	var currentPlayerHand = hands[turn];
	var cardOneNumber = Math.floor(currentPlayerHand[0]);
	var cardTwoNumber = Math.floor(currentPlayerHand[1]);
	var currentCardNumber = Math.floor(currentCard);
	var cardAsString = idCard(currentCard);
	if (cardOneNumber<cardTwoNumber){
		//inside
		if (currentCardNumber>cardOneNumber && currentCardNumber<cardTwoNumber){
			//win
			$(".instructions").text("Give Drinks!");
		} else{
			//loss
			$(".instructions").text("Take Drinks!");
		}
	} else if (cardOneNumber>cardTwoNumber){
		//inside
		if (currentCardNumber<cardOneNumber && currentCardNumber>cardTwoNumber){
			//win
			$(".instructions").text("Give Drinks!");
		} else{
			//loss
			$(".instructions").text("Take Drinks!");
		}
	} else {
		//loss
		$(".instructions").text("Take Drinks!");
	}
	//add card to player hand
	hands[turn].push(currentCard);
	updateHands();
	//increment turn
	turn++;
	//determine if next round or not
	if (turn === 4){
		$("#round3").hide();
		$("#round4").show();
		turn = 0;
		round++;
	}
	setPlayer(players[turn]);
}

function submitRoundThreeB(){
	currentCard = deck.pop();
	var currentPlayerHand = hands[turn];
	var cardOneNumber = Math.floor(currentPlayerHand[0]);
	var cardTwoNumber = Math.floor(currentPlayerHand[1]);
	var currentCardNumber = Math.floor(currentCard);
	var cardAsString = idCard(currentCard);
	if (cardOneNumber<cardTwoNumber){
		//outside
		if (currentCardNumber<cardOneNumber && currentCardNumber>cardTwoNumber){
			//win
			$(".instructions").text("Give Drinks!");
		} else{
			//loss
			$(".instructions").text("Take Drinks!");
		}
	} else if (cardOneNumber>cardTwoNumber){
		//outside
		if (currentCardNumber>cardOneNumber && currentCardNumber<cardTwoNumber){
			//win
			$(".instructions").text("Give Drinks!");
		} else{
			//loss
			$(".instructions").text("Take Drinks!");
		}
	} else {
		//loss
		$(".instructions").text("Take Drinks!");
	}
	//add card to player hand
	hands[turn].push(currentCard);
	updateHands();
	//increment turn
	turn++;
	//determine if next round or not
	if (turn === 4){
		$("#round3").hide();
		$("#round4").show();
		turn = 0;
		round++;
	}
	setPlayer(players[turn])
}

function submitRoundFourA(){
	currentCard = deck.pop();
	var cardAsString = idCard(currentCard);
	//if hearts win
	if (currentCard % 4 === 1){
		$(".instructions").text("Give Drinks!");
	} else {
		$(".instructions").text("Take Drinks!");
	}
	hands[turn].push(currentCard);
	updateHands();
	turn++;
	if(turn === 4){
		$("#round4").hide();
		$("#roundH").show();
	}
	setPlayer(players[turn]);
}

function submitRoundFourB(){
	currentCard = deck.pop();
	var cardAsString = idCard(currentCard);
	//if diamonds win
	if (currentCard % 4 === 2){
		$(".instructions").text("Give Drinks!");
	} else {
		$(".instructions").text("Take Drinks!");
	}
	hands[turn].push(currentCard);
	updateHands();
	turn++;
	if(turn === 4){
		$("#round4").hide();
		$("#roundH").show();
	}
	setPlayer(players[turn]);
}

function submitRoundFourC(){
	currentCard = deck.pop();
	var cardAsString = idCard(currentCard);
	//if clubs win
	if (currentCard % 4 === 0){
		$(".instructions").text("Give Drinks!");
	} else {
		$(".instructions").text("Take Drinks!");
	}
	hands[turn].push(currentCard);
	updateHands();
	turn++;
	if(turn === 4){
		$("#round4").hide();
		$("#roundH").show();
	}
	setPlayer(players[turn]);
}

function submitRoundFourD(){
	currentCard = deck.pop();
	var cardAsString = idCard(currentCard);
	//if spades win
	if (currentCard % 4 === 3){
		$(".instructions").text("Give Drinks!");
	} else {
		$(".instructions").text("Take Drinks!");
	}
	hands[turn].push(currentCard);
	updateHands();
	turn++;
	if(turn === 4){
		$("#round4").hide();
		$("#roundH").show();
	}
	setPlayer(players[turn]);
}

//this function is used to update the players hands
function updateHands(){
	$(document).ready(function(){
		if(turn === 0){
		$("#p1hand").append("<img src=\"cards/"+p1hand[round]+".png\" width=\"30\" height=\"50\"/>");
	}else if(turn === 1){
		$("#p2hand").append("<img src=\"cards/"+p2hand[round]+".png\" width=\"30\" height=\"50\"/>");
	}else if(turn === 2){
		$("#p3hand").append("<img src=\"cards/"+p3hand[round]+".png\" width=\"30\" height=\"50\"/>");
	}else{
		$("#p4hand").append("<img src=\"cards/"+p4hand[round]+".png\" width=\"30\" height=\"50\"/>");
	}
	});
}

//function to draw a new card for the "H" portion of the game
function drawGiveTake(){
	
}

//shuffle the deck using fisher-yates
shuffleArray(deck);




	
