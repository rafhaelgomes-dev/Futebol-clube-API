import { Request, Response } from 'express';
import Services from '../services/matches.services';

export default class Matches {
  private _serviceTeams;
  constructor() {
    this._serviceTeams = new Services();
  }

  public getAllMatches = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { inProgress } = req.query;
      const result = await this._serviceTeams.getAllMatches(inProgress as string);
      return res.status(200).send(result);
    } catch (error) {
      return res.status(400).send(error);
    }
  };

  public saveMatches = async (req: Request, res: Response): Promise<Response> => {
    try {
      const result = await this._serviceTeams.saveMatches(req.body);
      if (result.type) {
        return res.status(result.statusCode).send({ message: result.message });
      }
      return res.status(result.statusCode).send(result.message);
    } catch (error) {
      return res.status(400).send(error);
    }
  };
}
