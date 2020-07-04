const Lorem = () => {
  const init = async () => {
    const wordCount = await getWordCount();
    console.log("init", wordCount);
  };

  const getWordCount = () => {
    return new Promise((resolve) =>
      browser.storage.local.get("wordCount", (res) => resolve(res.wordCount))
    );
  };

  init();
};

window.onload = Lorem();
