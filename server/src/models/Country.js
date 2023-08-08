const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Country",
    {
      id: {
        type: DataTypes.STRING(3),
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
          isIn: {
            args: [["en", "es"]],
            msg: "Must be English or Spanish",
          },
        },
      },
      flags: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      continents: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
        },
      },
      capital: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subregion: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isAlpha: true,
          isNull: {
            msg: "subregion was not found",
          },
        },
      },
      area: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isNull: {
            msg: "area was not found",
          },
        },
      },
      population: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false, freezeTableName: true }
  );
};
