const Lorem = () => {
  const init = async () => {
    addKeyEventsToInputs();
  };

  const addKeyEventsToInputs = () => {
    const inputs = document.querySelectorAll("input, textarea");

    inputs.forEach((input) =>
      input.addEventListener("keyup", (event) => onKeyPress(event))
    );

    return inputs;
  };

  const getWordCount = () => {
    return new Promise((resolve) =>
      browser.storage.local.get("wordCount", ({ wordCount }) =>
        resolve(wordCount)
      )
    );
  };

  const getKeyCodeTrigger = () => {
    return new Promise((resolve) =>
      browser.storage.local.get("keyCodeTrigger", ({ keyCodeTrigger }) =>
        resolve(keyCodeTrigger)
      )
    );
  };

  const onKeyPress = async (event) => {
    const { keyCode, target } = event;
    const keyCodeTrigger = await getKeyCodeTrigger();

    if (keyCode === keyCodeTrigger) {
      const wordCount = await getWordCount();
      const text = createLoremText(wordCount);

      target.value = text;
    }
  };

  const getLoremText = () => {
    return `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Quisque sollicitudin libero ut urna auctor tristique. Maecenas 
    lobortis vestibulum neque ut aliquam. In hac habitasse platea dictumst. 
    Nunc blandit odio consequat venenatis volutpat.  Aenean vel commodo 
    massa, sit amet sagittis libero. Mauris nunc nisl, volutpat et diam eu, 
    pharetra congue nunc. Nam quis odio ac lacus cursus aliquet. Duis eu lacinia diam. 
    Vestibulum tristique, dolor commodo faucibus egestas, nulla nisi aliquam risus, 
    quis dignissim libero nibh et lacus. Praesent sed orci ut purus accumsan finibus. 
    Aliquam ultricies efficitur dolor vel finibus. Phasellus odio massa, 
    tincidunt in feugiat vel, porta a lectus. \n\n`;
  };

  const createLoremText = (wordCount) => {
    const lorem = getLoremText();
    const repeatBy = Math.ceil(wordCount / 100);

    return lorem
      .repeat(repeatBy)
      .trim()
      .split(" ")
      .slice(0, wordCount)
      .join(" ");
  };

  init();
};

window.onload = Lorem();
