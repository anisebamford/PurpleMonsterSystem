// Important: Do not move this file. It is used by a script to generate code.

export interface PMSEvent<T extends string, TMessage> {
    type: T;
    timestamp: string;
    id: string;
    entityId: string;
    message: TMessage;
    userId: string;
    source?: string;
}

