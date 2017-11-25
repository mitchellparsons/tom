// TODO: Get rid of "any"
export default interface Channel {
  create(actorConfig: any);
  connect(actorName: string);
  toString();
}

export interface Channel2 {
  name: string;
  call(methodName, ...data): Promise<any>;
}