// Main merge sort using recursion
const mergeSortTeams = (array: Team[]) => {
  if (array.length <= 1) {
    return array;
  }

  let midpoint = Math.floor(array.length / 2);
  let lowerHalf = array.slice(0, midpoint);
  let upperHalf = array.slice(midpoint);

  return sortTeams(mergeSortTeams(lowerHalf), mergeSortTeams(upperHalf));
}

// Helper function for re-combining the sorted arrays on the way back "up" the recursion tree
// This function requires two --sorted-- arrays and returns a sorted array combining them
const sortTeams = (lowerArray: Team[], upperArray: Team[]) => {
  let lowerArrayIndex = 0;
  let upperArrayIndex = 0;
  let result: Team[] = [];

  while (lowerArrayIndex < lowerArray.length && upperArrayIndex < upperArray.length) {
    const team1: Team = lowerArray[lowerArrayIndex];
    const team2: Team = upperArray[upperArrayIndex];
    if (doesLowerArrayWin(team1, team2)) {
      result.push(team1);
      lowerArrayIndex++;
    } else {
      result.push(team2);
      upperArrayIndex++;
    }
  }

  let remainder: Team[];
  if (lowerArrayIndex === lowerArray.length) {
    remainder = upperArray.slice(upperArrayIndex);
  } else {
    remainder = lowerArray.slice(lowerArrayIndex);
  }

  return result.concat(remainder);
}

// Helper function for sorting two given teams
// Returns true if the first of two passed-in teams out-ranks the second passed-in team
// The team with the higher point total ranks higher; goalDiff breaks ties, and goalsFor breaks goalDiff ties
const doesLowerArrayWin = (lowerTeam: Team, upperTeam: Team) => {
  if (lowerTeam.points > upperTeam.points) {
    return true;
  } else if (lowerTeam.points === upperTeam.points) {
    if (lowerTeam.goalDiff > upperTeam.goalDiff) {
      return true;
    } else if (lowerTeam.goalDiff === upperTeam.goalDiff) {
      if (lowerTeam.goalsFor > upperTeam.goalsFor) {
        return true;
      }
    }
  }

  return false;
}

module.exports = mergeSortTeams;

/* TESTS
// A few quick tests for doesLowerArrayWin
const testTeam1: Team = {
  rank: 0,
  teamName: 'West Ham United FC',
  wins: 12,
  draws: 9,
  losses: 17,
  goalsFor: 47,
  goalsAgainst: 64,
  goalDiff: -17,
  points: 45,
}

const testTeam2: Team = {
  rank: 0,
  teamName: 'Chelsea FC',
  wins: 30,
  draws: 3,
  losses: 5,
  goalsFor: 85,
  goalsAgainst: 33,
  goalDiff: 52,
  points: 93,
}

const testTeam3: Team = {
  rank: 0,
  teamName: 'Watford FC',
  wins: 11,
  draws: 7,
  losses: 20,
  goalsFor: 40,
  goalsAgainst: 68,
  goalDiff: -28,
  points: 40,
}

const testTeam4: Team = {
  rank: 0,
  teamName: 'Burnley FC',
  wins: 11,
  draws: 7,
  losses: 20,
  goalsFor: 39,
  goalsAgainst: 55,
  goalDiff: -16,
  points: 40,
}

const testTeam5: Team = {
  rank: 0,
  teamName: 'Leicester City FC',
  wins: 12,
  draws: 8,
  losses: 18,
  goalsFor: 48,
  goalsAgainst: 63,
  goalDiff: -15,
  points: 44,
}

const testTeam6: Team = {
  rank: 0,
  teamName: 'Stoke City FC',
  wins: 11,
  draws: 11,
  losses: 16,
  goalsFor: 41,
  goalsAgainst: 56,
  goalDiff: -15,
  points: 44,
}

console.log('False: ', doesLowerArrayWin(testTeam1, testTeam2)); // should return false (West Ham does not outrank Chelsea on points)
console.log('True: ', doesLowerArrayWin(testTeam2, testTeam1)); // should return true (Chelsea outranks West Ham on points)
console.log('False: ', doesLowerArrayWin(testTeam3, testTeam4)); // should return false (Burnley wins goalDiff tiebreaker over Watford)
console.log('True: ', doesLowerArrayWin(testTeam4, testTeam3)); // should return true (Burnley wins goalDiff tiebreaker over Watford)
console.log('True: ', doesLowerArrayWin(testTeam5, testTeam6)); // should return true (Leicester wins on goalsFor tiebreaker over Stoke)
console.log('False: ', doesLowerArrayWin(testTeam6, testTeam5)); // should return false (Leicester wins on goalsFor tiebreaker over Stoke)

// Super basic tests for sortTeams
const testSortedArray1: Team[] = [testTeam2, testTeam1];
const testSortedArray2: Team[] = [testTeam5, testTeam3];
console.table(sortTeams(testSortedArray1, testSortedArray2)); // works for 2 element arrays

const testSortedArray3: Team[] = sortTeams(testSortedArray1, testSortedArray2);
const testSortedArray4: Team[] = [testTeam6, testTeam4];
console.table(sortTeams(testSortedArray3, testSortedArray4)); // works for arrays with different numbers of elements

// Basic test for mergeSortTeams
const testUnsortedArray: Team[] = [testTeam1, testTeam2, testTeam6, testTeam3, testTeam5, testTeam4];
console.table(mergeSortTeams(testUnsortedArray));
*/
