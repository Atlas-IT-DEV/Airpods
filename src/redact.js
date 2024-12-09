const redact = (text) => {
  let result = [];
  text
    .trim()
    .replace(/(?:\r\n|\r|\n)/g, "<br />")
    .split("<br />")
    .map(function (item, index) {
      result.push(
        <span key={index}>
          {item}
          <br />
        </span>
      );
    });
  return result;
};

export default redact;
