const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('members', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "이름"
    },
    phone: {
      type: DataTypes.STRING(11),
      allowNull: false,
      comment: "전화번호",
      unique: "members_phone_uindex"
    },
    nick_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "필명",
      unique: "members_nick_name_uindex"
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "이메일",
      unique: "members_email_uindex"
    },
    password: {
      type: DataTypes.STRING(500),
      allowNull: false,
      comment: "비밀번호",
      unique: "members_password_uindex"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
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
    tableName: 'members',
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
        name: "members_email_uindex",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "members_phone_uindex",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "phone" },
        ]
      },
      {
        name: "members_nick_name_uindex",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nick_name" },
        ]
      },
      {
        name: "members_password_uindex",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "password" },
        ]
      },
    ]
  });
};
