export type Optional<T> = T | undefined;
export type Nullable<T> = T | null;
export type Nullish<T> = T | null | undefined;
export type RenderProp<T> = React.ReactNode | ((props: T) => React.ReactNode);
