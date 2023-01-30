import { shallowRef, watch, type ShallowRef } from "vue";
import type { OnChangeType, SetValueCallbackType } from "../keys";

export const useValue = <T>(name: string | undefined, updata: OnChangeType) => {
  const v = shallowRef<T>();
  const setV = (value?: T) => (v.value = value);
  name && watch(v, (v) => updata(name, v));
  return [v, setV] as [ShallowRef<T>, SetValueCallbackType];
};
