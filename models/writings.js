const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('writings', {
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
    type: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      comment: "타입"
    },
    is_public: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "공개여부"
    },
    title: {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "제목"
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "내용"
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
    tableName: 'writings',
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
        name: "FK_writings_members_id_members_id",
        using: "BTREE",
        fields: [
          { name: "members_id" },
        ]
      },
      {
        name: "writings_title_index",
        using: "BTREE",
        fields: [
          { name: "title" },
        ]
      },
    ]
  });
};
