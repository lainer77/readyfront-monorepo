export interface ICardData {
    action?: string;
    body: string | string[];
    header?: string;
    id: number;
}
export type tSampleList = ISampleData[];
export interface ISampleData {
    draggable?: boolean;
    list: ICardData[];
    sort: 'asc' | 'desc';
}
