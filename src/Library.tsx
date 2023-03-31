import { BlockType } from "./Types";

export const initialBlock : BlockType = {
    // animated: true,
    lines: [
        {
            text: ['Welcome Friend. This is a place to ask and answer questions.']
        },
        {
            text: ['Ape ', 'Bird ', 'Cat ', 'Dog' ],
            styles: [{color: 'white'}, {color: 'red'}, {}, {color: 'blue'}]
        },
        {
            text: ['a third line']
        }
    ]
}