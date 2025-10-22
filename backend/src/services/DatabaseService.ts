// src/services/DatabaseService.ts
import type { DBAdapter } from "@adapters/types";
import { CrudInterface, DatabaseDomainKeys } from "shared/interfaces";

export class DatabaseService {
  [key: string]: any;
  private _adapter!: DBAdapter; // will be set later

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

  /** Inject adapter when ready */
  setAdapter(adapter: DBAdapter) {
    this._adapter = adapter;

    // Dynamically copy all non-function properties from adapter
    for (const domain of DatabaseDomainKeys) {
      this[domain] = (adapter as any)[domain];
    }
  }

  async transaction<T>(
    callback: (tx: DatabaseService) => Promise<T>
  ): Promise<T> {
    if (!this._adapter)
      throw new Error("DatabaseService adapter not initialized!");
    return this._adapter.transaction(async (txAdapter) => {
      const txService = new DatabaseService();
      txService.setAdapter(txAdapter);
      return callback(txService);
    });
  }

  async healthCheck(): Promise<boolean> {
    if (!this._adapter)
      throw new Error("DatabaseService adapter not initialized!");
    return this._adapter.healthCheck();
  }
}

// Singleton instance
export default new DatabaseService();
