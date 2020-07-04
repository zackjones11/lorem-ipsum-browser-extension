import getPopupElement from "./getPopupElement.js";

const DEFAULT_WORD_COUNT = 50;
const LoremPopup = () => {
  const init = async () => {
    const wordCount = await getWordCount();

    sendData({ wordCount: wordCount || DEFAULT_WORD_COUNT });

    const saveButton = getPopupElement("SaveButton");
    saveButton.addEventListener("click", saveClicked);
  };

  const getWordCount = () => {
    return new Promise((resolve) =>
      browser.storage.local.get("wordCount", ({ wordCount }) =>
        resolve(wordCount)
      )
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

    sendData(data);
    showSavedMessage();
  };

  const sendData = (data) => {
    const queryOptions = { active: true, currentWindow: true };

    browser.tabs.query(queryOptions, (tabs) => {
      browser.storage.local.set(data, () => {
        storageUpdated(tabs, data);
        handleDataChange(data);
      });
    });
  };

  const storageUpdated = (tabs, data) => {
    for (let tab of tabs) {
      browser.tabs.sendMessage(tab.id, data).catch((error) => {
        throw error;
      });
    }
  };

  const handleDataChange = ({ wordCount }) => {
    console.log("wordCount", wordCount);
    const inputElement = getPopupElement("WordCountInput");
    inputElement.value = wordCount;
  };

  const showSavedMessage = () => {
    const successMessage = getPopupElement("SavedMessage");
    successMessage.classList.add("is-visible");
  };

  init();
};

window.onload = LoremPopup();
