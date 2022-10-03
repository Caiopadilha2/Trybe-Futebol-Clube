const golsStats = (matches: any) => {
  const gp = matches.reduce((acc: any, match: any) => acc + match.homeTeamGoals, 0);
  const gc = matches.reduce((acc: any, match: any) => acc + match.awayTeamGoals, 0);
  const sg = gp - gc;
  return { gp, gc, sg };
};

export default golsStats;
