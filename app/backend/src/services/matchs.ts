import Match from '../database/models/match';
import Club from '../database/models/club';

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
}

export default Matchs;
