import styles from '../../css/BoardsPage.module.css';

function CreateBoardForm({ title, setTitle, description, setDescription }) {

    return (
        <div className={styles.create_board_option} >
            <label htmlFor="title">Set Board's title</label>
            <textarea className={styles.box} id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <br />
            <label htmlFor="description">Set Board's description</label>
            <textarea className={styles.box} id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
    );
}

export default CreateBoardForm;