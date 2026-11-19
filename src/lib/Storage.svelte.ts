import type { ProjectData } from "./Project";

export type AppData = {
  projects: ProjectData[],
  currentProject: ProjectData | null
}

type AppState = AppData | null

const defaultProject = {
  template: 'try changing the value of this {{variable}} in the text input on the right.\n\nit will automatically insert the value in the output below.',
  variables: {}
};
const defaultValue: AppData = {
    projects: [
      defaultProject,
      {
        template: 'another one',
        variables: {}
      }
    ],
    currentProject: defaultProject
  };

let data = $state<AppState>(null);

class Storage {
  private localStorageEntryName = 'text-template-editor';
  
  get() {
    if(data !== null) return data;
    
    const serializedData = localStorage.getItem(this.localStorageEntryName);
    if(serializedData === null) {
      data = defaultValue
      return data;
    }

    try {
      data = JSON.parse(serializedData) as AppData;
    } catch {
      data = defaultValue;
    }

    return data;
  }

  save() {
    if (data === null) return;
    localStorage.setItem(this.localStorageEntryName, JSON.stringify(data));
  }
}

export default new Storage();
