export interface IUseResponsesStoreState {
    message: string;
    setMessage: (message: string) => void;
    code: number;
    setCode: (code: number) => void;
    setMessageCodeDefault: () => void;
}