import {Router} from 'express';
import {Users} from '../models/Users';
import {encryptPassword} from '../helper/common';
export const userrouter = Router();

userrouter.post('/', async (req, res, next) => {
  try {
    req.body.password = await encryptPassword(req.body.password);
    const userdata = await Users.create(req.body);
    res.status(201).json(userdata);
  } catch (e) {
    next(e);
  }
});

userrouter.get('', async (req, res, next) => {
  try {
    res.json(await Users.findAll());
  } catch (e) {
    next(e);
  }
});

userrouter.get('/:id', async (req, res, next) => {
  try {
    const actor = await Users.findByPk(req.params['id']);
    res.json(actor);
  } catch (e) {
    next(e);
  }
});

userrouter.put('/:id', async (req, res, next) => {
  try {
    await Users.update(req.body, {where: {id: req.params['id']}});
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});
