type ValuesAreSameType<C> = C[keyof C] extends infer T
    ? [T] extends [C[keyof C]]
        ? true
        : false
    : false;

export const stageSwitcher = <S extends keyof any, C extends Record<S, any>>(
    stage: S,
    dict: ValuesAreSameType<C> extends true ? C : never
): C[S] => {
    return dict[stage];
};
