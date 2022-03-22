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
  { homeTeamGoals: number, awayTeamGoals: number }) {
    const goals = {
      goalsFavor: acc.goalsFavor += homeTeamGoals, goalsOwn: acc.goalsOwn += awayTeamGoals };
    if (homeTeamGoals > awayTeamGoals) {
      acc.totalPoints += 3;
      acc.totalVictories += 1;
    }
    if (homeTeamGoals < awayTeamGoals) {
      acc.totalPoints += 0;
      acc.totalLosses += 1;
    }
    if (homeTeamGoals === awayTeamGoals) {
      acc.totalPoints += 1;
      acc.totalDraws += 1;
    }
    return { ...acc, ...goals };
  }

  public static newObjectFormated(array: Club[]) {
    const newArray = array
      .map(({ clubName, homeTeam }: any) => {
        const moreInfo = { totalPoints: 0,
          totalVictories: 0,
          totalDraws: 0,
          totalLosses: 0,
          goalsFavor: 0,
          goalsOwn: 0 };

        const newMoreInfo = homeTeam
          .reduce((acc: Iacc2, e: Iacc3) => Leaderboard.pointCalculation(acc, e), moreInfo);
        return { name: clubName,
          ...newMoreInfo,
          totalGames: homeTeam.length,
          goalsBalance: newMoreInfo.goalsFavor - newMoreInfo.goalsOwn,
          efficiency: (Math
            .round((newMoreInfo.totalPoints / (homeTeam.length * 3)) * 10000) / 100) };
      });
    return newArray;
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

    const clubsLeaderboard = Leaderboard.newObjectFormated(clubs);
    return Leaderboard.sortLeardboard(clubsLeaderboard);
  }
}

export default Leaderboard;
