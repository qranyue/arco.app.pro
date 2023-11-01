import type { Form } from "@arco-design/web-vue";
import { shallowReactive, shallowRef, type ShallowRef } from "vue";
import { useFormProvide, type RegisterCallbackType } from "./hooks";
import type { ProFormData } from "./models";
import { isNull } from "./utils/common";

type FormInstance = InstanceType<typeof Form>;

type FormValidate = () => ReturnType<FormInstance["validate"]> | undefined;

type FormRegister = (request?: () => Promise<ProFormData>) => {
  form$: ShallowRef<FormInstance | undefined>;
  data: ProFormData;
};

export interface UseForm {
  /** 校验表单 */
  validate: FormValidate;
  /** 注册函数 */
  register: FormRegister;
}

export const useForm = (form?: UseForm) => {
  if (form) return form;

  const form$ = shallowRef<FormInstance | undefined>();
  const data = shallowReactive<ProFormData>({});
  const doms = new Map<string, RegisterCallbackType>();

  useFormProvide({
    onRegister: (name, callback) => {
      doms.set(name, callback);
    },
    unForm: (name) => () => {
      delete data[name];
      doms.delete(name);
    },
    onChange: (name) => (value) => {
      if (isNull(data[name])) delete data[name];
      else if (data[name] !== value) data[name] = value;
    },
  });

  const validate = () => form$.value?.validate();

  const register: FormRegister = (request) => {
    (async () => {
      if (!request) return;
      const value: ProFormData = await request();
      if (!(value instanceof Object) || value instanceof Function) return console.warn("请返回对象类型");
      doms.forEach((cb, key) => {
        cb(value[key]);
        data[key] = value[key];
      });
    })();

    return {
      form$,
      data,
    };
  };

  return {
    validate,
    register,
  };
};
