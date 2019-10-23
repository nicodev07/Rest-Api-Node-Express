"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const databse_1 = __importDefault(require("../databse"));
class GamesController {
    index(req, res) {
        databse_1.default.query('DESCRIBE games');
        res.json('games');
    }
    //Ejecuta una promesa de tipo void
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const games = yield databse_1.default.query('SELECT * FROM games');
                res.json(games);
            }
            catch (err) {
                res.json({
                    message: "ERROR Listing games",
                    status: false
                });
            }
        });
    }
    //Obtener juego por id
    getGame(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const game = yield databse_1.default.query('SELECT * FROM games where id = ?', id);
                if (game.length > 0) {
                    return res.status(200).json(game[0]);
                }
                else {
                    return res.status(404).json({
                        message: "The game doesn't exist"
                    });
                }
            }
            catch (err) {
                res.json({
                    message: "ERROR Consulting game",
                    status: false
                });
            }
            res.json({
                message: "This is the game " + req.params.id
            });
        });
    }
    //Ejecuta una promesa de tipo void
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield databse_1.default.query('INSERT INTO games set ?', [req.body]);
                res.status(200).json({
                    message: "Game Saved"
                });
            }
            catch (err) {
                res.json({
                    status: false,
                    message: "ERROR Adding a game"
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield databse_1.default.query('UPDATE games SET ? WHERE id = ?', [req.body, id]);
                res.status(200).json({
                    message: "Game Updated"
                });
            }
            catch (err) {
                res.json({
                    status: false,
                    message: "ERROR Updating game"
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield databse_1.default.query('DELETE FROM games WHERE id = ?', [id]);
                res.status(200).json({
                    status: 200,
                    message: "Game " + id + " Deleted"
                });
            }
            catch (err) {
                res.json({
                    status: "false",
                    message: "ERROR Deleting Game"
                });
            }
        });
    }
}
exports.gamesController = new GamesController();
