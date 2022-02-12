const generateColumnIdentifiers = (columns = []) => {
  if (columns.length == 0) {
    return "*";
  } else {
    let columnIdentifiers = "";
    for (let i = 0; i < columns.length; i++) {
      if (i == columns.length - 1) {
        columnIdentifiers += "%I";
      } else {
        columnIdentifiers += "%I,";
      }
    }
  }
};

module.exports = {
  generateColumnIdentifiers,
};
