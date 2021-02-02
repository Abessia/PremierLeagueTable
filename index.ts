// Importing the JSON data (in production I could do this with a server and API; here I just copy pasted the json and imported it)
const seasonData = require('./2016-2017data.json');
const sortSeasonTable = require('./sortMethods.ts');
const generateUnsortedTable = require('./tableGeneration.ts');

// Interfaces set-up based on expected JSON data and anticipated use (move to second file to clean up index.ts?)
interface Gameday {
  name: string;
  matches: Match[];
}

interface Match {
  date: string;
  team1: string;
  team2: string;
  score: {ft: number[]};
}

interface Team {
  rank: number;
  teamName: string;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
}

// Generate the unsorted table for the season
const currentSeason = seasonData.name;
const seasonGames: Gameday[] = seasonData.rounds;
const unsortedSeasonTable: Team[] = generateUnsortedTable(seasonGames);

// Sort the Table
let outputTable: Team[] = sortSeasonTable(unsortedSeasonTable);

// Add each team's rank now that the table is sorted
outputTable.forEach((team, index) => {
  team.rank = index + 1;
})

// Output the table to the console
console.table(outputTable);
