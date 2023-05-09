
export type BlockPropsType = BlockType & {
    handleResponse: (response: ValidResponseType | null) => void;
}
export type BlockType = {
    animated?: boolean;
    speed?: number;
    initLines: LineType[];
    call?: CallType<ValidResponseType>;
    lineAfterCall?: LineType;
    chain?: Record<string, any>;
    input?: null | string;
}

export type CallType<ResponseGeneric> = {
    promise: (...args: any[]) => Promise<ResponseGeneric | null>;
    failMessage: LineType;
    readFields: string[];
    readHeaders?: string[];
}

export type LineType = {
    strings: string[];
    styles?: React.CSSProperties[];
}

export type CursorPropsType = {
    disabled?: boolean;
    onSubmit: Function;
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
};

export type CurrentLinePropsType = {
    lines: LineType[];
    animated: boolean;
    speed: number;
    currentLineIndex: number;
    setCurrentLineIndex: React.Dispatch<React.SetStateAction<number>>
    // currentLineLength: number;
}

export type ValidResponseType = QueryResponseType;

export function isValidResponseKey(key: string): key is keyof ValidResponseType {
    const validKeys: Array<keyof ValidResponseType> = [
      'answer',
      'index',
      'query',
      'timestamp',
      'vetos',
      '_id',
    ];
  
    return validKeys.includes(key as keyof ValidResponseType);
  }

export type QueryResponseType = {
    answer: string;
    index: number;
    query: string;
    timestamp: number;
    vetos: number;
    _id: string;
}
