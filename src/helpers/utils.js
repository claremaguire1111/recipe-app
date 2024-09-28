export const truncateText = (text, numWords = 20) => {
    const words = text.split(" ");
    if (words.length <= numWords) {
      return text;
    }
    return words.slice(0, numWords).join(" ") + "...";
  };
  