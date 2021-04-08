const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comments', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    writings_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'writings',
        key: 'id'
      }
    },
    members_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'members',
        key: 'id'
      }
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "부모 댓글",
      references: {
        model: 'comments',
        key: 'id'
      }
    },
    comment: {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "내용"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
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
    tableName: 'comments',
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
        name: "FK_comments_writings_id_writings_id",
        using: "BTREE",
        fields: [
          { name: "writings_id" },
        ]
      },
      {
        name: "FK_comments_members_id_members_id",
        using: "BTREE",
        fields: [
          { name: "members_id" },
        ]
      },
      {
        name: "FK_comments_parent_id_comments_id",
        using: "BTREE",
        fields: [
          { name: "parent_id" },
        ]
      },
    ]
  });
};
