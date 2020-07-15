export interface Match {
    time: Date;
    homeTeam: string;
    homeTeamScored: number;
    guestTeam: string;
    guestTeamScored: number;
}

export interface MatchDay {
    date: Date;
    matches: Match[];
}