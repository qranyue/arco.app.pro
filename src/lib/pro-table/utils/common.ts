const NV = [undefined, null, ""];
export const isNull = (value?: unknown) => NV.includes(value as never);

export const noop = () => {};
