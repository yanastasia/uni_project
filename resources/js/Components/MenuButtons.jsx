import styles from '../../css/BoardsPage.module.css';
import { Inertia } from '@inertiajs/inertia';

function MenuButtons({setBoards, setEditIndex, isCreateOptionVisible, setCreateOptionVisible}) {
    
    const handleCreateBoardClick = () => {
        setCreateOptionVisible(!isCreateOptionVisible);
        setEditIndex(-1);
    };

    const handleClearClick = () => {
        setBoards([]);
        Inertia.delete('/boards/truncate');
    };


    return (
        <div className={styles.side_buttons}>
            <button id="create_board_button" className={styles.menu_buttons} onClick={handleCreateBoardClick}>Create Board</button>
            <button id="clear_board_button" className={styles.menu_buttons} onClick={handleClearClick}>Clear Display</button>
        </div>

    );
}

export default MenuButtons;