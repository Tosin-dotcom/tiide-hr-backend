
module.exports = (sequelize, dataType) => {

    const Staff = sequelize.define('staff',
        {
            tempUserId: {
                type: dataType.INTEGER,
                allowNull: false,
                unique: true,
                validate: {
                    notNull: {msg: 'user ID cannot be blank'}
                }
            },
            staffCode: {
                type: dataType.INTEGER,
                allowNull: false,
                unique: true,
                validate: {
                    notNull: {msg: 'staff code cannot be blank'},
                    len:[0, 9]
                }
            },
            startDate: {
                type: dataType.DATE,
                validate: {isDate: true}
            },
            endDate: {
                type: dataType.DATE,
                validate: {isDate: true}
            }
        }
    );
    return Staff;
}
