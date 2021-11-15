import ICandidate from "./ICandidate"
import IRoute from "./IRoute"

export default interface ICandidateWithRoute {
  candidate: ICandidate,
  route: IRoute,
  prise: number,
}
