const renameKeys = (leaderboardArray: any) => {
  const renamed: any[] = [];

  leaderboardArray.forEach((team: any) => {
    renamed.push({
      name: team.name,
      totalPoints: team.points,
      totalGames: team.qtdGames,
      totalVictories: team.wins,
      totalDraws: team.ties,
      totalLosses: team.defeats,
      goalsFavor: team.gp,
      goalsOwn: team.gc,
      goalsBalance: team.sg,
      efficiency: team.efficiency,
    });
  });

  return renamed;
};

export default renameKeys;
