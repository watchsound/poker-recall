export default function sortPokerCards(cards) {
  // Define the order for card values and suits
  const valuesOrder = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A","SB", "HR"];
  const suitsOrder = ["D", "C", "H", "S"];

  // Create a map for quick lookup of the order
  const valueMap = new Map(valuesOrder.map((value, index) => [value, index]));
  const suitMap = new Map(suitsOrder.map((suit, index) => [suit, index]));

  // Helper function to extract value and suit from a card
  function getValue(card) {
    return valueMap.has(card.slice(0, -1)) ? card.slice(0, -1) : card;
  }

  function getSuit(card) {
    return suitMap.has(card.slice(-1)) ? card.slice(-1) : "";
  }

  // Sort the cards
  cards.sort((a, b) => {
    const aValue = getValue(a);
    const bValue = getValue(b);

    // Compare values
    if (valueMap.get(aValue) !== valueMap.get(bValue)) {
      return -(valueMap.get(aValue) - valueMap.get(bValue));
    }

    // If values are the same, compare suits
    const aSuit = getSuit(a);
    const bSuit = getSuit(b);
    return -(suitMap.get(aSuit) - suitMap.get(bSuit));
  });

  return cards;
}

// // Example usage:
// const pokerCards = ["10C", "JD", "QH", "KS", "HR", "SB"];
// const sortedCards = sortPokerCards(pokerCards);
// console.log(sortedCards); // Output: ["10C", "JD", "QH", "KS", "HR", "SB"]
