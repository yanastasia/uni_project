import React, { useState, useEffect } from "react";
import Note from "../components/Note";
import RightSideButtons from '../components/RightSideButtons';
import ColorButtons from "../components/ColorButtons";
import OkDeleteButtons from "../components/OkDeleteButtons";
import styles from '../../css/NotesPage.module.css';
import Header from "../Layouts/Header";
import { Inertia } from '@inertiajs/inertia';
import '../../css/StartingPage.css';


function NotesPage({ notes: initialNotes }) {
    const [isSelectOptionVisible, setIsSelectOptionVisible] = useState(false);
    const [text, setText] = useState('');
    const [color, setColor] = useState('light_green');
    const [selected, setSelected] = useState(false);
    const [votes, setVotes] = useState(0);
    const [noteIndex, setNoteIndex] = useState(-1);
    const [notes, setNotes] = useState(initialNotes || []);

    const currentURL = new URL(window.location.href);
    const pathSegments = currentURL.pathname.split('/');
    const boardId = pathSegments.pop();
    const title = pathSegments.pop();

    useEffect(() => {
        setNotes(initialNotes);
        setText('');
        setColor('light_green');
        setIsSelectOptionVisible(false);
    }, [initialNotes]);

    const handleEditClick = (index) => {
        const noteToEdit = notes[index];
        setText(noteToEdit.text);
        setColor(noteToEdit.color);
        setSelected(noteToEdit.selected);
        setVotes(noteToEdit.votes);
        setNoteIndex(index);
        setIsSelectOptionVisible(true);
    };

    const handleSingleClick = (noteIndex) => {
        const updatedNotes = notes.map((note, index) =>
            index === noteIndex ? { ...note, selected: !note.selected } : note
        );
        setNotes(updatedNotes);
        Inertia.put(`/notes/${notes[noteIndex].id}`, updatedNotes[noteIndex]);
    };

    const handleVoteClick = (noteIndex) => {
        const updatedNotes = notes.map((note, index) =>
            index === noteIndex ? { ...note, votes: note.votes + 1 } : note
        );

        Inertia.put(`/notes/${notes[noteIndex].id}`, updatedNotes[noteIndex]);
        setNotes(updatedNotes);
    };

    const componentProps = {
        setNotes,
        isSelectOptionVisible,
        setIsSelectOptionVisible,
        setNoteIndex,
        title,
        boardId,
        notes,
    };

    const buttonProps = {
        notes,
        setNotes,
        title,
        boardId,
        votes,
        noteIndex,
        setNoteIndex,
        text,
        setText,
        color,
        setColor,
        selected,
        setIsSelectOptionVisible,
    };

    return (
        <>
            <Header />
            <RightSideButtons {...componentProps} />
            <div className={styles.containerbackground}>
                <p>Stay Informed, Stay Ahead!</p>
            </div>

            <main>
                <div className={styles.notes}>
                    {notes.map((note, index) => (
                        <Note key={index}
                            text={note.text}
                            color={note.color}
                            selected={note.selected}
                            votes={note.votes}
                            onEditClick={() => handleEditClick(index)}
                            onSingleClick={() => handleSingleClick(index)}
                            onVoteClick={() => handleVoteClick(index)}
                        />
                    ))}
                </div>

                {
                    isSelectOptionVisible &&
                    <div className={styles.select_option} >
                        <textarea className={`${styles.box} ${styles[color]}`} value={text} onChange={(e) => setText(e.target.value)} />
                    </div>
                }

                {
                    isSelectOptionVisible && <ColorButtons setColor={setColor} />
                }

                {
                    isSelectOptionVisible && <OkDeleteButtons {...buttonProps} />

                }
            </main>
        </>
    );
}

export default NotesPage;

