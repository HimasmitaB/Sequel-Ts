import {Router} from 'express';
import {Projects} from '../models/Projects';

export const projectrouter = Router();
import {authenticateJwt} from "../middleware/passport";

projectrouter.post('/', authenticateJwt, async (req, res, next) => {
  try {
    const project = await Projects.create(req.body);
    res.status(201).json(project);
  } catch (e) {
    next(e);
  }
});

projectrouter.get('', authenticateJwt, async (req, res, next) => {
  try {
    res.json(await Projects.findAll());
  } catch (e) {
    next(e);
  }
});

projectrouter.get('/:id', authenticateJwt, async (req, res, next) => {
  try {
    const project = await Projects.findByPk(req.params['id']);
    res.json(project);
  } catch (e) {
    next(e);
  }
});

projectrouter.put('/:id', authenticateJwt, async (req, res, next) => {
  try {
    await Projects.update<Projects>(req.body, {where: {id: req.params['id']}});
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});
