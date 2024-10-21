export async function getBoard (idGame) {
    try{
        const response = await fetch (
            'http://127.0.0.1:8000/board_status/' + idGame,
            {
                method : 'GET',
                headers : {'Content-Type' : 'application/JSON'},
            }
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();
        const boardData = responseData.board;
        const newBoard = Array(36).fill(null);
        let index = 0;

        boardData.forEach(row => {
            row.forEach(cell => {
                if (cell === "B") {
                    newBoard[index] = "primary"; 
                } else if (cell === "R") {
                    newBoard[index] = "danger";  
                } else if (cell === "Y") {
                    newBoard[index] = "warning"; 
                } else if (cell === "G") {
                    newBoard[index] = "success"; 
                }

                index++;
            });
        });

        return newBoard;
    }
    catch (error){
        console.log("Error fetching the board: ", error);
        return null;
    }
}