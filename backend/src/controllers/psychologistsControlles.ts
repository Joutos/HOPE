import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import psychView from '../views/psychologist_view';
import * as Yup from 'yup';
import Psych from '../models/psych';


export default {

    async index(request: Request, response: Response){

        const psychsRepository = getRepository(Psych);

        const psychs = await psychsRepository.find({
            relations:['images']
        });
        return response.json(psychView.renderMany(psychs));

    },

    async show(request: Request, response: Response){

        const { id } = request.params;
        const psychsRepository = getRepository(Psych);

        const orphanage = await psychsRepository.findOneOrFail(id, {relations: ['images']});
        return response.json(psychView.render(orphanage));

    },


    async create(request: Request, response: Response){
        
    const {
        name,latitude,longitude,about,instructions,cellphone,opening_hours,open_on_weekends} = request.body;


        const psychsRepository = getRepository(Psych)
        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image=>{
            return {path: image.filename}
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            cellphone,
            opening_hours,
            open_on_weekends,
            images 
        };

        const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
            latitude: Yup.number().required('Latitude obrigatória'),
            longitude: Yup.number().required('Longitude obrigatória'),
            about: Yup.string().required('Informação obrigatória').max(300),
            instructions: Yup.string().required('Instruções obrigatórias'),
            cellphone: Yup.string().required('Telefone obrigatórias').max(11),
            opening_hours: Yup.string().required('Horário obrigatório'),
            open_on_weekends: Yup.boolean().required('Abertura de final de semana obrigatória'),
            images: Yup.array(
                Yup.object().shape({
                path: Yup.string().required(),
            }))
        });


        await schema.validate(data, {abortEarly: false,});
        
        const psych = psychsRepository.create(data)

       await psychsRepository.save(psych)
       return response.status(201).json(psych)
    },


};