import Club from '../database/models/club';

class Clubs {
  static async getAllClubs() {
    const clubs = await Club.findAll({ raw: true });
    return clubs;
  }
}

export default Clubs;
