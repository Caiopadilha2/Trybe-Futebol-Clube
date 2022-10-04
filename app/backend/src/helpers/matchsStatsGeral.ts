// const matchStatsHome = (matches: any, qtdGames: any) => {
//   const winsHome = matches
//     .filter((match: any) => match.homeTeamGoals > match.awayTeamGoals).length;
//   const defeatsHome = matches
//     .filter((match: any) => match.homeTeamGoals < match.awayTeamGoals).length;
//   const tiesHome = matches
//     .filter((match: any) => match.homeTeamGoals === match.awayTeamGoals).length;
//   const pointsHome = (winsHome * 3) + (tiesHome * 1);
//   const efficiencyHome = ((pointsHome / (qtdGames * 3)) * 100).toFixed(2);

//   return { winsHome, defeatsHome, tiesHome, pointsHome, efficiencyHome };
// };

// const matchStatsAway = (matches: any, qtdGames: any) => {
//   const winsAway = matches
//     .filter((match: any) => match.homeTeamGoals < match.awayTeamGoals).length;
//   const defeatsAway = matches
//     .filter((match: any) => match.homeTeamGoals > match.awayTeamGoals).length;
//   const tiesAway = matches
//     .filter((match: any) => match.homeTeamGoals === match.awayTeamGoals).length;
//   const pointsAway = (winsAway * 3) + (tiesAway * 1);
//   const efficiencyAway = ((pointsAway / (qtdGames * 3)) * 100).toFixed(2);

//   return { winsAway, defeatsAway, tiesAway, pointsAway, efficiencyAway };
// };

// export default { matchStatsHome, matchStatsAway };
