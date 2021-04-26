var DataTypes = require("sequelize").DataTypes;
var _codes = require("./codes");
var _comments = require("./comments");
var _member_token = require("./member_token");
var _members = require("./members");
var _subscribe = require("./subscribe");
var _verify_code = require("./verify_code");
var _words = require("./words");
var _writing_word = require("./writing_word");
var _writing_word_aggergation = require("./writing_word_aggergation");
var _writings = require("./writings");

function initModels(sequelize) {
  var codes = _codes(sequelize, DataTypes);
  var comments = _comments(sequelize, DataTypes);
  var member_token = _member_token(sequelize, DataTypes);
  var members = _members(sequelize, DataTypes);
  var subscribe = _subscribe(sequelize, DataTypes);
  var verify_code = _verify_code(sequelize, DataTypes);
  var words = _words(sequelize, DataTypes);
  var writing_word = _writing_word(sequelize, DataTypes);
  var writing_word_aggergation = _writing_word_aggergation(sequelize, DataTypes);
  var writings = _writings(sequelize, DataTypes);

  comments.belongsTo(comments, { as: "parent", foreignKey: "parent_id"});
  comments.hasMany(comments, { as: "comments", foreignKey: "parent_id"});
  comments.belongsTo(members, { as: "member", foreignKey: "members_id"});
  members.hasMany(comments, { as: "comments", foreignKey: "members_id"});
  member_token.belongsTo(members, { as: "member", foreignKey: "members_id"});
  members.hasMany(member_token, { as: "member_tokens", foreignKey: "members_id"});
  subscribe.belongsTo(members, { as: "member", foreignKey: "members_id"});
  members.hasMany(subscribe, { as: "subscribes", foreignKey: "members_id"});
  subscribe.belongsTo(members, { as: "target_member", foreignKey: "target_members_id"});
  members.hasMany(subscribe, { as: "target_members_subscribes", foreignKey: "target_members_id"});
  writings.belongsTo(members, { as: "member", foreignKey: "members_id"});
  members.hasMany(writings, { as: "writings", foreignKey: "members_id"});
  writing_word.belongsTo(words, { as: "word", foreignKey: "words_id"});
  words.hasMany(writing_word, { as: "writing_words", foreignKey: "words_id"});
  writing_word_aggergation.belongsTo(words, { as: "word", foreignKey: "words_id"});
  words.hasMany(writing_word_aggergation, { as: "writing_word_aggergations", foreignKey: "words_id"});
  comments.belongsTo(writings, { as: "writing", foreignKey: "writings_id"});
  writings.hasMany(comments, { as: "comments", foreignKey: "writings_id"});
  writing_word.belongsTo(writings, { as: "writing", foreignKey: "writings_id"});
  writings.hasMany(writing_word, { as: "writing_words", foreignKey: "writings_id"});

  return {
    codes,
    comments,
    member_token,
    members,
    subscribe,
    verify_code,
    words,
    writing_word,
    writing_word_aggergation,
    writings,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
