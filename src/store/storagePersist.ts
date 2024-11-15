/* eslint-disable @typescript-eslint/no-explicit-any */
function isJsonString(str: string): boolean {
    try {
      JSON.parse(str);
    } catch (e) {
      console.error((e as Error).message);
      return false;
    }
    return true;
  }

export const storePersist = {
    set: (key: keyof typeof LOCAL_STORAGE_KEY, state: any): void => {
      window.localStorage.setItem(key, JSON.stringify(state));
    },
    get: (key: keyof typeof LOCAL_STORAGE_KEY): any | false => {
      const result = window.localStorage.getItem(key);
      if (!result) {
        return false;
      } else {
        if (!isJsonString(result)) {
          window.localStorage.removeItem(key);
          return false;
        } else return JSON.parse(result);
      }
    },
    remove: (key: keyof typeof LOCAL_STORAGE_KEY): void => {
      window.localStorage.removeItem(key);
    },
    getAll: (): Storage => {
      return window.localStorage;
    },
    clear: (): void => {
      window.localStorage.clear();
    },
  };

  export enum LOCAL_STORAGE_KEY {
    BILL_GENERATOR_DETAILS = 'BILL_GENERATOR_DETAILS'
  }

