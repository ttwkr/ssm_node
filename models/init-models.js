let DataTypes = require("sequelize").DataTypes;
let _codes = require("./codes");
let _comments = require("./comments");
let _members = require("./members");
let _subscribe = require("./subscribe");
let _words = require("./words");
let _writing_word = require("./writing_word");
let _writing_word_aggergation = require("./writing_word_aggergation");
let _writings = require("./writings");

const initModels = (sequelize) => {
  let codes = _codes(sequelize, DataTypes);
  let comments = _comments(sequelize, DataTypes);
  let members = _members(sequelize, DataTypes);
  let subscribe = _subscribe(sequelize, DataTypes);
  let words = _words(sequelize, DataTypes);
  let writing_word = _writing_word(sequelize, DataTypes);
  let writing_word_aggergation = _writing_word_aggergation(sequelize, DataTypes);
  let writings = _writings(sequelize, DataTypes);

  comments.belongsTo(comments, { as: "parent", foreignKey: "parent_id"});
  comments.hasMany(comments, { as: "comments", foreignKey: "parent_id"});
  comments.belongsTo(members, { as: "member", foreignKey: "members_id"});
  members.hasMany(comments, { as: "comments", foreignKey: "members_id"});
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
    members,
    subscribe,
    words,
    writing_word,
    writing_word_aggergation,
    writings,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
