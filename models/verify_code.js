const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('verify_code', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "인증번호 코드"
    },
    is_success: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "성공여부"
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "이메일"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "생성일"
    },
    expired_at: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "만료시간"
    }
  }, {
    sequelize,
    tableName: 'verify_code',
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
