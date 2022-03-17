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
  id: DataTypes.INTEGER,
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
