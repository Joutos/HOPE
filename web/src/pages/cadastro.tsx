import React, { FormEvent, useState, ChangeEvent } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { FiPlus } from "react-icons/fi";
import { LeafletMouseEvent } from "leaflet";
import { useHistory } from "react-router-dom";

import Sidebar from "../components/Sidebar";

import mapIcon from "../utils/mapIcon";

import api from "../services/api";

import "../styles/pages/logincad.css";


export default function Cadastro() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");



  // async function handleSubmit(event: FormEvent) {
  //   event.preventDefault();

   

  //   const data = new FormData();

  //   data.append("name", name);
  //   data.append("email", email);
  //   data.append("password", password);
    

  //   await api.post("psychs", data);
  //   console.log(data);
  //   alert("Cadastro realizado com Sucesso");
  //   history.push("/app");
  // }

  return (
    <div id='page-create-orphanage'>
      
      <main>
      <form action="http://localhost/hope/web/cadastro.php" method="post" className='create-orphanage-form'>

        <fieldset> 
          <legend>Cadastro</legend>
          
          <div className="input-block">
<input type="text" 
placeholder='Digite o seu nome'
name="name"
required
/>
</div>
 
 <div className="input-block">
   <input
     type="email"
     placeholder='Digite o seu email'
     name='email'
     required
     />
     </div>

<div className="input-block">
<input type="password" 
placeholder='Digite a sua senha'
name="password"
className='input-block'
required
/>
</div>

  <div className="radio-block">
    <legend>Você é psicólogo?</legend>
  <label>Sim        <input type="radio" name="psych" value="1" className="checkmark"/> </label> 
  <label>Não        <input type="radio" name="psych" value="0" className="checkmark"/> </label>
  </div>

</fieldset>

<button className='confirm-button' type='submit'>Cadastrar</button>
</form>
      </main>
    </div>
  );
}
