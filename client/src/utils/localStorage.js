// Function to get an array of saved card IDs from local storage
export const getSavedCardIds = () => {
  const savedCardIds = localStorage.getItem('saved_cards')
    ? JSON.parse(localStorage.getItem('saved_cards'))
    : [];

  return savedCardIds;
};

// Function to save an array of card IDs to local storage
export const saveCardIds = (cardIdArr) => {
  if (cardIdArr.length) {
    localStorage.setItem('saved_cards', JSON.stringify(cardIdArr));
  } else {
    localStorage.removeItem('saved_cards');
  }
};

// Function to remove a specific card ID from the saved cards in local storage
export const removeCardId = (cardId) => {
  const savedCardIds = localStorage.getItem('saved_cards')
    ? JSON.parse(localStorage.getItem('saved_cards'))
    : null;

  if (!savedCardIds) {
    return false;
  }

  const updatedSavedCardIds = savedCardIds?.filter((savedCardId) => savedCardId !== cardId);
  localStorage.setItem('saved_cards', JSON.stringify(updatedSavedCardIds));

  return true;
};
