import { inject, provide, type InjectionKey } from "vue";

type SetValueCallbackType = <T>(value?: T) => void;
export type OnSetValueType = (name: string, callback: SetValueCallbackType) => void;
const onSetValueKey = Symbol("ON_SET_VALUE") as InjectionKey<OnSetValueType>;
export const useProvideOnSetValue = (cb: OnSetValueType) => provide(onSetValueKey, cb);
export const useOnSetValue = (name: string | undefined, setValue: SetValueCallbackType) => name && inject(onSetValueKey, () => {})(name, setValue);

export type OnChangeType = <T>(name: string, value?: T) => void;
const onChangeKey = Symbol("ON_CHANGE") as InjectionKey<OnChangeType>;
export const useProvideOnChange = (cb: OnChangeType) => provide(onChangeKey, cb);
export const useOnChange = () => inject(onChangeKey, () => {});
