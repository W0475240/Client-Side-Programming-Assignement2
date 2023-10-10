const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/';



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