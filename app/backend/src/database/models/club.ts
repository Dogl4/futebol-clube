import { Model, DataTypes } from 'sequelize';
import db from '.';

class Club extends Model {
  public id: number;

  public clubName: string;
}

Club.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  clubName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'club_name',
  },
}, {
  sequelize: db,
  underscored: true,
  modelName: 'Clubs',
  tableName: 'clubs',
  timestamps: false,
});

export default Club;
