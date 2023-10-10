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