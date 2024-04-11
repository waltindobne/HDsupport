// src/services/api.js
import axios from "axios";

const apiRegistro = axios.create({
  baseURL: "https://hd-api.azurewebsites.net/api/Usuario/Registro",
});

export default apiRegistro;
