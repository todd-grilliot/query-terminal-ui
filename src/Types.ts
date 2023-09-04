
// blocks should only handle things related to the block.
export type BlockPropsType = {
    lines: LineType[];
    animated?: boolean;
    speed?: number;
    finishCallback?: () => void; // figure out in a minute
}


export type CallType<ResponseGeneric> = {
    // our function API call.
    promise: (...args: any[]) => Promise<ResponseGeneric | null>;
    // the Line that will be displayed if the call fails
    failMessage: LineType;
    // the fields that will be read from the response.
    // the call
    readFields: string[];
    // headers that will be shown before the response.
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
