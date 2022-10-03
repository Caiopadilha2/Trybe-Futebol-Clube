const matchStats = (matches: any, qtdGames: any) => {
  const wins = matches.filter((match: any) => match.homeTeamGoals < match.awayTeamGoals).length;
  const defeats = matches.filter((match: any) => match.homeTeamGoals > match.awayTeamGoals).length;
  const ties = matches.filter((match: any) => match.homeTeamGoals === match.awayTeamGoals).length;
  const points = (wins * 3) + (ties * 1);
  const efficiency = ((points / (qtdGames * 3)) * 100).toFixed(2);

  return { wins, defeats, ties, points, efficiency };
};

export default matchStats;
