import styles from '../../css/BoardsPage.module.css';
import { Inertia } from '@inertiajs/inertia';


function OkDeleteBoardButtons({ boards, setBoards, editIndex, setEditIndex, title, setTitle, description, setDescription, setCreateOptionVisible }) {

    const handleOkClick = () => {
        if (editIndex === -1) {
            const newBoard = {
                title: title,
                description: description,
                notes: [],
            };

            Inertia.post('/boards', newBoard);

            setTitle('');
            setDescription('');
            setBoards([...boards, newBoard]);
            setCreateOptionVisible(false);
        }
        else {
            const updatedBoards = [...boards];
            updatedBoards[editIndex] = { title: title, description: description, notes: [] };
            setBoards(updatedBoards);

            Inertia.put(`/boards/${boards[editIndex].id}`, updatedBoards[editIndex]);

            setTitle('');
            setDescription('');
            setEditIndex(-1);
            setCreateOptionVisible(false);
        }
    };

    function deleteBoard(id) {
        Inertia.delete(`/boards/${id}`);
    }

    const handleDeleteClick = () => {
        if (editIndex === -1) {
            setTitle('');
            setDescription('');
            setCreateOptionVisible(false);
        }
        else {
            deleteBoard(boards[editIndex].id);
            const updatedBoards = boards.filter((_, index) => index !== editIndex);
            setBoards(updatedBoards);

            setTitle('');
            setDescription('');
            setEditIndex(-1);
            setCreateOptionVisible(false);
        }
    };

    return (
        <div className={styles.creation_buttons}>
            <button id="OK_button" className={styles.lower_buttons} onClick={handleOkClick}>OK</button>
            <button id="delete_button" className={styles.lower_buttons} onClick={handleDeleteClick}>DELETE</button>
        </div>

    );
}

export default OkDeleteBoardButtons;