import Psych from '../models/psych';
import imageView from './images_view';

export default {
render(psych:Psych){
    return{
        id: psych.id,
        name: psych.name,
        latitude: psych.latitude,
        longitude: psych.longitude,
        about: psych.about,
        instructions: psych.instructions,
        cellphone: psych.cellphone,
        opening_hours: psych.opening_hours,
        open_on_weekends: psych.open_on_weekends,
        images: imageView.renderMany(psych.images)
    };
},

renderMany(orphanages: Psych[]){
return orphanages.map(orphanage => this.render(orphanage));
}
};