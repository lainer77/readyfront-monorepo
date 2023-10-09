import { DefaultValue, atom, selector } from 'recoil';

// Atom 정의
export const experienceState = atom<string>({
    key: 'homeState.experience2', // 고유한 식별자
    default: '', // 초기값
});

export const introductionState = atom<string>({
    key: 'homeState.introduction2',
    default: '',
});

export const skillsState = atom<string>({
    key: 'homeState.skills2',
    default: '',
});

// Selector 정의
export const homeState = selector<IHomeState>({
    key: 'homeState2',
    get: ({ get }) => {
        const experience = get(experienceState);
        const introduction = get(introductionState);
        const skills = get(skillsState);

        return {
            experience,
            introduction,
            skills,
        };
    },
    set: ({ set }, newValue) => {
        if (newValue instanceof DefaultValue) return;

        if (typeof newValue === 'object' && newValue !== null) {
            set(experienceState, newValue.experience);
            set(introductionState, newValue.introduction);
            set(skillsState, newValue.skills);
        }
    },
});

export interface IHomeState {
    experience: string;
    introduction: string;
    skills: string;
}
