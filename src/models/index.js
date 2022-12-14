const Sequelize = require('sequelize');
const { sequelize } = require('../config/config');
const logger = require('../config/logger');

const sequelizeInstance = new Sequelize(sequelize.url);
const db = {};

/*
const sequelizeInstance = new Sequelize(sequelize.database, sequelize.user, sequelize.password, {
  host: sequelize.host,
  dialect: sequelize.dialect,
  pool: {
    min: 0,
    max: 100,
    acquire: 5000,
    Idle: 1000
  },
});
*/
sequelizeInstance
  .authenticate()
  .then(() => logger.info('DB connected'))
  .catch((err) => {
    logger.error(err);
  });

db.sequelize = sequelizeInstance;
db.Sequelize = Sequelize;

db.users = require('./user.model')(sequelizeInstance, Sequelize);
db.tokens = require('./token.model')(sequelizeInstance, Sequelize);
db.staffs = require('./staff.model')(sequelizeInstance, Sequelize);
db.leaves = require('./leave.model')(sequelizeInstance, Sequelize);

// relationships for models

//= ==============================
// Define all relationships here below
//= ==============================
// db.User.hasMany(db.Role);
// db.Role.belongsTo(db.User);

// hasOne
db.users.hasOne(db.staffs);
db.staffs.belongsTo(db.users);
// hasMany
db.staffs.hasMany(db.leaves);
db.leaves.belongsTo(db.staffs);

// db.staffs.belongsToMany(db.leaves, { through: 'staffs_leaves' });
// db.leaves.belongsToMany(db.staffs, { through: 'staffs_leaves' });

module.exports = {
  db,
};
