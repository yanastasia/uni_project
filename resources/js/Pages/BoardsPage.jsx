import React, { useState } from 'react';
import styles from '../../css/BoardsPage.module.css';
import { Inertia } from '@inertiajs/inertia';
import Board from '../components/Board';
import MenuButtons from '../components/MenuButtons';
import CreateBoardForm from '../components/CreateBoardForm';
import OkDeleteBoardButtons from '../components/OkDeleteBoardButtons';
import Header from '../Layouts/Header';


function BoardsPage({boards: initialBoards}) {
    const [isCreateOptionVisible, setCreateOptionVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [editIndex, setEditIndex] = useState(-1);
    const [boards, setBoards] = useState(initialBoards);


    const handleEditClick = (index) => {
        const boardToEdit = boards[index];
        setTitle(boardToEdit.title);
        setDescription(boardToEdit.description);
        setEditIndex(index);
        setCreateOptionVisible(true);
    };

    const handleSingleClick = (clickedTitle, boardId) => {
        Inertia.visit(`/notes/${encodeURIComponent(clickedTitle)}/${encodeURIComponent(boardId)}`);
        //Inertia.visit(`/notes?title=${encodeURIComponent(clickedTitle)}&id=${encodeURIComponent(boardId)}`); ///
    };

    const componentProps = {
        isCreateOptionVisible,
        setCreateOptionVisible,
        setBoards,
        setEditIndex
    };

    const buttonProps = {
        boards,
        setBoards,
        editIndex,
        setEditIndex,
        title,
        setTitle,
        description,
        setDescription,
        setCreateOptionVisible
    };

    return (
        <>
           <Header/>
            <MenuButtons {...componentProps} />
            <div className={styles.containerbackground}>
                <p>Yonko's Design Thinking App</p>
            </div>

            <div className={styles.boards}>
                {boards.map((board, index) => (
                    <Board
                        key={index}
                        title={board.title}
                        description={board.description}
                        onEditClick={() => handleEditClick(index)}
                        onSingleClick={(clickedTitle) => handleSingleClick(clickedTitle, board.id)} />
                ))}
            </div>


            {
                isCreateOptionVisible && <CreateBoardForm title={title} setTitle={setTitle} description={description} setDescription={setDescription} />
            }

            {
                isCreateOptionVisible && <OkDeleteBoardButtons {...buttonProps} />
            }
        </>
    );
}

export default BoardsPage;