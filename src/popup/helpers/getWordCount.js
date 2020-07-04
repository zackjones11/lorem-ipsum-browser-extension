function getWordCount() {
  return new Promise((resolve) =>
    browser.storage.local.get("wordCount", (res) => resolve(res.wordCount))
  );
}

export default getWordCount;
