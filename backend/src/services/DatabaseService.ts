// src/services/DatabaseService.ts
import { db } from "@adapters/services";
import type { DBAdapter } from "@adapters/types";
import { CrudInterface, DatabaseDomainKeys } from "shared/interfaces";

export class DatabaseService {
  [key: string]: any;
  private _adapter: DBAdapter;

  products!: CrudInterface<any>;
  productVariants!: CrudInterface<any>;
  productTagsPresets!: CrudInterface<any>;
  productOptionsPresets!: CrudInterface<any>;
  productReviews!: CrudInterface<any>;
  categories!: CrudInterface<any>;
  collections!: CrudInterface<any>;
  orders!: CrudInterface<any>;
  users!: CrudInterface<any>;
  systemSettings!: CrudInterface<any>;

  constructor(adapter: DBAdapter = db) {
    this._adapter = adapter;
    // Dynamically copy all non-function properties from adapter
    for (const domain of DatabaseDomainKeys) {
      this[domain] = (adapter as any)[domain];
    }
  }

  async transaction<T>(
    callback: (tx: DatabaseService) => Promise<T>
  ): Promise<T> {
    return this._adapter.transaction(async (txAdapter) => {
      const txService = new DatabaseService(txAdapter);
      return callback(txService);
    });
  }

  async healthCheck(): Promise<boolean> {
    return this._adapter.healthCheck();
  }
}

export default new DatabaseService();
