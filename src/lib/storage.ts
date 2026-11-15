import type { ProjectData } from "./Project";

type StorageData = {
  projects: ProjectData[]
}

class Storage {
  private defaultValue: StorageData = {
    projects: [
      {
        template: 'try changing the value of this {{variable}} in the text input on the right.\n\nit will automatically insert the value in the output below.',
        variables: {}
      }
    ]
  };

  private localStorageEntryName = 'text-template-editor';
  
  get(): StorageData {
    const loadedData = localStorage.getItem(this.localStorageEntryName);

    if(loadedData === null) return this.defaultValue;

    try {
      const data = JSON.parse(loadedData) as StorageData;
      return data;
    } catch {
      return this.defaultValue;
    }
  }

  set(data: StorageData) {
    localStorage.setItem(this.localStorageEntryName, JSON.stringify(data));
  }
}

export default new Storage();
