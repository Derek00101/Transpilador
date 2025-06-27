import { Request, Response } from "express";
import { AnalizadorLexico } from "../analizador/AnalizadorLexico";
import { Token } from "../analizador/Token";

export const home = (req: Request, res: Response) => {
    res.render('pages/index');
}

export const analyze = (req: Request, res: Response) => {
    const body = req.body;

    let scanner: AnalizadorLexico = new AnalizadorLexico();

    let tokenList: Token[] = scanner.scanner(body);

    res.json({
        tokens: tokenList,
        errors: scanner.getErrorList(),
        colors: scanner.getColors(),
    });
}
