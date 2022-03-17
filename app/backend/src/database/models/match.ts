import { Model, DataTypes } from 'sequelize';
import db from '.';
import Club from './club';

class Match extends Model {
  public id: number;

  public homeTeam: number;

  public homeTeamGoals: number;

  public awayTeam: number;

  public awayTeamGoals: number;

  public inProgress: number;
}

Match.init({
  id: DataTypes.INTEGER,
  home_team: DataTypes.INTEGER,
  home_team_goals: DataTypes.INTEGER,
  away_team: DataTypes.INTEGER,
  away_team_goals: DataTypes.INTEGER,
  in_progress: DataTypes.INTEGER,
}, {
  sequelize: db,
  modelName: 'Matchs',
  tableName: 'matchs',
  underscored: true,
  timestamps: false,
});

Match.belongsTo(Club, { foreignKey: 'home_team', as: 'homeTeam' });
Match.belongsTo(Club, { foreignKey: 'away_team', as: 'awayTeam' });

export default Match;
