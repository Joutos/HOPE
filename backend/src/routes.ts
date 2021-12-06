import {Router} from 'express';
import multer from 'multer';
import psychologistsControlles from './controllers/psychologistsControlles';
import uploadConfig from './config/upload'

const routes = Router();
const upload = multer(uploadConfig);


routes.get('/psychs', psychologistsControlles.index)
routes.get('/psychs/:id', psychologistsControlles.show)
routes.post('/psychs',upload.array('images') ,psychologistsControlles.create)


export default routes;