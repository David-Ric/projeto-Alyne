import axios from "axios";
import { iDadosUsuario } from "../@types";

const usuario: iDadosUsuario = JSON.parse(
  localStorage.getItem("@Portal/usuario") || "{}"
);
const token = usuario.token;

//console.log("token", token)
console.log("teste",token)
  const api = axios.create({
    
      baseURL: "https://localhost:5001",
     //baseURL: "https://10.0.0.31:8095",
    headers: {
      "Content-type": "application/json",
      "Authorization" : `Bearer ${usuario.token}`
   }
  });

 export default api;
