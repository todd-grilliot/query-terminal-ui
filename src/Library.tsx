import { LineType } from "./Types";

export const initialLines: LineType[] =  [
    {
        strings: ['Welcome Friend. This is a place to ask and answer questions.', 'PART TWO'],
        styles: [{color: 'white'}, {color: 'red'}]
    },
    {
        strings: ['This terminal accepts text input commands only. type -h or --help for help.', 'part two']
    },
    {
        strings: ['here are some accepted commands: ',]
    },
    {
        strings: ['getQuery ', "- grabs a new query from the database for you to answer."],
        styles: [{color: 'green'}, {}]
    }
];

export const otherLines: LineType[] = [
    {
        strings: ['Other Lines'],
    },
];
