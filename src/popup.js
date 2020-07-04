import getPopupElement from "./helpers/getPopupElement.js";

const LoremPopup = () => {
  const init = async () => {
    const wordCount = await getWordCount();

    if (wordCount) {
      const inputElement = getPopupElement("WordCountInput");
      inputElement.value = wordCount;
    }

    const saveButton = getPopupElement("SaveButton");
    saveButton.addEventListener("click", saveClicked);
  };

  const getWordCount = () => {
    return new Promise((resolve) =>
      browser.storage.local.get("wordCount", (res) => resolve(res.wordCount))
    );
  };

  const saveClicked = () => {
    const { value } = getPopupElement("WordCountInput");
    const data = {
      wordCount: parseInt(value),
    };

    if (isNaN(data.wordCount)) {
      throw "Popup - Word Count is not a number";
    }

    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      sendData(tabs, data);
    });

    showSavedMessage();
  };

  const sendData = (tabs, data) => {
    browser.storage.local.set(data, () => storageUpdated(tabs, data));
  };

  const storageUpdated = (tabs, data) => {
    for (let tab of tabs) {
      browser.tabs.sendMessage(tab.id, data).catch((error) => {
        throw error;
      });
    }
  };

  const showSavedMessage = () => {
    const successMessage = getPopupElement("SavedMessage");
    successMessage.classList.add("is-visible");
  };

  init();
};

window.onload = LoremPopup();
