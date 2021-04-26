const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('member_token', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    members_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "멤버",
      references: {
        model: 'members',
        key: 'id'
      }
    },
    scope: {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "범위"
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "토큰(jwt)"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    expired_at: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "만료일"
    }
  }, {
    sequelize,
    tableName: 'member_token',
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
        name: "FK_member_token_members_id_members_id",
        using: "BTREE",
        fields: [
          { name: "members_id" },
        ]
      },
    ]
  });
};
