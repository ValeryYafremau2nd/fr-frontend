import ICompetition from "./competition/competition-interface";
import IMatchday from "./competition/match-day-interface";
import IMatch from "./competition/match-interface";
import IStanding from "./competition/standing-interface";
import ITeam from "./team/team-interface";

interface Response {
    error: string;
    data: IMatch[] | ITeam[] | IStanding[] | ICompetition[] | IMatchday[]
}
export default Response;