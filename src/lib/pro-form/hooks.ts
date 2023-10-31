import { inject, onUnmounted, provide, shallowRef, watch, type InjectionKey } from "vue";
import { noop } from "./utils/common";

const noopfn = () => noop;

export type RegisterCallbackType = <T>(value?: T) => void;
export type OnRegisterType = (name: string, callback: RegisterCallbackType) => void;
const onRegisterKey = Symbol("ON_REGISTER") as InjectionKey<OnRegisterType>;
export const useRegister = (name: string, register: RegisterCallbackType) => inject(onRegisterKey, noop)(name, register);

export type UnFormType = (name: string) => () => void;
const unFormKey = Symbol("ON_UN_FORM") as InjectionKey<UnFormType>;
export const useUnForm = (name: string) => inject(unFormKey, noopfn)(name);

export type OnChangeType = (name: string) => <T>(value?: T) => void;
const onChangeKey = Symbol("ON_CHANGE") as InjectionKey<OnChangeType>;
export const useOnChange = (name: string) => inject(onChangeKey, noopfn)(name);

interface UseFormProvideOption {
  onRegister: OnRegisterType;
  unForm: UnFormType;
  onChange: OnChangeType;
}

export const useFormProvide = (opt: UseFormProvideOption) => {
  provide(onRegisterKey, opt.onRegister);
  provide(unFormKey, opt.unForm);
  provide(onChangeKey, opt.onChange);
};

export const useField = <T>(name: string) => {
  const v = shallowRef<T>();
  const updata = useOnChange(name);
  name && watch(v, (v) => updata(v));

  useRegister(name, (value) => {
    v.value = value as T;
  });
  const un = useUnForm(name);
  onUnmounted(() => un());
  return [v];
};
