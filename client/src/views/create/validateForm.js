export const validate = (input) => {
  const newErrors = {
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  };

  if (input.name === "") {
    newErrors.name = "name cannot be empty";
  } else if (input.name.length > 30 || input.name.length < 4) {
    newErrors.name =
      "The name of the activity must have between 4 and 30 characters";
  } else if (
    /\d/.test(input.name) ||
    !/^\s*[a-zA-Z0-9,\s]+\s*$/.test(input.name)
  ) {
    newErrors.name = "The name cannot contain any number or special characters";
  }

  if (input.difficulty === "") {
    newErrors.difficulty = "difficulty level is required";
  }

  if (input.duration === "") {
    newErrors.duration = "duration cannot be empty";
  } else if (
    isNaN(input.duration) ||
    parseFloat(input.duration) <= 0 ||
    input.duration.length > 1
  ) {
    newErrors.duration = "duration must be a positive single digit number";
  }

  if (input.season === "") {
    newErrors.season = "season is required";
  }

  if (Array.isArray(input.countries) && input.countries.length === "") {
    newErrors.countries = "Write one country";
  }

  return newErrors;
};
