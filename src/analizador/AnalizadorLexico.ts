import { Token, Type } from "./Token";

type ReservedWords = {
    lexeme: string;
    token: Type;
}

export class AnalizadorLexico {

    private state: number;
    private auxChar: string;
    private row: number;
    private column: number;
    private tokenList: Token[];
    private errorList: Token[];
    private colors: string;
    private reservedWords: ReservedWords[]; 

    constructor() {
        this.state = 0;
        this.column = 1;
        this.row = 1;
        this.auxChar = '';
        this.tokenList = []; 
        this.errorList = [];
        this.reservedWords = [
            { lexeme: 'using', token: Type.R_USING },
            { lexeme: 'System', token: Type.R_SYSTEM },
            { lexeme: 'public', token: Type.R_PUBLIC },
            { lexeme: 'class', token: Type.R_CLASS },
            { lexeme: 'static', token: Type.R_STATIC },
            { lexeme: 'void', token: Type.R_VOID },
            { lexeme: 'Main', token: Type.R_MAIN },
            { lexeme: 'string', token: Type.R_STRING },
            { lexeme: 'int', token: Type.R_INT },
            { lexeme: 'float', token: Type.R_FLOAT },
            { lexeme: 'char', token: Type.R_CHAR },
            { lexeme: 'bool', token: Type.R_BOOL },
            { lexeme: 'false', token: Type.R_FALSE },
            { lexeme: 'true', token: Type.R_TRUE },
            { lexeme: 'Console', token: Type.R_CONSOLE },
            { lexeme: 'Writeline', token: Type.R_WRITELINE },
            { lexeme: 'if', token: Type.R_IF },
            { lexeme: 'else', token: Type.R_ELSE },
            { lexeme: 'for', token: Type.R_FOR }
        ]; 
        this.colors = '';
    }

