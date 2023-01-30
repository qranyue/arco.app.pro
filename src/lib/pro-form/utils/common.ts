export const isNull = (value?: unknown) => [undefined, null, ""].includes(value as never);
