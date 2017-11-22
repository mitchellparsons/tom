// TODO: Get rid of "any"
export default interface Channel {
  create(actorConfig: any);
  connect(actorName: string);
  toString();
}