import axios from "axios";
import { iDadosUsuario } from "../@types";

const usuario: iDadosUsuario = JSON.parse(
  localStorage.getItem("@Portal/usuario") || "{}"
);
const token = usuario.token;
//console.log("token", token)

  const api = axios.create({
     
    baseURL: "https://localhost:5001",
    headers: {
      "Content-type": "application/json",
      "Authorization" : `Bearer ${token}`
   }
  });

 export default api;
