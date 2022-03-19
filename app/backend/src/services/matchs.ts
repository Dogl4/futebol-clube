import Match from '../database/models/match';
import Club from '../database/models/club';
import type { IMatch } from '../interfaces/match';

class Matchs {
  public static async getMatchs() {
    try {
      const matchs: Match[] = await Match.findAll({
        attributes: { exclude: ['home_team', 'away_team'] },
        include: [{ model: Club, as: 'awayClub', attributes: ['clubName'] },
          { model: Club, as: 'homeClub', attributes: ['clubName'] }] });

      return matchs;
    } catch (error) {
      console.log('Error', error);
    }
  }

  public static async getMatchInProgress() {
    const inProgress = true;
    const matchs = await Match.findAll({
      where: { inProgress },
      include: [{ model: Club, as: 'awayClub', attributes: ['clubName'] },
        { model: Club, as: 'homeClub', attributes: ['clubName'] }],
    });
    return matchs;
  }

  public static async createMatch(match: IMatch) {
    try {
      const allClubs = await Club.findAll({ raw: true });
      const arrayOfIdsClubs = allClubs.map(({ id }) => id);

      // Verify if the clubs are in the database
      if (arrayOfIdsClubs.includes(match.homeTeam, match.awayTeam)) {
        const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = match;
        const newMatch = await Match
          .create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true });
        return newMatch;
      }
      return null;
    } catch (error) {
      console.log('Error', error);
    }
  }
}

export default Matchs;
