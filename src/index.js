const Lorem = () => {
  const init = async () => {
    browser.runtime.onMessage.addListener(
      ({ wordCount }) => wordCount && onWordCountChanged({ wordCount })
    );

    addKeyEventsToInputs();
  };

  const addKeyEventsToInputs = () => {
    const inputs = document.querySelectorAll("input, textarea");
    inputs.forEach((input) =>
      input.addEventListener("keyup", (event) => onKeyPress(event))
    );

    return inputs;
  };

  const onKeyPress = (event) => {
    console.log("key pressed in input", event);
  };

  const onWordCountChanged = ({ wordCount }) => {
    console.log("wordCount", wordCount);
  };

  init();
};

window.onload = Lorem();
