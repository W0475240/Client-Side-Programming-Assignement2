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