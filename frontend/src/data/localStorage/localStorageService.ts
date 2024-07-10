import { ItemData } from "@/utils/types/items";

export class LocalStorageService {
  private storage: Storage;

  constructor() {
    this.storage = localStorage;
  }

  public saveToLocalStorage(key: string, value: ItemData[]) {
    const itemData = JSON.stringify(value);
    this.storage.setItem(key, itemData);
  }
  public getFromLocalStorage(key: string) {
    const itemData = this.storage.getItem(key);
    if (itemData === null) {
      return [];
    }
    return JSON.parse(itemData);
  }
}
