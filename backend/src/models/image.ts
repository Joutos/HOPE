import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import Psych from './psych';

@Entity('images')
export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path:string;

    @ManyToOne(()=> Psych, psych => psych.images)
    @JoinColumn({name: 'psych_id'})
    orphanage: Psych;

};