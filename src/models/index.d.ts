import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Log {
  readonly id: string;
  readonly userId: string;
  readonly textSetId: string;
  readonly model: number[];
  readonly updatedAt: string;
  constructor(init: ModelInit<Log>);
  static copyOf(source: Log, mutator: (draft: MutableModel<Log>) => MutableModel<Log> | void): Log;
}