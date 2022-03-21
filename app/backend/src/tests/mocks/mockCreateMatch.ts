export default {
  input: {
    "homeTeam": 16,
    "awayTeam": 8,
    "homeTeamGoals": 2,
    "awayTeamGoals": 2,
    "inProgress": true
  },
  inputEqualTeams:{
    "homeTeam": 16,
    "awayTeam": 16,
    "homeTeamGoals": 2,
    "awayTeamGoals": 2,
    "inProgress": true
  },
  inputTeamNotInDatabase: {
    "homeTeam": 18,
    "awayTeam": 99,
    "homeTeamGoals": 2,
    "awayTeamGoals": 2,
    "inProgress": true
  },
  inputMatchOfTeamWhitIdZero: {
    "homeTeam": 0,
    "awayTeam": 8,
    "homeTeamGoals": 2,
    "awayTeamGoals": 2,
    "inProgress": true
  },
  output: {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 8,
    "awayTeamGoals": 2,
    "inProgress": true,
  },
  outuptMatchOfTeamWhitIdZero: {
    "id": 1,
    "homeTeam": 1,
    "awayTeam": 8,
    "homeTeamGoals": 2,
    "awayTeamGoals": 2,
    "inProgress": true
  }
}