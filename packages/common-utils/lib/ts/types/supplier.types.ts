/**
 * 이 타입 정의는 중첩된 supplier와 handler 함수의 구조를 캡쳐하기 위한 것입니다.
 * - T extends object: 초기 상태 객체를 나타냅니다.
 * - S extends { [key in keyof T]: () => T }: 상태 키와 supplier 함수의 매핑입니다.
 * - H extends (returns: object) => object: returns 객체를 취하고 수정하는 핸들러 함수입니다.
 * - P = object: 추가적인 중첩을 위한 선택적 타입 매개변수입니다.
 */
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
