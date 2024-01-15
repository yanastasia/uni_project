import styles from '../../css/NotesPage.module.css';

function ColorButtons({setColor}) {

    const handleColorButtonClick = (event) => {
        const clickedColor = event.target.id;
        setColor(clickedColor);
    };

    
    return (
        <div className={styles.options}>
        <button id="light_green" className={styles.option_button} onClick={handleColorButtonClick} />
        <button id="light_yellow" className={styles.option_button} onClick={handleColorButtonClick} />
        <button id="light_purple" className={styles.option_button} onClick={handleColorButtonClick} />
        <button id="light_grey" className={styles.option_button} onClick={handleColorButtonClick} />
        <button id="light_orange" className={styles.option_button} onClick={handleColorButtonClick} />
        <button id="light_blue" className={styles.option_button} onClick={handleColorButtonClick} />
    </div>
    );
}

export default ColorButtons;