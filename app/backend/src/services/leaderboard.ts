import Club from '../database/models/club';
import Match from '../database/models/match';

interface Iacc2 {
  name: string,
  totalPoints: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  totalGames: number,
  goalsBalance: number,
  efficiency: string | number,
  clubName?: string,
  homeTeam?: Match[],
  awayTeam?: Match[],
}

interface Iacc3 { homeTeamGoals: number, awayTeamGoals: number }

interface Iacc1 {
  name: string,
  totalPoints: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  totalGames: number,
  goalsBalance: number,
  efficiency: number | string,
}

class Leaderboard {
  public static pointCalculation(acc: Iacc2, { homeTeamGoals, awayTeamGoals }:
  { homeTeamGoals: number, awayTeamGoals: number }, team: 'homeTeam' | 'awayTeam') {
    const first = team === 'homeTeam' ? homeTeamGoals : awayTeamGoals;
    const second = team === 'homeTeam' ? awayTeamGoals : homeTeamGoals;
    const goals = {
      goalsFavor: acc.goalsFavor += first, goalsOwn: acc.goalsOwn += second };
    if (first > second) { acc.totalPoints += 3; acc.totalVictories += 1; }
    if (first < second) { acc.totalPoints += 0; acc.totalLosses += 1; }
    if (homeTeamGoals === awayTeamGoals) { acc.totalPoints += 1; acc.totalDraws += 1; }
    return { ...acc, ...goals };
  }

  public static newObjectFormated(array: Club[], type: 'homeTeam' | 'awayTeam') {
    const team = type === 'homeTeam' ? 'homeTeam' : 'awayTeam';
    return array.map(({ clubName, [team]: club }: any) => {
      const moreInfo = { totalPoints: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0 };

      const newMoreInfo = club
        .reduce((acc: Iacc2, e: Iacc3) => Leaderboard.pointCalculation(acc, e, team), moreInfo);
      return { name: clubName,
        ...newMoreInfo,
        totalGames: club.length,
        goalsBalance: newMoreInfo.goalsFavor - newMoreInfo.goalsOwn,
        efficiency: (Math
          .round((newMoreInfo.totalPoints / (club.length * 3)) * 10000) / 100) };
    });
  }

  public static async sortLeardboard(array: Iacc1[]) {
    const sortedArray = array.sort((a, b): number => {
      if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
      if (b.totalVictories !== a.totalVictories) return b.totalVictories - a.totalVictories;
      if (b.goalsBalance !== a.goalsBalance) return b.goalsBalance - a.goalsBalance;
      if (b.goalsFavor !== a.goalsFavor) return b.goalsFavor - a.goalsFavor;
      if (b.totalLosses !== a.totalLosses) return a.totalLosses - b.totalLosses;
      return 0;
    });
    return sortedArray;
  }

  public static async matchInHome() {
    const clubs = await Club.findAll({
      include: [
        { model: Match,
          as: 'homeTeam',
          where: { inProgress: false },
          attributes: { exclude: ['home_team', 'away_team'] } },
      ],
    });

    const clubsLeaderboard = Leaderboard.newObjectFormated(clubs, 'homeTeam');
    return Leaderboard.sortLeardboard(clubsLeaderboard);
  }

  public static async matchInAway() {
    const clubs = await Club.findAll({
      include: [
        { model: Match,
          as: 'awayTeam',
          where: { inProgress: false },
          attributes: { exclude: ['home_team', 'away_team'] } },
      ],
    });
    const clubsLeaderboard = Leaderboard.newObjectFormated(clubs, 'awayTeam');
    return Leaderboard.sortLeardboard(clubsLeaderboard);
  }

  public static async all() {
    const [home, away] = await Promise.all([Leaderboard.matchInHome(), Leaderboard.matchInAway()]);
    const currentObject = (e: Iacc1) => away.filter((e2) => e2.name === e.name);
    const newObject = home.map((e) => ({
      name: e.name,
      totalPoints: (e.totalPoints + (currentObject(e)[0].totalPoints)),
      totalVictories: e.totalVictories + (currentObject(e)[0].totalVictories),
      totalDraws: e.totalDraws + (currentObject(e)[0].totalDraws),
      totalLosses: e.totalLosses + (currentObject(e)[0].totalLosses),
      goalsFavor: e.goalsFavor + (currentObject(e)[0].goalsFavor),
      goalsOwn: e.goalsOwn + (currentObject(e)[0].goalsOwn),
      totalGames: e.totalGames + (currentObject(e)[0].totalGames),
      goalsBalance: e.goalsBalance + (currentObject(e)[0].goalsBalance),
      efficiency: (Math.round(((e.totalPoints + (currentObject(e)[0].totalPoints))
         / ((e.totalGames + (currentObject(e)[0].totalGames)) * 3)) * 10000) / 100),
    }));
    return Leaderboard.sortLeardboard(newObject);
  }
}

export default Leaderboard;
