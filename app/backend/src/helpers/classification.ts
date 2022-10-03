const classification = (teamA: any, teamB: any) =>
  teamB.points - teamA.points
 || teamB.wins - teamA.wins
  || teamB.sg - teamA.sg
   || teamB.gp - teamA.gp
    || teamB.gc - teamA.gc;

export default classification;
