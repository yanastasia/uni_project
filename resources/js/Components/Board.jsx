import React, {useState, useEffect} from "react";
import styles from '../../css/BoardsPage.module.css';

function Board({ title, description, onEditClick, onSingleClick }) {  
    const [clickCount, setClickCount] = useState(0);

    useEffect(() => {
        let timer;
    
        if (clickCount === 1) {
          // Trigger single-click action after a delay (e.g., 300 milliseconds)
          timer = setTimeout(() => {
            onSingleClick(title);
            setClickCount(0); // Reset click count
          }, 300);
        } 
        else if (clickCount === 2) {
          // Trigger double-click action
          onEditClick();
          setClickCount(0); // Reset click count
        }
    
        // Clear the timer if the component unmounts or if a new click occurs
        return () => clearTimeout(timer);
      }, [clickCount, title, onSingleClick, onEditClick]);
    
      const handleClick = () => {
        // Increment click count on each click
        setClickCount((prevClickCount) => prevClickCount + 1);
      };

    return (
      <div
        className={styles.board}
        onClick={handleClick} >
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    );
  }

export default Board;