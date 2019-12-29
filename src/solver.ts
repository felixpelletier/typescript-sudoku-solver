import { SudokuGrid } from "./grid"
import { runInNewContext } from "vm";

export function solve(grid: SudokuGrid): boolean {
    return new SudokuSolver(grid).solve();
}

class SudokuSolver {

    private grid: SudokuGrid;
    private unsolved_indexes: number[];
    private solution_index: number;
    
    constructor(grid: SudokuGrid){
        this.grid = grid;
        this.unsolved_indexes = [];
        this.solution_index = 0;

        for(let i = 0; i < this.grid.squares.length; i++){
            if(grid.squares[i] == 0){
                this.unsolved_indexes.push(i);
            }
        }
    }

    public solve(): boolean {

        let nextUnsolvedIndex = this.getNextUnsolvedIndex();
        if(nextUnsolvedIndex == null)
        {
            return this.grid.isSolved();
        }
        else
        {
            if(this.grid.squares[nextUnsolvedIndex] < 9){
                this.grid.squares[nextUnsolvedIndex]++;
                if(this.grid.isValid()){
                    this.solution_index++;
                }
            }
            else {
                // Backtrack
                this.grid.squares[nextUnsolvedIndex] = 0;
                this.solution_index--;
            }

            return this.solve();

        }

    }

    private getNextUnsolvedIndex(): number {
        if (this.solution_index < this.unsolved_indexes.length){
            return this.unsolved_indexes[this.solution_index]
        } 

        return null;
    }
}