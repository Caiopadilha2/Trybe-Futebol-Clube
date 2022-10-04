import golsStats from '../helpers/golsStats';
import golsStatsAway from '../helpers/golsStatsAway';
import matchStats from '../helpers/matchsStats';
import matchStatsAway from '../helpers/matchsStatsAway';
import renameKeys from '../helpers/renameKeys';
import teamModel from '../database/models/Team';
import classification from '../helpers/classification';
import matchService from './matches';

const rankingHome = async () => {
  const matchesFinished = await matchService.getFinishedMatches();
  const teams = await teamModel.findAll();
  const homeTeams: any[] = [];

  teams.forEach((team) => {
    const name = team.teamName;
    const matchesOfTeam = matchesFinished.filter((match: any) => match.teamHome.teamName === name);
    const qtdGames = matchesOfTeam.length;
    const { wins, ties, defeats, points, efficiency } = matchStats(matchesOfTeam, qtdGames);
    const { gp, gc, sg } = golsStats(matchesOfTeam);
    homeTeams.push({ name, points, qtdGames, wins, ties, defeats, gp, gc, sg, efficiency });
  });
  const ranking = homeTeams.sort(classification);
  const rename = renameKeys(ranking);

  return rename;
};

const rankingAway = async () => {
  const matches = await matchService.getFinishedMatches();
  const teams = await teamModel.findAll();
  const awayTeams: any[] = [];

  teams.forEach((team) => {
    const name = team.teamName;
    const matchesOfTeam = matches.filter((match: any) => match.teamAway.teamName === name);
    const qtdGames = matchesOfTeam.length;
    const { wins, ties, defeats, points, efficiency } = matchStatsAway(matchesOfTeam, qtdGames);
    const { gp, gc, sg } = golsStatsAway(matchesOfTeam);
    awayTeams.push({ name, points, qtdGames, wins, ties, defeats, gp, gc, sg, efficiency });
  });
  const ranking = awayTeams.sort(classification);
  const rename = renameKeys(ranking);

  return rename;
};

// const rankingGeral = async () => {
//   const finishedMatches = await matchService.getFinishedMatches();
//   const allTeams = await teamModel.findAll();
//   const teamScore: any[] = [];

//   allTeams.forEach((team) => {
//     const name = team.teamName;
//     const matchesOfHome = finishedMatches.filter((match: any) => match.teamHome.teamName === name);
//     const matchesOfAway = finishedMatches.filter((match: any) => match.teamAway.teamName === name);
//     const qtdGamesHome = matchesOfHome.length;
//     const qtdGamesAway = matchesOfAway.length;
//     const { winsHome, defeatsHome, tiesHome, pointsHome, efficiencyHome }
//      = matchStats(matchesOfHome, qtdGamesHome);
//     const { winsAway, defeatsAway, tiesAway, pointsAway,
//       efficiencyAway } = matchStatsAway(matchesOfAway, qtdGamesAway);
//     teamScore.push({ winsHome, defeatsHome, tiesHome, pointsHome, efficiencyHome, winsAway,
//       defeatsAway, tiesAway, pointsAway, efficiencyAway });
//   });
// };

export default { rankingHome, rankingAway };
