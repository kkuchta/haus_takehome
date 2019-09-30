const sqlite3 = require('sqlite3').verbose();
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db.sqlite'
});
const bcrypt = require('bcrypt')


// ---- Models ----
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

// ---- DB Setup ----

// In prod we'd use migrations.  Here, we'll just always force the db to match
// our schema.  This only does table creates, not updates, so if you make a
// change to a previously-created table, change this to `force: true` to drop
// all tables and recreate them.  This loses all your data.
sequelize.sync({ force: false })

module.exports = {
  User,
  Feedback
}
