export type BlockType = {
    animated?: boolean;
    speed?: number;
    lines: LineType[];
}

export type LineType = {
    text: string[];
    styles?: any[];
}

export type CursorPropsType = {
    disabled?: boolean;
    onSubmit: Function;
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
};