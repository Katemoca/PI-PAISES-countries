// Validation error: Validation isAlpha on name failed:
const cleanCountryName = (name) => {
  return name.replace(/[^A-Za-z]/g, "");
};

// Validation error: Must be English or Spanish:

const isValidContinent = (continent) => {
  return ["English", "Spanish"].includes(continent);
};

//Validation error: Validation isAlpha on subregion failed

const cleanSubregionName = (subregion) => {
  return subregion ? subregion.replace(/[^A-Za-z]/g, "") : "Unknown";
};

module.exports = {
  cleanCountryName,
  isValidContinent,
  cleanSubregionName,
};
