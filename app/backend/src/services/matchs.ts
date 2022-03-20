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

  public static async verifyClubs(arrayOfIdsClubs: number[], newMatch: IMatch) {
    const verifyClubs = arrayOfIdsClubs.includes(newMatch.homeTeam)
    && arrayOfIdsClubs.includes(newMatch.awayTeam);
    if (verifyClubs) {
      const resultMatch = await Match
        .create({ ...newMatch, inProgress: true });
      return resultMatch;
    }
    return null;
  }

  public static async createMatch(match: IMatch) {
    try {
      const allClubs = await Club.findAll({ raw: true });
      const arrayOfIdsClubs = allClubs.map(({ id }) => id);

      // Transform 0 in 1
      const newMatch = {
        ...match,
        homeTeam: (match.homeTeam === 0 ? 1 : match.homeTeam),
        awayTeam: (match.awayTeam === 0 ? 1 : match.awayTeam),
      };

      // Verify if the clubs are in the database
      return await Matchs.verifyClubs(arrayOfIdsClubs, newMatch);
    } catch (error) {
      console.log('Error', error);
    }
  }

  public static async finishMatch(id: number) {
    try {
      const newId = id === 0 ? 1 : id;
      const match = await Match.findOne({ where: { id: newId, inProgress: true } });
      if (match) {
        await Match.update({ inProgress: false }, { where: { id: newId } });
        return true;
      }
      return false;
    } catch (error) {
      console.log('Error', error);
    }
  }

  public static async updateMatch(id: number, match: IMatch) {
    try {
      const newId = id === 0 ? 1 : id;
      const matchInDatabase = await Match.findOne({ where: { id: newId, inProgress: true } });
      if (matchInDatabase) {
        const { homeTeamGoals, awayTeamGoals, inProgress } = match;
        const result = await Match
          .update({ homeTeamGoals, awayTeamGoals, inProgress }, { where: { id: newId } });
        return result;
      }
      return null;
    } catch (error) {
      console.log('Error', error);
    }
  }
}

export default Matchs;
