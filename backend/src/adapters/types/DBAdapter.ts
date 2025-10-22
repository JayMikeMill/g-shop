import { DatabaseCrudMap } from "shared/interfaces";

export interface DBAdapter extends DatabaseCrudMap {
  isTx?: boolean;
  transaction<T>(callback: (tx: DBAdapter) => Promise<T>): Promise<T>;
  healthCheck(): Promise<boolean>;
}
