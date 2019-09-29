const sqlite3 = require('sqlite3').verbose();
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db.sqlite'
});
//const safeCompare = require('safe-compare');
const bcrypt = require('bcrypt')

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  hashed_password: {
    type: Sequelize.STRING,
    allowNull: false
  },
}, {
  setterMethods: {
    // Auto-hash the password into the hashed_password field when you do
    // user.password = 'foo'
    password(rawPassword) {
      // Generates a salt and hashes password with it
      const hash = bcrypt.hashSync(rawPassword, 10);
      this.setDataValue('hashed_password', hash);
    }
  }
});
User.prototype.validPassword = function(password) {
  return bcrypt.compareSync(password, this.hashed_password);
}

const Feedback = sequelize.define('feedback', {
  content: {
    type: Sequelize.TEXT
  }
})
User.hasOne(Feedback);

// In prod we'd use migrations.  Here, we'll just always force the db to match
// our schema.
sequelize.sync({ force: false })

module.exports = {
  User,
  Feedback
}

// In a real app, we'd use a proper migration framework.  For this, though,
// we'll just create the tables on load if they don't exist.  In development,
// we can drop them as needed to recreate them.

//db.run('DROP TABLE IF EXISTS users;')
//db.run('DROP TABLE IF EXISTS feedbacks;')

//module.exports = {
  //setup: () => {
    //db.run(`
      //CREATE TABLE IF NOT EXISTS users (
        //id INTEGER PRIMARY KEY AUTOINCREMENT,
        //hashed_password STRING,
        //username STRING
      //);
      //CREATE TABLE IF NOT EXISTS feedbacks (
        //id INTEGER PRIMARY KEY AUTOINCREMENT,
        //FOREIGN KEY(user_id) REFERENCES users(id)
        //name STRING
      //);
    //`)
  //},
  //findUser: (username) => {
    //db.get('SELECT * FROM users WHERE id=
  //},
  //saveUser: (user) => {
  //},
  //findFeedback: (user_id) => {
  //},
  //saveFeedback: (feedback) => {
  //}
//}
