const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('writing_word', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    words_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'words',
        key: 'id'
      }
    },
    writings_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'writings',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'writing_word',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "FK_writing_word_words_id_words_id",
        using: "BTREE",
        fields: [
          { name: "words_id" },
        ]
      },
      {
        name: "FK_writing_word_writings_id_writings_id",
        using: "BTREE",
        fields: [
          { name: "writings_id" },
        ]
      },
    ]
  });
};
