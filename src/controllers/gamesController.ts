import {Request, Response, response} from 'express';
import pool from '../databse';

class GamesController{

    public index (req: Request, res: Response){
        pool.query('DESCRIBE games');
        res.json('games');
    }
    
    //Ejecuta una promesa de tipo void
    public async list(req: Request, res:Response): Promise<void>{
        try{
            const games = await pool.query('SELECT * FROM games');
            res.json(games);
        }catch(err){
            res.json({
                message: "ERROR Listing games",
                status:false
            });
        }
        
    }

    //Obtener juego por id
    public async getGame(req: Request, res:Response){
        try{
            const { id } = req.params;
            const game = await pool.query('SELECT * FROM games where id = ?', id);
            if(game.length > 0){
                return res.status(200).json(game[0]);
            }else{
                return res.status(404).json({
                    message: "The game doesn't exist"
                })
            }
        }catch(err){
            res.json({
                message:"ERROR Consulting game",
                status: false
            });
        }
        res.json({
            message: "This is the game "+ req.params.id
        });
    }

    //Ejecuta una promesa de tipo void
    public async create(req: Request, res: Response): Promise<void>{
        try{
            await pool.query('INSERT INTO games set ?', [req.body]);
            res.status(200).json({
                message: "Game Saved"
            });
        }catch(err){
            res.json({
                status: false,
                message: "ERROR Adding a game"
            })
        }
        
    }

    public async update(req: Request, res:Response): Promise<void>{
        try{
            const { id } = req.params;
            await pool.query('UPDATE games SET ? WHERE id = ?', [req.body, id]);
            res.status(200).json({
                message: "Game Updated"
            });
        }catch(err){
            res.json({
                status: false,
                message: "ERROR Updating game"
            })
        }    
    }

    public async delete(req: Request, res: Response){
        const {id} = req.params;
        try{
            await pool.query('DELETE FROM games WHERE id = ?', [id]);
            res.status(200).json({
                status: 200,
                message: "Game "+id+" Deleted"
            })
        }catch(err){
            res.json({
                status: "false",
                message: "ERROR Deleting Game"
            })
        }
        
    }
}

export const gamesController = new GamesController();