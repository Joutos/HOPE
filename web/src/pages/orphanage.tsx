import React, {useEffect, useState} from 'react';
import {FaWhatsapp} from "react-icons/fa";
import {FiClock, FiInfo,FiArrowLeft} from "react-icons/fi"
import { useHistory,Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import Sidebar from '../components/Sidebar/index'
import mapMarkerImg from '../images/map-marker.svg';
import {useParams} from 'react-router-dom';
import '../styles/pages/orphanage.css';
import api from '../services/api';

const happyMapIcon = L.icon({
    iconUrl: mapMarkerImg,

    iconSize:[58,68],
    iconAnchor:[29,68],
    popupAnchor:[0, -60]
})

interface Psychs{
    latitude:number;
    longitude:number;
    name: string;
    about:string;
    instructions: string;
    cellphone: string;
    opening_hours: string;
    open_on_weekends: boolean;
    images:Array<{
    id:number;
    url:string;

    }>;
}

interface PsychParams{
    id:  string;
}

export default function Psych(){
    const params = useParams<PsychParams>();
    const [psychs, setPsych] = useState<Psychs>();
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    
   

    useEffect(()=> {
        api.get(`psychs/${params.id}`).then(response => {
            setPsych(response.data);   
        });
    }, [params.id])

    if(!psychs){
        return <p>Carregando...</p>
    }

    
   
    
    return(


        <div id="page-orphanage">
            <Sidebar />
            <main>
                <div className="orphanage-details">
                    <img src={psychs.images[activeImageIndex].url} alt={psychs.name} />

                    <div className="images">
                       {psychs.images.map((image, index) =>{
                           return (
                            <button 
                            className={activeImageIndex == index ? 'active' : ''} 
                            key={image.id}
                             type="button"
                             onClick={()=>{
                                 setActiveImageIndex(index)
                             }}
                             >
                            <img src={image.url} alt={psychs.name} />
                            </button>
                           )
                       })}
                    </div>

                    <div className="orphanage-details-content">
                        <h1>{psychs.name}</h1>
                        <p>{psychs.about}</p>

                    <div className="map-container">
                        <MapContainer center={[psychs.latitude,psychs.longitude]}
                         zoom={17} 
                         style={{width: '100%', height: 280}} 
                        dragging={false}
                        touchZoom={false}
                        zoomControl={false}
                        scrollWheelZoom={false}
                        doubleClickZoom={false}>
                    <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/>
                    <Marker interactive={false} icon={happyMapIcon} position={[psychs.latitude,psychs.longitude]}/>
                    </MapContainer>
                    <footer>
                        <a target="_blank" href={`https://www.google.com/maps/dir/?api=1&destination=${psychs.latitude}, ${psychs.longitude}`}>Ver rotas no Google Maps</a>
                    </footer>
                    </div>
                    <hr/>

                    <h2>Instruções para consulta</h2>
                    <p>{psychs.instructions}</p>

                    <div className='open-details'>
              <div className='hour'>
                <FiClock size={32} color='#15B6D6' />
                Segunda à Sexta <br />
                {psychs.opening_hours}
              </div>
              {psychs.open_on_weekends ? (
                <div className='open-on-weekends'>
                  <FiInfo size={32} color='#39CC83' />
                  Atendemos <br />
                  Fim de Semana
                </div>
              ) : (
                <div className='open-on-weekends dont-open'>
                  <FiInfo size={32} color='#ff669d' />
                  Não atendemos <br />
                  Fim de Semana
                </div>
              )}
            </div>

               
                <p> Telefone de contato: {psychs.cellphone} </p>
               <a href={`https://wa.me/55${psychs.cellphone}`} target="_blank"> <button type="button" className="contact-button">
                <FaWhatsapp size={20} color="#FFF"/>
                Entrar em contato por Whatsapp
                </button> </a>

                    </div>

                </div>
            </main>


       </div>
    );
}
