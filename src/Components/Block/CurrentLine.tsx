import React, { useEffect, useState } from 'react';
import { CurrentLinePropsType } from '../../Types';

/** current line is the line being printed, intended to be the child of a block component */
export default function CurrentLine({
    lines,
    animated,
    speed,
    currentLineIndex,
    setCurrentLineIndex,
}: CurrentLinePropsType) {

	const [currentLineLength, setCurrentLineLength] = useState(0);
    
	const currentLine = lines[currentLineIndex];
	const lineLength = currentLine?.strings.reduce((total, str) => (str?.length ?? 0) + total, 0);

    useEffect(() => {
		if(!animated) {
			setCurrentLineLength(lineLength);
			return;
		}
		if(currentLineIndex >= lines.length) return;

        const timer = setTimeout(() => {
			setCurrentLineLength(currentLineLength + 1);
		}, speed);

        return () => clearTimeout(timer);
	},[currentLineIndex, currentLineLength, lines.length, speed, animated]);

    useEffect(() => {
        if(currentLineLength >= lineLength) nextLine();
    },[currentLineLength])

	function nextLine(){
		setCurrentLineLength(0);
		setCurrentLineIndex(currentLineIndex + 1);
	}



    return (
            <div>
				{ 
				// current line animates until it finishes and then jumps to next line.
				currentLine &&
				currentLine.strings.map((str, idx) => {

					// add up the lenth of the strings before this one.
					const prevStringsLength = currentLine.strings.reduce((totalLen, str, reduceIdx) => (
							(reduceIdx >= idx) ? totalLen : str.length + totalLen
						), 0);

					// show just what's allowed. Previous strings show in full, current shows partial, future strings max at 0.
					const slicedString = str?.slice(0, Math.max(currentLineLength - prevStringsLength, 0)) ?? '';

					return (
						<span
							className="text-white font-mono"
							key={idx}
							style={currentLine.styles ? {...currentLine.styles[idx] }  : {}}
						>
							{slicedString}
						</span>
					)
				})}

			</div>
    );
}