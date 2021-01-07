export interface ChatState {
    test?: string;
}

export interface AlertState {
    test?: string;
}

export default interface ReduxState {
    chat: ChatState;
    alert: AlertState;
}