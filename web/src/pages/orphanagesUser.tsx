import React, {useEffect, useState} from 'react';

import mapMarkerImg from '../images/map-marker.svg';
import {Link} from 'react-router-dom'
import {FiPlus, FiArrowRight} from 'react-icons/fi';
import '../styles/pages/orphanages-map.css';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import api from '../services/api';


const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
    iconSize:[58,68],
    iconAnchor:[29,68],
    popupAnchor:[170,2]
    })
    
interface Psych{
    id:number;
    latitude:number;
    longitude:number;
    name: string;
}

function OrphanagesMapUser(){

    const [psychologists, setPsychologists] = useState<Psych[]>([]);
    useEffect(()=> {
        api.get('psychs').then(response => {
            setPsychologists(response.data);   
        });
    }, [])

return(
    <div id="page-map">
        <aside>
            <header>
                <img src={mapMarkerImg} alt="HOPE" />

                <h2>Escolha um psicólogo no mapa</h2>

            </header>

            <footer>
                <strong>Belo Horizonte</strong>
                <span>Minas Gerais</span>
            </footer>
        </aside>

        <MapContainer center={[-19.9256973,-43.9455046]} zoom={14} style={{width: '100%', height: '100%'}}>
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/>
        {psychologists.map(psychologists=>{
            console.log(psychologists)
            return (<Marker 
                icon={mapIcon}
                position={[psychologists.latitude,psychologists.longitude]}
                key={psychologists.id}
                >
                    <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
            {psychologists.name}
            <Link to={`/psych/${psychologists.id}`}>
            <FiArrowRight size={20} color="#FFF"/>
            </Link>
            </Popup>
                     </Marker>
                )
        })}
        
            
            
        

        </MapContainer>
     

        
  </div>
  
  
  )}  



export default OrphanagesMapUser;