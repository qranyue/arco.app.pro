import { shallowRef, watch, type ShallowRef } from "vue";

export const useValue = <T>(name: string | undefined, updata: (name: string, value?: T) => void) => {
  const value = shallowRef<T>();

  const setValue = (v?: T) => {
    value.value = v;
  };

  name && watch(value, (v) => updata(name, v));

  return [value, setValue] as [ShallowRef<T>, typeof setValue];
};