    scanner(input: string) {

        input += "#"
        
        let char: string;

        for (let i = 0; i < input.length; i++) {
            char = input[i];

            switch (this.state) {
                case 0: // Initial state
                    switch (char) {
                        case '{':
                            this.addChar(char);
                            this.state = 1;
                            break;
                        case '}':
                            this.addChar(char);
                            this.state = 2;
                            break;
                        case '[':
                            this.addChar(char);
                            this.state = 3;
                            break;
                        case ']':
                            this.addChar(char);
                            this.state = 4;
                            break;
                        case '(':
                            this.addChar(char);
                            this.state = 5;
                            break;
                        case ')':
                            this.addChar(char);
                            this.state = 6;
                            break;
                        case ';':
                            this.addChar(char);
                            this.state = 7;
                            break;
                        case ',':
                            this.addChar(char);
                            this.state = 8;
                            break;
                        case '.':
                            this.addChar(char);
                            this.state = 9;
                            break;
                        case '=':
                            this.addChar(char);
                            this.state = 10;
                            break;
                        case '+':
                            this.addChar(char);
                            this.state = 12;
                            break;
                        case '-':
                            this.addChar(char);
                            this.state = 14;
                            break;
                        case '*':
                            this.addChar(char);
                            this.state = 16;
                            break;
                        case '!':
                            this.addChar(char);
                            this.state = 17;
                            break;
                        case '<':
                            this.addChar(char);
                            this.state = 19;
                            break;
                        case '>':
                            this.addChar(char);
                            this.state = 21;
                            break;
                        case '/':
                            this.addChar(char);
                            this.state = 23;
                            break;
                        case '"':
                            this.addChar(char);
                            this.state = 32;
                            break;
                        case "'":
                            this.addChar(char);
                            this.state = 34;
                            break;
                        case ' ':
                            this.column++;
                            this.colors += `${char}`;
                            break;
                        case '\n':
                        case '\r':
                            this.row++;
                            this.column = 1;
                            this.colors += `${char}`;
                            break;
                        case '\t':
                            this.column += 4;
                            this.colors += `${char}`;
                            break;
                        default:
                            if (/[a-zA-Z]/.test(char)) {
                                this.addChar(char);
                                this.state = 28; // Identifier state
                                continue;
                            }

                            if (/[0-9]/.test(char)) {
                                this.addChar(char);
                                this.state = 29; // Integer state
                                continue;
                            }

                            if (char == '#' && i == input.length - 1) {
                                console.log("End of file reached");
                            } else {
                                this.addError(char, this.row, this.column);
                                this.column++;
                            }

                            break;
                    }
                    break;
                    case 1: // {
                        this.addToken(Type.KEY_O, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.colors += `${this.auxChar}`;
                        this.clean();
                        i--; // Adjust index since we already processed this character
                        break;
                    case 2: // }
                        this.addToken(Type.KEY_c, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.colors += `${this.auxChar}`;
                        this.clean();
                        i--; // Adjust index since we already processed this character
                        break;
                    case 3: // [
                        this.addToken(Type.BRA_O, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.colors += `${this.auxChar}`;
                        this.clean();
                        i--; // Adjust index since we already processed this character
                        break;
                    case 4: // ]
                        this.addToken(Type.BRA_C, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.colors += `${this.auxChar}`;
                        this.clean();
                        i--; // Adjust index since we already processed this character
                        break;
                    case 5: // (
                        this.addToken(Type.PAR_O, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.colors += `${this.auxChar}`;
                        this.clean();
                        i--; // Adjust index since we already processed this character
                        break;
                    case 6: // )
                        this.addToken(Type.PAR_C, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.colors += `${this.auxChar}`;
                        this.clean();
                        i--; // Adjust index since we already processed this character
                        break;
                    case 7: // ;
                        this.addToken(Type.SEMICOLON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.colors += `${this.auxChar}`;
                        this.clean();
                        i--; // Adjust index since we already processed this character
                        break;
                    case 8: // ,
                        this.addToken(Type.COMMA, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.colors += `${this.auxChar}`;
                        this.clean();
                        i--; // Adjust index since we already processed this character
                        break;
                    case 9: // .
                        this.addToken(Type.PERIOD, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.colors += `${this.auxChar}`;
                        this.clean();
                        i--; // Adjust index since we already processed this character
                        break;
                    case 10: // =
                        if (char == '=') {
                            this.addChar(char);
                            this.state = 11; // Equal state
                            continue;
                        } 

                        this.addToken(Type.ASSIGN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.colors += `${this.auxChar}`;
                        this.clean();
                        i--; // Adjust index since we already processed this character
                        break;
                    case 11: // ==
                        this.addToken(Type.EQUAL, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.colors += `${this.auxChar}`;
                        this.clean();
                        i--; // Adjust index since we already processed this character
                        break;
                    case 12: // +
                        if (char == '+') {
                            this.addChar(char);
                            this.state = 13; // Increment state
                            continue;
                        }

                        this.addToken(Type.PLUS, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.colors += `${this.auxChar}`;
                        this.clean();
                        i--; // Adjust index since we already processed this character
                        break;
                    case 13: // ++
                        this.addToken(Type.INC, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.colors += `${this.auxChar}`;
                        this.clean();
                        i--; // Adjust index since we already processed this character
                        break;
                    case 14: // -
                        if (char == '-') {
                            this.addChar(char);
                            this.state = 15; // Decrement state
                            continue;
                        }

                        this.addToken(Type.MINUS, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.colors += `${this.auxChar}`;
                        this.clean();
                        i--; // Adjust index since we already processed this character
                        break;
                    case 15: // --
                        this.addToken(Type.DEC, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.colors += `${this.auxChar}`;
                        this.clean();
                        i--; // Adjust index since we already processed this character
                        break;
                    case 16: // *
                        this.addToken(Type.MULT, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.colors += `${this.auxChar}`;
                        this.clean();
                        i--; // Adjust index since we already processed this character
                        break;
                    case 17: // !
                        if (char == '=') {
                            this.addChar(char);
                            this.state = 18; // Not equal state
                            continue;
                        }

                        this.addError(this.auxChar, this.row, this.column - this.auxChar.length);
                        this.colors += `<span class="error">${this.auxChar}</span>`;
                        this.clean();
                        i--; // Adjust index since we already processed this character
                        break;
                    case 18: // !=
                        this.addToken(Type.DIFF, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.colors += `${this.auxChar}`;
                        this.clean();
                        i--; // Adjust index since we already processed this character
                        break;
                    case 19: // <
                        if (char == '=') {
                            this.addChar(char);
                            this.state = 20; // Less than or equal state
                            continue;
                        }

                        this.addToken(Type.LESS, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.colors += `${this.auxChar}`;
                        this.clean();
                        i--; // Adjust index since we already processed this character
                        break;
                    case 20: // <=
                        this.addToken(Type.LESS_EQ, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.colors += `${this.auxChar}`;
                        this.clean();
                        i--; // Adjust index since we already processed this character
                        break;
                    case 21: // >
                        if (char == '=') {
                            this.addChar(char);
                            this.state = 22; // Greater than or equal state
                            continue;
                        }

                        this.addToken(Type.GREATER, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.colors += `${this.auxChar}`;
                        this.clean();
                        i--; // Adjust index since we already processed this character
                        break;
                    case 22: // >=
                        this.addToken(Type.GREATER_EQ, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.colors += `${this.auxChar}`;
                        this.clean();
                        i--; // Adjust index since we already processed this character
                        break;
                    case 23: // /
                        if (char == '/') {
                            this.addChar(char);
                            this.state = 24; // Single line comment state
                            continue;
                        } 
                        if (char == '*') {
                            this.addChar(char);
                            this.state = 25; // Multi-line comment state
                            continue;
                            }

                        this.addToken(Type.DIV, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.colors += `${this.auxChar}`;
                        this.clean();
                        i--; // Adjust index since we already processed this character
                        break;
                    case 24: // Single line comment
                        if (char != '\n') {
                            this.addChar(char);
                            continue;
                        }

                        this.addToken(Type.COMMENT, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.colors += `<span class="comment">${this.auxChar}</span>`;
                        this.clean();
                        i--; // Adjust index since we already processed this character
                        break;
                    case 25: // Multi-line comment
                        if (char == '*') {
                            this.addChar(char);
                            this.state = 26; // Potential end of multi-line comment
                            continue;
                        }

                        if (char == '#' && i == input.length - 1) {
                            this.addError(this.auxChar, this.row, this.column);
                            this.clean();
                            i--; // Adjust index since we already processed this character
                        }

                        if (char == '\n' || char == '\r') {
                            this.row++;
                            this.column = 1;
                        }

                        this.addChar(char);
                        break;
                    case 26: // Potential end of multi-line comment

                        if (char == '/') {
                            this.addChar(char);
                            this.state = 27; // End of multi-line comment
                            continue;
                        }

                        this.state = 25; // Back to multi-line comment state
                        i--; // Adjust index since we already processed this character
                        break;
                    case 27: // End of multi-line comment
                        
                        this.addToken(Type.MULTICOMMENT, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.colors += `<span class="comment">${this.auxChar}</span>`;
                        this.clean();
                        i--; // Adjust index since we already processed this character
                        break;
                    case 28: // Identifier state
                        if (/[a-zA-Z0-9_]/.test(char)) {
                            this.addChar(char);
                            continue;
                        }

                        let word: ReservedWords | undefined = this.reservedWords.find(token => token.lexeme === this.auxChar);

                        if (word) {
                            this.addToken(word.token, this.auxChar, this.row, this.column - this.auxChar.length);
                            this.colors += `<span class="reserved">${this.auxChar}</span>`;
                            this.clean();
                            i--; // Adjust index since we already processed this character
                            continue;    
                        }

                        this.addToken(Type.IDENTIFIER, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.colors += `<span class="identifier">${this.auxChar}</span>`;
                        this.clean();
                        i--; // Adjust index since we already processed this character
                        break;
                    case 29: // Integer state
                        if (char == '.') {
                            this.addChar(char);
                            this.state = 30; // Decimal state
                            continue;
                        }
                        
                        if (/[0-9]/.test(char)) {
                            this.addChar(char);
                            continue;
                        }

                        this.addToken(Type.INTEGER, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.colors += `<span class="number">${this.auxChar}</span>`;
                        this.clean();
                        i--; // Adjust index since we already processed this character
                        break;
                    
                    case 30: // Decimal state (after point)
                        if (/[0-9]/.test(char)) {
                            this.addChar(char);
                            this.state = 31; // Decimal digits state
                            continue;
                        }
                        
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.colors += `<span class="error">${this.auxChar}</span>`;
                        this.clean();
                        i--; // Adjust index since we already processed this character
                        break;
                    
                    case 31: // Decimal digits state
                        if (/[0-9]/.test(char)) {
                            this.addChar(char);
                            continue;
                        }
                        
                        this.addToken(Type.DECIMAL, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.colors += `<span class="number">${this.auxChar}</span>`;
                        this.clean();
                        i--;
                        break;
                    
                    case 32: // String state
                        if (char == '"') {
                            this.addChar(char);
                            this.state = 33; // End of string
                            continue;
                        }
                        
                        if (char == '#' && i == input.length - 1) {
                            this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                            this.colors += `<span class="error">${this.auxChar}</span>`;
                            this.clean();
                            i--;
                            continue;
                        }
                        
                        if (char == '\n' || char == '\r') {
                            this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                            this.colors += `<span class="error">${this.auxChar}</span>`;
                            this.clean();
                            i--;
                            continue;
                        }
                        
                        this.addChar(char);
                        break;
                    
                    case 33: // End of string
                        this.addToken(Type.STRING, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.colors += `<span class="string">${this.auxChar}</span>`;
                        this.clean();
                        i--;
                        break;
                    
                    case 34: // Character state
                        if (char == "'") {
                            this.addChar(char);
                            this.state = 35; // End of character
                            continue;
                        }
                        
                        if (char == '#' && i == input.length - 1) {
                            this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                            this.colors += `<span class="error">${this.auxChar}</span>`;
                            this.clean();
                            i--;
                            continue;
                        }
                        
                        if (char == '\n' || char == '\r') {
                            this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                            this.colors += `<span class="error">${this.auxChar}</span>`;
                            this.clean();
                            i--;
                            continue;
                        }
                        
                        this.addChar(char);
                        break;
                    
                    case 35: // End of character
                        this.addToken(Type.CHAR, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.colors += `<span class="char">${this.auxChar}</span>`;
                        this.clean();
                        i--;
                        break;
                }
            }

        return this.tokenList;
    }

    clean() {
        this.state = 0;
        this.auxChar = '';
    }

    addChar(char: string) {
        this.auxChar += char;
        this.column++;
    }

    addToken(type: Type, lexeme: string, row: number, column: number) {
        this.tokenList.push(new Token(type, lexeme, row, column));
    }

    // Método para manejar errores, acepta tanto 3 como 4 parámetros
    addError(typeOrLexeme: Type | string, lexemeOrRow: string | number, rowOrColumn: number, column?: number) {
        // Si el primer parámetro es una cadena, se asume que es el lexema
        if (typeof typeOrLexeme === 'string') {
            this.errorList.push(new Token(Type.UKNOWN, typeOrLexeme, lexemeOrRow as number, rowOrColumn));
        } else {
            // Versión original con 4 parámetros
            this.errorList.push(new Token(typeOrLexeme, lexemeOrRow as string, rowOrColumn, column!));
        }
    }

    getTokenList(){
        return this.tokenList;
    }

    getErrorList(){
        return this.errorList;
    }

    getColors() {
        return this.colors;
    }
}