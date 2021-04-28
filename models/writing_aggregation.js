const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('writing_aggregation', {
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
    comment_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "댓글 수"
    },
    like_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "좋아요 수"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "생성일"
    }
  }, {
    sequelize,
    tableName: 'writing_aggregation',
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
        name: "FK_writing_aggregation_writings_id_writings_id",
        using: "BTREE",
        fields: [
          { name: "writings_id" },
        ]
      },
    ]
  });
};
