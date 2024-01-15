import styles from '../../css/NotesPage.module.css';
import { Inertia } from '@inertiajs/inertia';
import Papa from 'papaparse';

function RightSideButtons({ setNotes, isSelectOptionVisible, setIsSelectOptionVisible, setNoteIndex, title, boardId, notes }) {

    const handleCreateStickyClick = () => {
        setIsSelectOptionVisible(!isSelectOptionVisible);
        setNoteIndex(-1);
    };

    const handleClearClick = () => {
        console.log('board_id:', boardId);
        setNotes([]);
        Inertia.delete(`/notes/truncate/${boardId}`);

    };

    const convertToCSV = (notesToExport) => {
        const csvData = Papa.unparse(notesToExport);
        return csvData;
    }

    const exportToCSV = () => {

        const columnsToExport = ['text', 'color', 'votes', 'selected'];
        const filteredData = notes.map((row) => {
            const newRow = {};
            columnsToExport.forEach((col) => {
                newRow[col] = row[col];
            });
            return newRow;
        })

        const selectedNotes = filteredData.filter((note) => note.selected);
        const notesToExport = selectedNotes.length > 0 ? selectedNotes : notes;

        const csvData = convertToCSV(notesToExport);
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        const fileName = 'notes.csv';

        // Create a download link
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', fileName);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    function parseCSVData(csvData) {
        const lines = csvData.split('\n');
        const parsedData = [];

        for (let i = 1; i < lines.length; i++) {
            const [text, color, votesStr] = lines[i].split(',');

            const votes = parseInt(votesStr, 10) || 0;
            parsedData.push({
                text,
                color,
                selected: false,
                votes,
                board_id: boardId,
            });
        }
        return parsedData;
    }

    const handleCSVImport = (e) => {
        const file = e.target.files[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const csvData = e.target.result;
            const parsedNotes = parseCSVData(csvData);

            const postPromises = parsedNotes.map(async (note) => {
                Inertia.post('/notes', note);
                return note; // Return the note for use in the next step
            });

            Promise.all(postPromises).then((updatedNotes) => {
                // After all requests are complete, update the notes state with the updatedNotes
                setNotes([...notes, ...updatedNotes]);
            });

        };
        console.log(notes);

        reader.readAsText(file);
    };

    return (
        <div className={styles.right_side_buttons}>
            <button id="create_button" className={styles.menu_buttons} onClick={handleCreateStickyClick}>
                Create Sticky
            </button>
            <button id="clear_board_button" className={styles.menu_buttons} onClick={handleClearClick}>
                Clear Board
            </button>
            <button id="export_button" className={styles.menu_buttons} onClick={exportToCSV}>
                Export CSV
            </button>
            <button id="import_button" className={styles.menu_buttons} onClick={() => document.getElementById('input_file').click()}>
                Import CSV
            </button>
            <input className={styles.input} type="file" id="input_file" accept=".csv" onChange={handleCSVImport} />
        </div>
    );
}

export default RightSideButtons;