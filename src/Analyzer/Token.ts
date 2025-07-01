// Este enum es como una lista de nombres para todos los tipos de palabras o símbolos que puede encontrar el programa.
// Por ejemplo: llaves, paréntesis, números, palabras reservadas, etc.
export enum Type {
    UNKNOW,        // Algo que no se reconoce
    KEY_O,         // Llave de apertura {
    KEY_C,         // Llave de cierre }
    BRA_O,         // Corchete de apertura [
    BRA_C,         // Corchete de cierre ]
    PAR_O,         // Paréntesis de apertura (
    PAR_C,         // Paréntesis de cierre )
    SEMICOLON,     // Punto y coma ;
    COMMA,         // Coma ,
    PERIOD,        // Punto .
    ASSIGN,        // Signo igual =
    PLUS,          // Suma +
    MINUS,         // Resta -
    MULT,          // Multiplicación *
    DIV,           // División /
    INC,           // Incremento ++
    DEC,           // Decremento --
    EQUAL,         // Igualdad ==
    DIFF,          // Diferente !=
    LESS,          // Menor <
    GREATER,       // Mayor >
    LESS_EQ,       // Menor o igual <=
    GREATER_EQ,    // Mayor o igual >=
    IDENTIFIER,    // Nombre de variable o función
    INTEGER,       // Número entero
    DECIMAL,       // Número decimal
    COMMENT,       // Comentario de una línea
    MULTICOMMENT,  // Comentario de varias líneas
    STRING,        // Texto entre comillas
    CHAR,          // Un solo carácter
    R_USING,       // Palabra reservada 'using'
    R_SYSTEM,      // Palabra reservada 'System'
    R_PUBLIC,      // Palabra reservada 'public'
    R_CLASS,       // Palabra reservada 'class'
    R_STATIC,      // Palabra reservada 'static'
    R_VOID,        // Palabra reservada 'void'
    R_MAIN,        // Palabra reservada 'Main'
    R_STRING,      // Palabra reservada 'string'
    R_INT,         // Palabra reservada 'int'
    R_FLOAT,       // Palabra reservada 'float'
    R_CHAR,        // Palabra reservada 'char'
    R_BOOL,        // Palabra reservada 'bool'
    R_FALSE,       // Palabra reservada 'false'
    R_TRUE,        // Palabra reservada 'true'
    R_CONSOLE,     // Palabra reservada 'Console'
    R_WRITELINE,   // Palabra reservada 'WriteLine'
    R_IF,          // Palabra reservada 'if'
    R_ELSE,        // Palabra reservada 'else'
    R_FOR          // Palabra reservada 'for'
}

// Esta clase representa una "ficha" o token que el programa encuentra en el texto.
// Cada ficha tiene un tipo, el texto que encontró, y en qué fila y columna está.
export class Token {

    private typeTokenString: string; // El nombre del tipo de ficha, como "IDENTIFIER" o "PLUS"
    private typeToken: Type;         // El tipo de ficha, usando el enum de arriba
    private lexeme: string;          // El texto exacto que encontró, por ejemplo: "if", "x", "123"
    private row: number;             // En qué fila del texto está la ficha
    private column: number;          // En qué columna del texto está la ficha

    // Cuando creamos una ficha nueva, le decimos su tipo, texto, fila y columna
    constructor(typeToken: Type, lexeme: string, row: number, column: number) {
        this.typeTokenString = Type[typeToken]; // Guarda el nombre del tipo
        this.typeToken = typeToken;             // Guarda el tipo
        this.lexeme = lexeme;                   // Guarda el texto
        this.row = row;                         // Guarda la fila
        this.column = column;                   // Guarda la columna
    }

    // Devuelve el tipo de ficha (por ejemplo, Type.IDENTIFIER)
    getType(): Type {
        return this.typeToken;
    }

    // Devuelve el texto exacto de la ficha (por ejemplo, "if", "x", "123")
    getLexeme(): string {
        return this.lexeme;
    }

    // Devuelve la fila donde está la ficha
    getRow(): number {
        return this.row;
    }

    // Devuelve la columna donde está la ficha
    getColumn(): number {
        return this.column;
    }

    // Devuelve el nombre del tipo de ficha como texto (por ejemplo, "IDENTIFIER")
    getTypeTokenString(): string {
        return this.typeTokenString;
    }
}