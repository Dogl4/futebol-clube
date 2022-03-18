import Match from '../database/models/match';

class Matchs {
  public static async getMatchs() {
    const matchs = await Match.findAll({ raw: true });
    return matchs;
  }

  public static async getMatchInProgress() {
    const inProgress = 1;
    const matchs = await Match.findAll({ where: { inProgress }, raw: true });
    return matchs;
  }
}

export default Matchs;
