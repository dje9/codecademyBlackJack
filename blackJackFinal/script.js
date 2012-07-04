	
var Card = function(suit, number) {
  var _suit = suit;
  var _number = number;

  this.getNumber = function() {
    return _number;
  };

  this.getSuit = function() {
    return _suit;
  };

  this.getCardName = function() {
    var suits = ["clubs", "diamonds", "hearts", "spades"];
    var ranks = ["A",2,3,4,5,6,7,8,9,10,"J","Q","K"];
    return ranks[_number - 1] + " of " + suits[_suit - 1];
  };

  this.getValue = function() {
    if (_number === 1) {
      return 11;
    }
    else if (_number > 9) {
      return 10;
    }
    else {
      return _number;
    }
  };
};

var Deck = function() {
  var _suit, _rank;
  var _cards = [];

  for (_suit = 1; _suit <= 4; _suit++) {
    for (_rank = 1; _rank <= 13; _rank++) {  // ranks
      _cards.push(new Card(_suit, _rank));
    }
  }

  this.shuffle = function() {
    return _cards.sort(function() { return 0.5 - Math.random(); });
  };

  this.deal = function() {
    return _cards.pop();
  };
};

var deck = new Deck();
deck.shuffle();

var Hand = function() {
  var _cards = [deck.deal(), deck.deal()];
  var _sum;

  this.getHand = function() {
    return _cards;
  };

  this.score = function() {
    var i, val, aces;
    _sum = aces = 0;
    for (i = 0; i < _cards.length; i++) {
      val = _cards[i].getValue();
      if (val === 11) {
        aces += 1;
      }
      _sum += val;
    }

    while (_sum > 21 && aces > 0) {
      aces -= 1;
      _sum -= 10;
    }

    return _sum;
  };

  this.printHand = function() {
    var i;
    var output = [];

    for (i = 0; i < _cards.length; i++) {
      output.push(_cards[i].getCardName());
    }

    return output.join(", ");							//changed \n to <br>
  };


  this.hitMe = function() {
    _cards.push(deck.deal());
  };
};

//playAsDealer() function added

var playAsDealer = function() {
  var _hand = new Hand();
  while (_hand.score() < 17) {
    _hand.hitMe();
  }
  return _hand;
};

//playAsUser() function added

var playAsUser = function(dealer) {
  var _hand  = new Hand();
  var _hitMe = true;

  while (_hitMe) {
	
    _hitMe = confirm(_hand.printHand() + "\n\nHit me?");
    if (_hitMe) _hand.hitMe();
  }
  return _hand;
};

// declareWinner() function added

var declareWinner = function(userHand, dealerHand) {
  var userScore   = userHand.score();
  var dealerScore = dealerHand.score();

  if (userScore > 21) {
    if (dealerScore > 21) {
      return "You tied!";
    }
    else {
      return "You lose!";
    }
  }

  if (dealerScore > 21) {
    return "You win!";
  }
  else {
    if (userScore > dealerScore) {
      return "You win!";
    }
    else if (userScore === dealerScore) {
      return "You tied!";
    }
    else {
      return "You lose!";
    }
  }
};


//playGame() function added

var playGame = function() {
  document.getElementById("playGame").innerHTML= "";
  
  var dealer = playAsDealer();
  var user = playAsUser();
  
  document.getElementById("myCards").innerHTML= "My hand: <br>" + user.printHand();
  document.getElementById("myScore").innerHTML= "<span>User score: "+ user.score() +"</span>";
  document.getElementById("yourCards").innerHTML= "Dealer hand: <br>" + dealer.printHand();
  document.getElementById("yourScore").innerHTML= "<span>Dealer score: "+ dealer.score() +"</span>";

  document.getElementById("result").innerHTML= declareWinner(user, dealer);

  document.getElementById("playAgain").innerHTML= "<button onclick='playGame()'>Play Again</button>";

  return false;
};
	
	
