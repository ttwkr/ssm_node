const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('writing_word_aggergation', {
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
    total_writing_count: {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "전체글감"
    },
    public_writing_count: {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "공개글감"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'writing_word_aggergation',
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
        name: "FK_writing_word_aggergation_words_id_words_id",
        using: "BTREE",
        fields: [
          { name: "words_id" },
        ]
      },
    ]
  });
};
