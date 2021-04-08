const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('subscribe', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    members_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "구독한사람",
      references: {
        model: 'members',
        key: 'id'
      }
    },
    target_members_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "구독당한사람",
      references: {
        model: 'members',
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'subscribe',
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
        name: "FK_subscribe_members_id_members_id",
        using: "BTREE",
        fields: [
          { name: "members_id" },
        ]
      },
      {
        name: "FK_subscribe_target_members_id_members_id",
        using: "BTREE",
        fields: [
          { name: "target_members_id" },
        ]
      },
    ]
  });
};
