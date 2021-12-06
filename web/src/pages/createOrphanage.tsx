import React, { FormEvent, useState, ChangeEvent } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { FiPlus } from "react-icons/fi";
import { LeafletMouseEvent } from "leaflet";
import { useHistory } from "react-router-dom";
import {fetchLocalMapBox} from "../apiMapBox";
import Sidebar from "../components/Sidebar";

import mapIcon from "../utils/mapIcon";

import api from "../services/api";

import "../styles/pages/create-orphanage.css";


export default function CreateOrphanage() {
  const history = useHistory();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [name, setName] = useState("");
  const [local, setLocal] = useState("")
  const [about, setAbout] = useState("");
  const [instructions, setInstructions] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [opening_hours, setOpeningHours] = useState("");
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  


  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();

    data.append("name", name);
    data.append("about", about);
    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));
    data.append("instructions", instructions);
    data.append("cellphone", cellphone); 
    data.append("opening_hours", opening_hours);
    data.append("open_on_weekends", String(open_on_weekends));

    images.forEach(image => {
      data.append("images", image);
    });

    await api.post("psychs", data);
    console.log(data);
    alert("Cadastro realizado com Sucesso");
    history.push("/app");
  }

  return (
    <div id='page-create-orphanage'>
      <Sidebar />
      <main>
        <form onSubmit={handleSubmit} className='create-orphanage-form'>
          <fieldset>
            <legend>Dados</legend>

            

            <div className='input-block'>
              <label htmlFor='name'>Nome</label>
              <input
                id='name'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className='input-block'>
              <label htmlFor='local'>Endereço</label>
              <input
                id='local'
                value={local}
                onChange={e => setLocal(e.target.value)}
              />
            </div>

            <div className='input-block'>
              <label htmlFor='about'>
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id='name'
                maxLength={300}
                value={about}
                onChange={e => setAbout(e.target.value)}
              />
            </div>

            <div className='input-block'>
              <label htmlFor='images'>Fotos</label>

              <div className='images-container'>
                {previewImages.map(image => {
                  return <img key={image} src={image} alt={name} />;
                })}
                <label htmlFor='image[]' className='new-image'>
                  <FiPlus size={24} color='#15b6d6' />
                </label>
              </div>
              <input
                multiple
                type='file'
                id='image[]'
                onChange={handleSelectImages}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className='input-block'>
              <label htmlFor='instructions'>Instruções</label>
              <textarea
                id='instructions'
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
              />
            </div>

            <div className='input-block'>
              <label htmlFor='cellphone'>Telefone
              <span>Exemplo: 31912341234 </span>
              </label>
              <input
                maxLength={11}
                id='cellphone'
                value={cellphone}
                onChange={e => setCellphone(e.target.value)}
              />
            </div>

            <div className='input-block'>
              <label htmlFor='opening_hours'>Horário de Funcionamento</label>
              <input
                id='opening_hours'
                value={opening_hours}
                onChange={e => setOpeningHours(e.target.value)}
              />
            </div>

            <div className='input-block'>
              <label htmlFor='open_on_weekends'>Atende fim de semana</label>

              <div className='button-select'>
                <button
                  type='button'
                  className={open_on_weekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type='button'
                  className={!open_on_weekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>


          {/* <MapContainer
              center={[-19.9256973,-43.9455046]}
              style={{ width: "100%", height: 280 }}
              zoom={15}
            
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              
                <Marker
                  interactive={true}
                  draggable={true}
                  icon={mapIcon}
                  position={[-19.9256973,-43.9455046]}
                />
             
            </MapContainer> */}

          <button className='confirm-button' type='submit'>
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}
