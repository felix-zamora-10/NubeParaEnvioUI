import React from "react";
import "./Styles/MessageArea.css";

class MessageArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mensajeRecibido: "Log de mensajes:\n",
      rbndispositivo: "DTest04",
      txtMensaje: "",
    };
  }

  manejaCambios = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  enviaMensaje = async (e) => {
    e.preventDefault();

    if (this.state.txtMensaje === "" || this.state.txtMensaje === undefined) {
      alert("Especifique el mensaje");

      return;
    }

    try {
      let mensaje = this.state.txtMensaje;
      let dispositivo = this.state.rbndispositivo;
      let config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      };
      let respuesta = await fetch(
        `http://localhost:2811/api/NubeParaEnvio/EnviarMensajeDesdeNubeAsync?mensaje=${encodeURIComponent(
          mensaje
        )}&dispositivo=${encodeURIComponent(dispositivo)}`,
        config
      );

      let resp = await respuesta.text();

      this.setState({
        mensajeRecibido: this.state.mensajeRecibido + resp,
      });
    } catch (error) {}
  };

  limpiaTextoDeMensajes = (e) => {
    e.preventDefault();

    this.setState({
      mensajeRecibido: "Log de mensajes:\n",
    });
  };

  render() {
    return (
      <div className="div-content">
        <h1 className="label-header">Azure IoT Hub</h1>
        <h4 className="label-sub-header">Mensajes enviados</h4>
        <textarea
          className="txt-mensajes"
          id="mensajesRecibidos"
          disabled
          value={this.state.mensajeRecibido}
        />
        {/* <button className="boton">Recibir</button> */}
        <button className="boton" onClick={this.limpiaTextoDeMensajes}>
          Limpiar
        </button>
        <br />
        <br />
        <h4 className="label-sub-header">Envío de mensajes</h4>
        <label className="etiqueta" htmlFor="txtMensaje">
          Mensaje por enviar
        </label>
        <input
          type="text"
          id="txtMensaje"
          name="txtMensaje"
          placeholder="Mensaje..."
          onChange={this.manejaCambios}
          value={this.state.txtMensaje}
        />
        <label className="etiqueta">Dispositivos receptores</label>
        <div className="radio-area">
          <input
            type="radio"
            name="rbndispositivo"
            value="DTest04"
            onChange={this.manejaCambios}
            defaultChecked
          />
          <label>Validador 4</label>
          <input
            type="radio"
            name="rbndispositivo"
            value="DTest05"
            onChange={this.manejaCambios}
          />
          <label>Validador 5</label>
          <input
            type="radio"
            name="rbndispositivo"
            value="Ambos"
            onChange={this.manejaCambios}
          />
          <label>Ambos</label>
        </div>
        <button className="boton" onClick={this.enviaMensaje}>
          Enviar
        </button>
      </div>
    );
  }
}

export default MessageArea;
