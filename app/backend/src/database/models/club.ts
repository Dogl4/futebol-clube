import { Model, DataTypes } from 'sequelize';
import db from '.';

class Club extends Model {
  public id: number;

  public clubName: string;
}

Club.init({
  id: DataTypes.INTEGER,
  club_name: DataTypes.STRING,
}, {
  sequelize: db,
  underscored: true,
  modelName: 'Clubs',
  tableName: 'clubs',
  timestamps: false,
});

export default Club;
