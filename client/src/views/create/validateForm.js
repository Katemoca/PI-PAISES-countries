export const validate = (form) => {
  const newErrors = {
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  };

  if (form.name === "") {
    newErrors.name = "name cannot be empty";
    console.log("Name error:", newErrors.name);
  } else if (form.name.length > 30 || form.name.length < 4) {
    newErrors.name =
      "The name of the activity must have between 4 and 30 characters";
    console.log("Name error:", newErrors.name);
  } else if (
    /\d/.test(form.name) ||
    !/^\s*[a-zA-Z0-9,\s]+\s*$/.test(form.name)
  ) {
    newErrors.name = "The name cannot contain any number or special characters";
    console.log("Name error:", newErrors.name);
  } else {
    newErrors.name = "";
  }

  if (form.difficulty === "") {
    newErrors.difficulty = "difficulty level is required";
    console.log("Difficulty error:", newErrors.difficulty);
  } else {
    newErrors.difficulty = ""; // Esto ayuda a que el disableButton funcione
  }

  if (form.duration === "") {
    newErrors.duration = "duration cannot be empty";
    console.log("Duration error:", newErrors.duration);
  } else if (
    isNaN(form.duration) ||
    parseFloat(form.duration) <= 0 ||
    form.duration.length > 1
  ) {
    newErrors.duration = "duration must be a positive single-digit number";
    console.log("Duration error:", newErrors.duration);
  } else {
    newErrors.duration = "";
  }

  if (form.season === "") {
    newErrors.season = "season is required";
    console.log("Season error:", newErrors.season);
  } else {
    newErrors.season = "";
  }

  if (Array.isArray(form.countries) && form.countries.length === 0) {
    newErrors.countries = "Write one country";
    console.log("Countries error:", newErrors.countries);
  } else {
    newErrors.countries = "";
  }

  return newErrors;
};
