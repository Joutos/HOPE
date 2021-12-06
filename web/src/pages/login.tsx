import React, { FormEvent, useState, ChangeEvent } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { FiPlus } from "react-icons/fi";
import { LeafletMouseEvent } from "leaflet";
import { useHistory } from "react-router-dom";

import Sidebar from "../components/Sidebar";

import mapIcon from "../utils/mapIcon";

import api from "../services/api";

import "../styles/pages/logincad.css";


export default function Login() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");



  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

   

    const data = new FormData();

    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    

    await api.post("psychs", data);
    console.log(data);
    alert("Cadastro realizado com Sucesso");
    history.push("/app");
  }

  return (
    <div id='page-create-orphanage'>
    <main>
    <form action="http://localhost/hope/web/login.php" method="post" className='create-orphanage-form'>

      <fieldset> 
        <legend>Login</legend>
        
<div className="input-block">
 <input
   type="email"
   placeholder='Digite o seu email'
   name='email'
  
   />
   </div>

<div className="input-block">
<input type="password" 
placeholder='Digite a sua senha'
name="password"
className='input-block'
/>
</div>
</fieldset>

<button className='confirm-button' type='submit'>Entrar</button>

<p className='cadButton'>Não tem uma conta? <a href="/cadastro">Cadastre-se</a></p>

</form>
    </main>
  </div>
  );
}
