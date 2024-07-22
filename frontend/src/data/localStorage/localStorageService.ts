export class LocalStorageService {
  private storage: Storage;

  constructor() {
    this.storage = localStorage;
  }

  public saveToLocalStorage<T>(key: string, value: T) {
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
  public removeFromLocalStorage(key: string) {
    this.storage.removeItem(key);
  }
}
