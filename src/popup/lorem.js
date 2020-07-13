import getPopupElement from "./getPopupElement.js";

const DEFAULT_WORD_COUNT = 50;
const DEFAULT_TRIGGER_KEY = 192;
const LoremPopup = () => {
  const init = async () => {
    const wordCount = await getWordCount();
    const keyCodeTrigger = await getKeyCodeTrigger();
    const data = {
      wordCount: wordCount || DEFAULT_WORD_COUNT,
      keyCodeTrigger: keyCodeTrigger || DEFAULT_TRIGGER_KEY,
    };

    sendData(data);

    const saveButton = getPopupElement("SaveButton");
    saveButton.addEventListener("click", saveClicked);
  };

  const getWordCount = async () => {
    const { wordCount } = await browser.storage.local.get("wordCount");
    return wordCount;
  };

  const getKeyCodeTrigger = async () => {
    const { keyCodeTrigger } = await browser.storage.local.get(
      "keyCodeTrigger"
    );
    return keyCodeTrigger;
  };

  const saveClicked = () => {
    const { value: wordCount } = getPopupElement("WordCountInput");
    const { value: keyCodeTrigger } = getPopupElement("KeyCodeTriggerInput");
    const data = {
      wordCount: parseInt(wordCount),
      keyCodeTrigger: parseInt(keyCodeTrigger),
    };

    if (isNaN(data.wordCount)) {
      throw "Popup - Word Count is not a number";
    }

    if (isNaN(data.keyCodeTrigger)) {
      throw "Popup - Word Count is not a number";
    }

    sendData(data);
    showSavedMessage();
  };

  const sendData = async (data) => {
    await browser.storage.local.set(data);
    handleDataChange(data);
  };

  const handleDataChange = ({ wordCount, keyCodeTrigger }) => {
    const wordCountInput = getPopupElement("WordCountInput");
    wordCountInput.value = wordCount;

    const keyCodeTriggerInput = getPopupElement("KeyCodeTriggerInput");
    keyCodeTriggerInput.value = keyCodeTrigger;
  };

  const showSavedMessage = () => {
    const successMessage = getPopupElement("SavedMessage");
    successMessage.classList.add("is-visible");
  };

  init();
};

window.onload = LoremPopup();
