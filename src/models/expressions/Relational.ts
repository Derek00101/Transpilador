import { Instruction } from "../abstract/Instruction";

// Esta clase representa una comparación, como "a < b" o "x == y"
export class Relational implements Instruction {

    row: number;      // Fila donde está la comparación
    column: number;   // Columna donde está la comparación
    private exp1: Instruction | undefined; // Lado izquierdo de la comparación
    private exp2: Instruction | undefined; // Lado derecho de la comparación
    private operator: string;              // Operador, por ejemplo: <, >, ==, !=

    constructor(exp1: Instruction | undefined, exp2: Instruction | undefined, operator: string, row: number, column: number){
        this.row = row;
        this.column = column;
        this.exp1 = exp1;
        this.exp2 = exp2;
        this.operator = operator;
    }

    // Convierte la comparación en texto, por ejemplo: "a < b"
    transpiler(): string {

        let left: string = '';
        let right: string = '';

        if (this.exp1) {
            left = this.exp1.transpiler();
        }

        if (this.exp2) {
            right = this.exp2.transpiler();
        }

        return `${left} ${this.operator} ${right}`;
    }

}