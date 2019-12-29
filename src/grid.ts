
export class SudokuGrid {
    public squares: number[]

    private constructor(arr: number[]){
        this.squares = arr;
    }

    static from1DArray(arr: number[]): SudokuGrid {
        return new SudokuGrid(arr);
    }
    
    isSolved(): boolean {
        return this.isValid() && this.isFull() 
    }
    
    isValid(): boolean {
        for(let i = 0; i < 9; i++){
            if(!this.isRowValid(i) || !this.isColumnValid(i) || !this.isSquareValid(i)){
                return false;
            }
        }
        
        return true;
    }

    private isSquareValid(squareIndex: number): boolean {
        let group = []

        let squareTopLeftColumn = (squareIndex % 3) * 3;
        let squareTopLeftRow = Math.floor(squareIndex / 3);
        let topLeftIndex = (9 * 3 * squareTopLeftRow) + squareTopLeftColumn; 

        for(let i = 0; i < 3; i++){
            let firstIndexInRow = topLeftIndex + (9 * i);
            for(let j = 0; j < 3; j++){
                group.push(firstIndexInRow + j);
            }
        }

        return this.isGroupValid(group);
    }

    private isColumnValid(columnIndex: number): boolean {
        let group = []
        for(let i = 0; i < 9; i++){
            group.push(columnIndex + (i*9));
        }
        return this.isGroupValid(group);
    }

    private isRowValid(rowIndex: number): boolean {
        let group = []
        for(let i = 0; i < 9; i++){
            group.push(i + (rowIndex*9));
        }
        return this.isGroupValid(group);
    }

    private isGroupValid(groupIndices: number[]): boolean {
        let groupValues = groupIndices.map(index => this.squares[index])
                                      .filter(square => square != 0);

        return groupValues.length == new Set(groupValues).size
    }

    isFull() : boolean {
        return this.squares.every(square => square != 0);
    }

    toString(): string {
        let result = "";
        result += "--------+-------+--------";
        result += "\n";
        for(let i = 0; i < 9; i++){
            result += "| ";
            for(let j = 0; j < 9; j++){
                let squareValue = this.squares[j + (i*9)];
                if (squareValue == 0){
                    result += " ";
                }
                else{
                    result += squareValue.toString();
                }

                if (j != (9 - 1)){
                    if(j % 3 == 2){
                        result += " | ";
                    }
                    else{
                        result += " ";
                    }
                }

            }
            result += " |";
            result += "\n";
            if(i % 3 == 2){
                result += "--------+-------+--------";
            }
            else{
                result += "|       |       |       |";
            }
            result += "\n";
        }
        return result;
    }

}