import styles from '../../css/NotesPage.module.css';
import { Inertia } from '@inertiajs/inertia';


function OkDeleteButtons({ notes, setNotes, title, boardId, votes, noteIndex, setNoteIndex, text, setText, color, setColor, selected, setIsSelectOptionVisible }) {

    const handleOkClick = () => {
        if (noteIndex === -1) {
            if (text.trim()) {
                const newNote = {
                    text: text,
                    color: color,
                    selected: selected,
                    votes: votes,
                    board_id: boardId,
                };

                //HERE!!!
                
                //fetch, axios
                /* Inertia.post('/notes', newNote, {
                     onSuccess: (res) => {
                         console.log('res: ', res);
                         setNotes(res.notes);
                         setText('');
                         setColor('light_green');
                         setIsSelectOptionVisible(false);
 
                     }
                 });*/
                Inertia.post('/notes', newNote);

            }

        }
        else {
            const updatedNotes = [...notes];
            updatedNotes[noteIndex] = { text: text, color: color, selected: selected, votes: votes };
            Inertia.put(`/notes/${notes[noteIndex].id}`, updatedNotes[noteIndex]);
            //setNotes(updatedNotes);

            setText('');
            setColor('light_green');
            setNoteIndex(-1);
            setIsSelectOptionVisible(false);
        }

    };

    function deleteNote(id) {
        Inertia.delete(`/notes/${id}`);
    }

    const handleDeleteClick = () => {
        if (noteIndex === -1) {
            setText('');
            setColor('light_green');
            setIsSelectOptionVisible(false);
        }
        else {
            deleteNote(notes[noteIndex].id);
            const updatedNotes = notes.filter((_, index) => index !== noteIndex);
            setNotes(updatedNotes);
            setText('');
            setColor('light_green');
            setNoteIndex(-1);
            setIsSelectOptionVisible(false);
        }
    };

    return (
        <div className={styles.color_buttons} >
            <button id="OK_button" className={styles.lower_buttons} onClick={handleOkClick}>
                OK
            </button>
            <button id="delete_button" className={styles.lower_buttons} onClick={handleDeleteClick}>
                DELETE
            </button>
        </div>
    );
}

export default OkDeleteButtons;