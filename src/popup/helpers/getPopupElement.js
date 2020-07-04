function getPopupElement(id) {
  const classes = {
    SaveButton: ".lorem__button--save",
    WordCountInput: ".lorem__input--word-length",
    SavedMessage: ".lorem__saved-message",
  };

  return document.querySelector(classes[id]);
}

export default getPopupElement;
