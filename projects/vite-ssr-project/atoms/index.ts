import { generateAtoms, generateSelector } from './supplier';

export interface IHomeState {
    experience: string;
    introduction: string;
    skills: string;
}
export const homeState: IHomeState = {
    experience: '',
    introduction: '',
    skills: '',
};

export const homeAtoms = generateAtoms('homeState', homeState);
export const homeAtom = generateSelector<IHomeState, typeof homeAtoms>('homeState', homeAtoms);
