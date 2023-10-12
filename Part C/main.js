const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/';

//making the request
fetch(url).then(async (response) => 
{
  var deck_obj = await response.json();
  var cards_req = await fetch( 'https://deckofcardsapi.com/api/deck/' + deck_obj.deck_id + '/draw/?count=5' );
  var cards_obj = await cards_req.json();
  var images = "";
  console.log(cards_obj.cards);

  // image tags
  for (var i = 0; i < cards_obj.cards.length; i++)
  {
    images += "<img src='" + cards_obj.cards[i].image + "'/>";
  }
      
  document.querySelector("body").innerHTML = images + "<br>" + "<span>" + highest_poker_hand(cards_obj.cards) + "</span>";
});

function highest_poker_hand(cards)
{
    var card_ids = sort_cards(cards);
    console.log(card_ids);

    // if the deck is royal flush
    if(is_same_suite(cards) && "A".includes(card_ids) && "K".includes(card_ids) && "Q".includes(card_ids) && "J".includes(card_ids) && "10".includes(card_ids))
      return "Royal flush";

    // if the deck is straight flush
    if(is_same_suite(cards) && card_ids[1] == card_ids[0] + 1 && card_ids[2] == card_ids[1] + 1 && card_ids[3] == card_ids[2] + 1 && card_ids[4] == card_ids[3] + 1)
      return "Straight flush";

    // if the deck is four of a kind
    for (let i=0;i<2;i++) if ( card_ids[i] == card_ids[i+1] && card_ids[i+1] == card_ids[i+2] && card_ids[i+2] == card_ids[i+3]) return 'Four of a Kind';

    // if the deck is full house
    if ((card_ids[0] == card_ids[1] && card_ids[1] == card_ids[2] && card_ids[3] == card_ids[4]) || (card_ids[0] == card_ids[1] && card_ids[2] == card_ids[3] && card_ids[3] == card_ids[4])) return 'Full House';

    // if the deck is flush
    if(is_same_suite(cards))
      return "Flush";

    // if the deck is straight
    if(card_ids[1] == card_ids[0] + 1 && card_ids[2] == card_ids[1] + 1 && card_ids[3] == card_ids[2] + 1 && card_ids[4] == card_ids[3] + 1)
      return "Straight";

    // if the deck is three of a kind
    for (let i=0;i<3;i++) if (card_ids[i] == card_ids[i+1] && card_ids[i+1] == card_ids[i+2]) return 'Three of a Kind';

    // if the deck is two pair
    if ((card_ids[0] == card_ids[1] && card_ids[2] == card_ids[3]) || (card_ids[0] == card_ids[1] && card_ids[3] == card_ids[4]) || (card_ids[1] == card_ids[2] && card_ids[3] == card_ids[4])) 
      return 'Two Pair';

    // if the deck is pair
    for(var i=0;i<4;i++) if(card_ids[i] == card_ids[i+1]) return "Pair";

    // if none of above
    return "High card";


}

function is_same_suite(cards)
{
  var first_card_suite = cards[0].code.split("")[1]; 

  for (var i = 1; i < cards.length; i++)
  {
    if (cards[i].code.split("")[1] != first_card_suite)
    {
      return false;
    }
  }

  return true;
}


function sort_cards(cards)
{
  var card_ids = cards.map(x=>x.code.split("")[0]);
  var ranks = 
  {
    "A": 14,
    "K": 13,
    "Q": 12,
    "J": 11
  }

  card_ids = card_ids.map(x=>
  {
    if(Number.isInteger(parseInt(x)))
    {
      return parseInt(x);
    }
    return x;
  });

  card_ids.sort((a, b) =>
  {
    if (ranks[a] && ranks[b])
    {
      return ranks[a] - ranks[b];
    }

    else if (ranks[a])
    {
      return ranks[a] - b;
    }

    else if (ranks[b])
    {
      return a - ranks[b];
    }

    else return a - b;
  });

  return card_ids;
}