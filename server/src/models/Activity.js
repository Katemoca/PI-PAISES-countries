const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
// [NOTAS]
//! id
//  id: {
//   type: DataTypes.INTEGER,
//   primaryKey: true,
//   autoIncrement: true,
//  }

//! duration
// INTEGER: Si la duración se mide en una unidad específica, como minutos o segundos, puedes utilizar el tipo de dato INTEGER. Por ejemplo, si la duración está en minutos, podrías representarla como un número entero.
// TIME: Si la duración es específicamente un valor de tiempo en formato HH:mm:ss, puedes usar el tipo de dato TIME.
// DECIMAL: Si la duración puede incluir fracciones de tiempo, como horas y minutos (por ejemplo, 1.5 horas), podrías utilizar el tipo de dato DECIMAL.

//! difficulty

// dificulty: {
//   type: DataTypes.INTEGER,
//   allowNull: false,
//   validate: {
//       min:1,
//       max:5,
//   },

// difficulty: {
//   type: DataTypes.ENUM("1", "2", "3", "4", "5"),
//   allowNull: false,
// },

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Activity",
    {
      id: {
        type: DataTypes.UUID, // Alfanumérico
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your name",
          },
          len: {
            args: [4, 20],
            msg: "The name must be between 4 and 30 characters",
          },
        },
      },
      difficulty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      duration: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      season: {
        type: DataTypes.ENUM("Summer", "Autumn", "Winter", "Spring"),
        allowNull: false,
      },
    },
    { timestamps: false, freezeTableName: true }
  );
};
