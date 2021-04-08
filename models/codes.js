const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('codes', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    group: {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "코드 그룹"
    },
    code: {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "코드"
    },
    descript: {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "설명"
    },
    is_use: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: "사용여부"
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
    tableName: 'codes',
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
    ]
  });
};
