import React, { useState, useEffect } from "react";

import Chalk from "./Chalk";

type LineProps = {
    // v?: string,
    animated?: boolean;
    speed?: number;
    // onTypingComplete: Function,
    lines: {
        text: string[];
        styles?: {}[];
    }[];
};

// wait but we're going to be maping within a map.. it's like a matrix. What if value and style was just able to take an array? no we'd still have to map through those..
// we might just have to map a map..

// is it possible to set default styles for all the lines?

function Block2({ animated = false, speed = 180, lines, ...props }: LineProps) {
    const [shownLineLength, setShownLineLength] = useState(0);
	const [shownLines, setShownLines] = useState(0);

    useEffect(() => {
		// console.log('shownlinelen', shownLineLength);
        const timer = setTimeout(() => {
			// console.log('interval');
			setShownLineLength(shownLineLength + 1);
		}, 100);
		
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
				// console.log('mapping through lines, index, shownlines', index + 1, shownLines);
				if(index > shownLines) return;

				const isCurrentLine = index === shownLines;
				console.log('iscurline', isCurrentLine);
				const lineLength = line.text.reduce((total, text) => text.length + total, 0);
				// console.log('line len', lineLength);

				//wait maybe we can reduce these texts instead of mapping throught them. That might be simpler logic. since we are already reducing.
				// what would that look like? render the reduced result of these strings? for each line? right now I'm mapping through every phrase and slicing it..
				// right now i want to tell all the words to render based on the line they are in... is reduce really simpler? i think they all need to be unique spans..
				return (
					<div key={index}>

						{line.text.map((text, i) => {
							
							// console.log('heres our young lad, index, linelen', i, shownLineLength);
							if(shownLineLength >= lineLength) startNewLine();
							
							const previousWordsLen = line.text.reduce((total, reduceText, reduceIndex) => {
								console.log('text, redI, I:', reduceText, reduceIndex, i);
								if(reduceIndex >= i) {
									console.log('not adding this one');
									return total
								};
								return reduceText.length + total;
							}, 0);
							console.log('prevlen, text:', previousWordsLen, text);

							const slicedLine = text.slice(0, Math.max(shownLineLength - previousWordsLen, 0));
							// console.log('text, shown, prev:', text, shownLineLength, previousWordsLen);
							// console.log('slicedLine:', slicedLine);
							
							const displayText = isCurrentLine ? slicedLine : text;
							// console.log('desplayText', displayText);

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
						{/* {line.text[currentLineIndex][currentIndex]} */}
					</div>
				)

			})}
        </div>
    );
}

// map through all my little strings, and show the whole thing if shownLineLength is long enough, otherwise just show a part.
// so we need to know if shownLineLen is long enough... what is long enough?
// long enough to show the whole word. longer than the words that came before it.
// we need to know the length of the words that came before.. if we are on the third word, and each word is 4 char. we need to know if shownLenght matters to us
// if shownLength is greater than the length of this word and all the words before it, show the whole word.
// otherwise, how many char to show? the difference between shownlen and the len of all the words before it.
// so we need the length of all previous words.
// how do we get to the next word?
// show the whole word if showlen is greater than len of all the rest.. but when it's bigger than my word, will i start the next word?
// i think all the lines are still showing all at once.
// we need to say, when not to show the other words. when we haven't gotten to it yet. I could make them all empty strings, slice them to 0,
// or I could make a state for how many words are shown in the current line.. let's try the 0 slice.

//what if i did it all in a big slice.. if not ready to be shown, slice(0,0), if already shown, slice(0, len), if being shown, shclise(0, shown - prev ?)
// oh I want to do negative slicing..? to count down to zero? wait no i don't.. or do i? 
// already shown.. show line is greater than prev. otherwise it's being shown. and show line will count up by one. so the slice will too.
// slice(0,1), slice(0,2), slice(0,3), until we get to the length of the string itself. then prev will be greater than the one before it.
// Math.max(num, 0); - turns negatives into 0. 
// so... slice(0, Math.max( showlen - prev, 0))

//previous lines aren't showing now.
// i don't know how i feel about just counting forever but it seems to be working actually.
//when we pass to the next line we start over and that doesn't seem ideal.

export default Block2;
