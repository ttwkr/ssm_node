const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('writings_like', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    members_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'members',
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
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'writings_like',
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
        name: "FK_writings_like_members_id_members_id",
        using: "BTREE",
        fields: [
          { name: "members_id" },
        ]
      },
      {
        name: "FK_writings_like_writings_id_writings_id",
        using: "BTREE",
        fields: [
          { name: "writings_id" },
        ]
      },
    ]
  });
};
