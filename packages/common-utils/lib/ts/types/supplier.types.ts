export type tSupplyReturnsWrap<
    T extends object,
    S extends { [key in keyof T]: () => T },
    H extends (returns: object) => object,
    P = object,
> = {
    [key in keyof S]: <
        R extends ReturnType<S[key]>,
        RR extends { [key2 in keyof Omit<S, key>]: P & R & tSupplyReturnsWrap<T, S, H, R>[key2] },
        HH extends {
            handler: () => P & R & RR & ReturnType<H>;
        },
    >() => P & R & RR & HH;
};
