import React, { useState, useEffect } from "react";
import { BlockType, LineType } from "../Types";


// does block need a finished flag?
//to say when the cursor is allowed to write? or maybe on a key press it would just change itself to not animated.
// also normally the command line stays in the same place.

function Block({ animated = true, speed = 40, lines, ...props }: BlockType) {
    const [shownLineLength, setShownLineLength] = useState(0);
	const [shownLines, setShownLines] = useState(0);

    useEffect(() => {
		if(!animated) return;
		if(shownLines > lines.length) return;

        const timer = setTimeout(() => {
			setShownLineLength(shownLineLength + 1);
		}, speed);
		
        return () => clearTimeout(timer);
    }, [shownLineLength]);

	function startNewLine(){
		if(shownLines > lines.length) return;
		setShownLineLength(0);
		setShownLines(shownLines + 1);
	}

    return (
        <div className="text-left">
            {lines.map((line, index) => {

				if(index > shownLines && animated) return;

				const isCurrentLine = index === shownLines;
				const lineLength = line.text.reduce((total, text) => text.length + total, 0);

				return (
					<div key={index}>

						{line.text.map((text, i) => {
							if(shownLineLength >= lineLength) startNewLine();
							
							const previousWordsLen = line.text.reduce((total, reduceText, reduceIndex) => {
								if(reduceIndex >= i) return total;
								return reduceText.length + total;
							}, 0);

							const slicedLine = text.slice(0, Math.max(shownLineLength - previousWordsLen, 0));							
							const displayText = animated 
								? isCurrentLine ? slicedLine : text 
								: text;

							return (
								<span
									className="text-white font-mono"
									key={i}
									style={line.styles ? { ...line.styles[i] } : {}}
								>
									{displayText}
								</span>
							)
						})}
					</div>
				)

			})}
        </div>
    );
}

export default Block;
