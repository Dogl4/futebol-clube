import { Model, DataTypes } from 'sequelize';
import db from '.';

class User extends Model {
  public id: number;

  public username: string;

  public password: string;

  public email: string;

  public role: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  email: DataTypes.STRING,
  role: DataTypes.STRING,
}, {
  sequelize: db,
  modelName: 'Users',
  tableName: 'users',
  timestamps: false,
});

export default User;
