
import { SudokuGrid } from "./grid"
import { solve } from "./solver"

let grid = SudokuGrid.from1DArray([
    7, 3, 0, 0, 0, 0, 0, 0, 0,
    0, 9, 4, 0, 5, 8, 0, 0, 0,
    5, 0, 0, 0, 7, 0, 4, 9, 0,
    3, 6, 0, 7, 0, 5, 0, 0, 4,
    0, 5, 7, 4, 8, 0, 0, 6, 0,
    0, 8, 0, 0, 0, 6, 0, 0, 0, 
    0, 7, 0, 5, 0, 2, 0, 4, 0,
    8, 0, 0, 9, 0, 0, 0, 7, 0,
    0, 0, 0, 8, 0, 7, 0, 0, 0 
])

console.log(grid.toString());
console.log();

if (solve(grid)){
    console.log(grid.toString());
}
else {
    console.error("Could not solve!");
}