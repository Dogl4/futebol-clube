import Club from '../database/models/club';

class Clubs {
  static async getAllClubs() {
    const clubs = await Club.findAll({ raw: true });
    return clubs;
  }

  static async getClubById({ id }: { id: number }) {
    const club = await Club.findOne({ where: { id } });
    return club;
  }
}

export default Clubs;
