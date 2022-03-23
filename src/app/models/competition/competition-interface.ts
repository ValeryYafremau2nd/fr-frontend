import IMatch from './match-interface';

interface ICompetition {
  _id: string;
  id: number;
  emblemUrl: string;
  name: string;
  code: string;
  matches: IMatch[];
}
export default ICompetition;
