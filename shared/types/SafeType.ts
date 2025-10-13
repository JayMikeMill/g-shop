// Helper: decrement recursion depth
type DecrementDepth<D extends any[]> = D extends [any, ...infer Rest]
  ? Rest
  : [];

// SafeType utility with recursion limit
export type SafeType<T, Depth extends any[] = [1, 1]> = Depth extends []
  ? any
  : T extends Function
    ? T
    : T extends null
      ? null
      : T extends (infer U)[]
        ? SafeType<U, DecrementDepth<Depth>>[]
        : T extends object
          ? { [K in keyof T]: SafeType<T[K], DecrementDepth<Depth>> }
          : T;
