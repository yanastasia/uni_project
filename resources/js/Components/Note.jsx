import React, { useState, useEffect } from "react";
import styles from '../../css/NotesPage.module.css';

function Note({ text, color, selected, votes, onEditClick, onSingleClick, onVoteClick }) {
    const [clickCount, setClickCount] = useState(0);

    useEffect(() => {
        let timer;

        if (clickCount === 1) {
            timer = setTimeout(() => {
                onSingleClick();
                setClickCount(0);
            }, 300);
        }
        else if (clickCount === 2) {
            onEditClick();
            setClickCount(0);
        }

        return () => clearTimeout(timer);
    }, [clickCount, selected, onSingleClick, onEditClick]);

    const handleClick = () => {
        setClickCount((prevClickCount) => prevClickCount + 1);
    };

    const handleVoteClick = (e) => {
        e.stopPropagation();
        onVoteClick();
    };

    return (

        <div className={`${styles.sticky_notes} ${styles[color]} ${selected ? styles.selected : ""}}`}
            style={{ opacity: selected ? 0.7 : 1 }}
            onClick={handleClick} >
            {text}
            <button className={styles.vote_button} onClick={handleVoteClick}>{votes}</button>
        </div>
    );
}

export default Note;

