function getPopupElement(id) {
  const classes = {
    SaveButton: ".lorem__button--save",
    WordCountInput: ".lorem__input--word-length",
    KeyCodeTriggerInput: ".lorem__input--keycode-trigger",
    SavedMessage: ".lorem__saved-message",
  };

  return document.querySelector(classes[id]);
}

export default getPopupElement;
