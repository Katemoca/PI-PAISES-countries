const server = require("./src/server");
const { conn } = require("./src/db.js");
const { saveCountriesToDb, fetchCountries } = require("./helpers/index");
const PORT = 3001;

conn
  .sync({ force: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
      // saveCountriesToDb();
      fetchCountries();
    });
  })
  .catch((error) => console.error(error));
