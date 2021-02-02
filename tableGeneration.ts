const makeUnsortedTable = (seasonGames: Gameday[]) => {
  // Storage data -- using hash for easy lookup in building the table; will turn into array for output during sort
  let seasonTable = {};
  let unsortedTable: Team[] = [];

  // Iterate the data to create an object for each team
  seasonGames.forEach((gameday) => {
    gameday.matches.forEach((match) => {
      if (!seasonTable[match.team1]) {
        seasonTable[match.team1] = {
          rank: 0,
          teamName: match.team1,
          wins: 0,
          draws: 0,
          losses: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          goalDiff: 0,
          points: 0,
        }
      }

      if (!seasonTable[match.team2]) {
        seasonTable[match.team2] = {
          rank: 0,
          teamName: match.team2,
          wins: 0,
          draws: 0,
          losses: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          goalDiff: 0,
          points: 0,
        }
      }

      // team1's score comes first in the score.ft tuple
      const team1Score = match.score.ft[0]
      const team2Score = match.score.ft[1];

      // Increment goalsFor and goalsAgainst
      seasonTable[match.team1].goalsFor += team1Score;
      seasonTable[match.team1].goalsAgainst += team2Score;
      seasonTable[match.team2].goalsFor += team2Score;
      seasonTable[match.team2].goalsAgainst += team1Score;

      // Increment win, draw, loss
      if(team1Score > team2Score) {
        seasonTable[match.team1].wins++;
        seasonTable[match.team2].losses++;
      } else if (team2Score > team1Score) {
        seasonTable[match.team2].wins++;
        seasonTable[match.team1].losses++;
      } else if (team1Score === team2Score) {
        seasonTable[match.team1].draws++;
        seasonTable[match.team2].draws++;
      }
    });
  })

  // Use final results for each team to calculate goalDiff and points
  for(let team in seasonTable) {
    const currentTeam = seasonTable[team];
    currentTeam.points = (currentTeam.wins * 3) + (currentTeam.draws);
    currentTeam.goalDiff = currentTeam.goalsFor - currentTeam.goalsAgainst;
    unsortedTable.push(currentTeam);
  }

  return unsortedTable;
}

module.exports = makeUnsortedTable;