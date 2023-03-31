import React, { useEffect, useState } from "react";
import { CursorPropsType } from "../Types";


function Cursor({ disabled, onSubmit, text, setText }: CursorPropsType) {
    const [isBlinked, setIsBlinked] = useState(false);

    useEffect(()=>{
        // console.log('blinking');
        const blinkTimer = setTimeout(() => {
			setIsBlinked(false);
		}, 20)
        return () => clearTimeout(blinkTimer);
    },[isBlinked])

    const handleKeyDown = (e: KeyboardEvent) => {
        if(
            e.key === 'Shift' 
            || e.key === 'Control'
            || e.key === 'CapsLock'
            || e.key === 'Alt'
            || e.key === 'Meta'
            || e.key === 'Tab'
        ) return

        setIsBlinked(true);
        
        e.key === 'Backspace' 
            ? setText(text.slice(0, text.length - 1)) 
        : e.key === 'Enter' 
            ? onSubmit(text)
        : setText(text + e.key)
    };

    window.onkeydown = handleKeyDown;

    return (
        <div className="h-6">
            <p className="text-white text-left font-mono">{text}{!isBlinked && '█'}</p>
        </div>
    );
}

export default Cursor;
