/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    DefaultValue,
    GetRecoilValue,
    RecoilState,
    ResetRecoilState,
    SetRecoilState,
    atom,
    selector,
    useRecoilValue,
} from 'recoil';

import { tSupplyReturnsWrap } from './ts';

/**
 * recoil 함수의 사용성을 간편하게 만들어주는 함수
 * @param init - page 첫부분에서 데이터 초기화를 위한 함수
 * @param supply - atoms 공급자가 호출되어 있는 함수
 * @param handler - page 내부에서 필요한 handler 함수의 모음. supply로부터 데이터를 공급받거나 이벤트 핸들링을 진행 혹은 공통로직 구현
 * @example
 * generateSupplier(useInit, suppliers, useHandler);
 */
export function generateSupplier<
    T extends object,
    S extends { [key in keyof T]: () => T },
    H extends (returns: object) => object,
    SS extends tSupplyReturnsWrap<T, S, H>,
>(init: () => void, supply: S, handler: H) {
    const generate = (s: S, preState?: object, key?: keyof typeof supply) => {
        let wrapSupply: Partial<SS> | undefined;
        const supplyKeys = Object.keys(s) as (keyof typeof s)[];
        supplyKeys.forEach((_key) => {
            if (key === _key) {
                return;
            }
            const sr = s[_key];
            wrapSupply = {
                ...wrapSupply,
                [_key]: <R extends ReturnType<SS[typeof _key]>>() => {
                    // 호출된 현재의 supply + 이전 호출된 supply
                    const returns = { ...preState, ...sr() };
                    const h = () => ({
                        ...returns,
                        ...handler(returns),
                    });
                    const temp = generate(supply, returns, _key);
                    const r = {
                        ...returns,
                        ...temp,
                        handler: h,
                    } as unknown as R & SS & H;

                    return r;
                },
            } as Partial<SS>;
        });

        return wrapSupply;
    };
    const hooks = {
        handler,
        init: () => {
            init();
            return hooks;
        },
        ...(generate(supply) as SS),
    };
    return hooks;
}
// export function generateSupplier<
//   T extends object,
//   S extends { [key in keyof T]: () => T },
//   H extends (returns: object) => object,
//   SS extends tSupplyReturnsWrap<T, S, H>
// >(
//   init: () => void,
//   supply: S,
//   handler: H
// ) {
//   const generate = (s: S, preState?: Partial<T>, key?: keyof typeof supply) => {
//     let wrapSupply: Partial<SS> | undefined;
//     const supplyKeys = Object.keys(s) as (keyof typeof s)[];
//     supplyKeys.forEach((_key) => {
//       if (key === _key) {
//         return;
//       }
//       const sr = s[_key];
//       wrapSupply = {
//         ...wrapSupply,
//         [_key]: () => {
//           const returns = { ...preState, ...sr() };
//           const h = () => ({
//             ...returns,
//             ...handler(returns),
//           });
//           const temp = generate(supply, returns, _key);
//           return {
//             ...returns,
//             ...temp,
//             handler: h,
//           };
//         },
//       };
//     });

//     return wrapSupply;
//   };
//   const hooks = {
//     handler,
//     init: () => {
//       init();
//       return hooks;
//     },
//     ...(generate(supply) as SS),
//   };
//   return hooks;
// }

/**
 * 미완성
 * handler 인자 타입과, constantSupply에 대한 조건식 미구현
 * supply 함수 묶을 생성해주는 함수
 * @param state - { searchSupply: searchAtom } 와 같이 서플라이 함수명, 아톰을 쌍으로 맵핑해서 넣어주셔야 합니다.
 * @example
 * {
 *     searchSupply: searchAtom,
 * }
 */
export function generateSupply<
    S extends object,
    SS extends {
        [key in keyof R]: RecoilState<S>;
    },
    RR extends { [key in keyof SS]: () => S },
    R = object,
>(state: SS) {
    const r: Partial<RR> = {};
    const keys = Object.keys(state) as (keyof SS)[];
    keys.forEach((key) => {
        r[key] = (() => useRecoilValue(state[key])) as RR[keyof SS];
    });
    return r as RR;
}

const storageEffect =
    (storage: Storage, key: string) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ({ onSet, setSelf }: any) => {
        const savedValue = storage.getItem(key);
        if (savedValue !== null) {
            setSelf(JSON.parse(savedValue));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSet((newValue: any, _: any, isReset: boolean) => {
            isReset || newValue === undefined
                ? storage.removeItem(key)
                : storage.setItem(key, JSON.stringify(newValue));
        });
    };
const localStorageEffect = (key: string) => storageEffect(localStorage, key);
const sessionStorageEffect = (key: string) => storageEffect(sessionStorage, key);

export function generateAtoms<S extends object>(
    key: string,
    state: S,
    options?: { localStorage?: boolean; sessionStorage?: boolean },
) {
    let atoms = {};
    Object.keys(state).map((k) => {
        const kk = k as keyof typeof state;
        const effects = [];
        if (options?.localStorage) effects.push(localStorageEffect(`${key}.${String(kk)}`));
        if (options?.sessionStorage) effects.push(sessionStorageEffect(`${key}.${String(kk)}`));
        atoms = {
            ...atoms,
            [kk]: atom<(typeof state)[keyof typeof state]>({
                key: `${key}.${String(kk)}`,
                default: state[kk],
                effects_UNSTABLE: effects,
            }),
        };
    });

    return atoms as { [key in keyof typeof state]: RecoilState<(typeof state)[key]> };
}

export function generateSelector<
    T extends object,
    A extends { [key in keyof T]: RecoilState<T[key]> },
>(key: string, atoms: A) {
    return selector<T>({
        key,
        get: ({ get }) => {
            return getterDeepComparison(get, atoms);
        },
        set: ({ reset, set }, newState) => {
            const state = newState as T;
            if (newState instanceof DefaultValue) {
                resetterDeepComparison(reset, atoms);
            }
            setterDeepComparison(set, state, atoms);
        },
    });
}

export function getterDeepComparison<
    T extends object,
    A extends { [key in keyof T]: RecoilState<T[key]> },
>(get: GetRecoilValue, atoms: A) {
    let state = {} as T;
    Object.keys(atoms).forEach((k) => {
        const key = k as keyof T;
        state = {
            ...state,
            [key]: get(atoms[key] as any),
        };
    });
    return state;
}

export function setterDeepComparison<
    T extends object,
    A extends { [key in keyof T]: RecoilState<T[key]> },
>(set: SetRecoilState, state: T, atoms: A) {
    Object.keys(state).forEach((k) => {
        const key = k as keyof T;
        set(atoms[key] as any, (ps: any) =>
            JSON.stringify(ps) === JSON.stringify(state[key]) ? ps : state[key],
        );
    });
    //
}

export function resetterDeepComparison<
    T extends object,
    A extends { [key in keyof T]: RecoilState<T[key]> },
>(reset: ResetRecoilState, atoms: A) {
    Object.keys(atoms).forEach((k) => {
        const key = k as keyof T;
        reset(atoms[key]);
    });
    //
}
