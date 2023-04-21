function castBN(arr) {
  if (Array.isArray(arr)) {
    return arr.map((e) => e.toString());
  }

  return arr.toString();
}

module.exports = {
  castBN,
};
