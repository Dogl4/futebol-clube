import Match from '../database/models/match';

class Matchs {
  public static async getMatchs() {
    const matchs = await Match.findAll({ raw: true });
    return matchs;
  }
}

export default Matchs;
