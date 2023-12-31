const isValidUuid = (id) => {
  const uuidRegex =
    /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/;
  return uuidRegex.test(id);
};

module.exports = { isValidUuid };
