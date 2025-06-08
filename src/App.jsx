"use client"; // Directiva para Next.js, si no usas Next.js puedes omitirla

import React, { useState, useRef, useEffect } from "react";
import { BackgroundGradientAnimation } from "../BackgroundGradientAnimation"; // Asegúrate que la ruta sea correcta

// Array de excusas para cuando el segundo input esté vacío
const EXCUSAS = [
  "Estoy fuera de la ciudad.",
  "Lo siento, no me siento bien hoy.",
  "Te responderé en un momento.",
  "Mi teléfono se apagó, acabo de verlo.",
  "¡Pensé que ya había respondido!",
  "Estoy en una reunión ahora.",
  "Mi WiFi está fallando.",
  "Estaba manejando, no pude responder.",
  "He estado muy ocupado últimamente.",
  "No había visto tu mensaje hasta ahora.",
  "Estaba a punto de responder, lo juro.",
  "Déjame revisar y te respondo.",
  "Tengo que preguntarle a alguien más primero.",
  "Lo siento, estaba dormido.",
  "No sabía cómo responder.",
  "He tenido un día loco.",
  "Responderé cuando esté libre.",
  "¡Oh, pensé que hablabas con otra persona!",
  "Necesito más tiempo para pensarlo.",
  "¿Puedes repetir la pregunta?",
  "Olvidé lo que preguntaste, perdón.",
  "Estoy cargando el teléfono.",
  "Mi teléfono tuvo un fallo.",
  "Tenía muchas cosas que hacer.",
  "Perdón, me distraje.",
  "Es complicado.",
  "Necesito encontrar el documento primero.",
  "Esperaba el momento adecuado.",
  "Lo haré más tarde hoy.",
  "No estoy seguro si puedo decirlo.",
  "Es confidencial.",
  "Eso está fuera de mi alcance.",
  "Estaba desconectado.",
  "No tenía señal.",
  "¡Ups, acabo de ver esto!",
  "¿Podemos hablar más tarde?",
  "Estoy de vacaciones.",
  "No tengo la respuesta aún.",
  "Te responderé pronto.",
  "No soy la persona adecuada para esto.",
  "He tenido reuniones consecutivas.",
  "Mi agenda está llena.",
  "¿Puedo responder mañana?",
  "Me desconcentré.",
  "Te daré una mejor respuesta luego.",
  "No me olvidé, lo prometo.",
  "No creerás lo que pasó hoy.",
  "Tuve una emergencia familiar.",
  "Estaba atendiendo otra situación.",
  "Déjame investigarlo.",
  "Sigo pensándolo.",
  "Lo siento, no estoy disponible ahora.",
  "Necesito más información.",
  "El sistema estaba caído.",
  "Tuve problemas técnicos.",
  "Se me rompió el teclado 😅",
  "Pensé que ya respondí.",
  "Respondía en mi cabeza.",
  "Necesito aprobación primero.",
  "Eso no es de mi departamento.",
  "Estoy abrumado.",
  "Se me congeló el cerebro.",
  "Uy, vibras de lunes 😅",
  "¿Podemos saltarnos esta?",
];

function App() {
  // Estados para controlar la lógica de los inputs y la respuesta
  const [mostrarSegundo, setMostrarSegundo] = useState(false); // Controla la visibilidad y enfoque del segundo input
  const [textoPrimerInput, setTextoPrimerInput] = useState(""); // Contenido del primer input (o texto a mostrar)
  const [textoSegundoInput, setTextoSegundoInput] = useState(""); // Contenido del segundo input (respuesta escrita)
  const [pregunta, setPregunta] = useState(""); // Contenido del input de la pregunta
  const [textoMostrado, setTextoMostrado] = useState(""); // Texto visible en el primer input
  const [textoAnimado, setTextoAnimado] = useState(""); // Texto de la respuesta animada
  const [isAnimando, setIsAnimando] = useState(false); // Controla si la animación de respuesta está en curso

  const segundoInputRef = useRef(null); // Referencia al segundo input para enfocarlo programáticamente

  const fraseObjetivo = "Boquilla, favor de responder esta pregunta..."; // Frase que aparece cuando se escribe 'P'

  // Efecto para manejar el enfoque del segundo input y el texto mostrado
  useEffect(() => {
    if (mostrarSegundo) {
      segundoInputRef.current?.focus(); // Enfoca el segundo input si está activo
      setTextoMostrado(""); // Limpia el texto del primer input cuando el segundo está activo
    } else {
      setTextoMostrado(textoPrimerInput); // Muestra el contenido del primer input si el segundo no está activo
    }
  }, [mostrarSegundo, textoPrimerInput]);

  // Manejador para el primer input
  const manejarPrimerInput = (e) => {
    const val = e.target.value;

    if (val.trim().toLowerCase() === "p") { // Convertir a minúsculas para aceptar 'P' o 'p'
      setMostrarSegundo(true); // Activa el segundo input
      setTextoPrimerInput(""); // Limpia el primer input
      setTextoSegundoInput(""); // Limpia el segundo input
      setTextoAnimado(""); // Limpia la respuesta animada
    } else {
      setMostrarSegundo(false); // Desactiva el segundo input
      setTextoPrimerInput(val); // Actualiza el texto del primer input
      setTextoMostrado(val); // Muestra el texto en el primer input
      setTextoSegundoInput(""); // Limpia el segundo input
      setTextoAnimado(""); // Limpia la respuesta animada
    }
  };

  // Manejador para el segundo input
  const manejarSegundoInput = (e) => {
    const val = e.target.value;
    setTextoSegundoInput(val); // Actualiza el contenido del segundo input

    // Muestra la frase objetivo a medida que el usuario escribe, hasta completarla
    const longitud = val.length;
    if (longitud <= fraseObjetivo.length) {
      setTextoMostrado(fraseObjetivo.slice(0, longitud));
    } else {
      setTextoMostrado(fraseObjetivo);
    }
  };

  // Función para animar la respuesta letra por letra
  const animarRespuesta = (texto) => {
    if (!texto || texto.length === 0) {
      setTextoAnimado("No hay texto para mostrar.");
      return;
    }

    setIsAnimando(true); // Indica que la animación está en curso
    setTextoAnimado(""); // Reinicia el texto animado a vacío para construirlo desde cero

    let i = 0; // Inicia el contador desde 0 para incluir la primera letra
    const totalDuracion = 3000; // Duración total de la animación (3 segundos)
    const intervalTiempo = totalDuracion / texto.length; // Tiempo entre cada letra

    // Configura un intervalo para añadir letras una por una
    const intervalo = setInterval(() => {
      if (i >= texto.length) {
        clearInterval(intervalo); // Detiene el intervalo cuando todas las letras se han mostrado
        setIsAnimando(false); // Indica que la animación ha terminado
        return;
      }

      // Añade la siguiente letra al texto animado
      setTextoAnimado((prev) => prev + texto.charAt(i));
      i++;
    }, intervalTiempo);
  };

  // Manejador para el botón de "Enviar"
  const manejarEnvio = () => {
    // Al enviar, resetear los inputs principales
    setTextoPrimerInput("");
    setTextoSegundoInput("");
    setTextoMostrado(""); // Esto se maneja en el useEffect, pero lo reseteamos por consistencia

    let respuestaFinal = "";

    // Lógica para determinar la respuesta
    if (textoSegundoInput.trim() === "" && pregunta.trim() === "") {
      respuestaFinal = "Palomo, la petición y la pregunta están vacías.";
    } else if (textoSegundoInput.trim() === "") {
      // Si el segundo input (la petición/respuesta) está vacío, elige una excusa aleatoria
      const randomIndex = Math.floor(Math.random() * EXCUSAS.length);
      respuestaFinal = EXCUSAS[randomIndex];
    } else if (pregunta.trim() === "") {
      respuestaFinal = "Palomo, la pregunta está vacía.";
    } else {
      // Si ambos inputs tienen contenido, usa la respuesta del segundo input
      respuestaFinal = textoSegundoInput.trim();
    }

    // Inicia la animación de la respuesta
    animarRespuesta(respuestaFinal);
  };

  // Función para resetear solo el input de la pregunta
  const resetearPregunta = () => {
    setPregunta(""); // Limpia el estado de la pregunta
  };

  return (
    <>
      <section className="w-screen h-screen flex flex-col relative justify-center items-center">
        {/* Componente de animación de fondo */}
        <BackgroundGradientAnimation />

        {/* Contenedor principal de la interfaz */}
        <div className="container w-[32%] absolute z-20 overflow-hidden">
          {/* Título de la aplicación */}
          {/* Asume que 'boquilla-title' está definido en tu CSS global */}
          <h1 className="boquilla-title">Boquilla Responde</h1>
          <div className="card">
            {/* Input principal que muestra el texto dinámico */}
            <input
              type="text"
              placeholder="Escribe 'P' para activar"
              value={textoMostrado}
              onChange={manejarPrimerInput}
              className="input"
              readOnly={mostrarSegundo} // Se hace de solo lectura cuando el segundo input está activo
            />

            {/* Input oculto para la respuesta, enfocado cuando se activa */}
            <input
              type="text"
              ref={segundoInputRef}
              value={textoSegundoInput}
              onChange={manejarSegundoInput}
              placeholder="Escribe tu respuesta aquí"
              className="inputdos"
              autoComplete="off"
              disabled={isAnimando} // Deshabilitado durante la animación de respuesta
            />

            {/* Input para la pregunta del usuario */}
            <input
              type="text"
              placeholder="Escribe tu pregunta"
              value={pregunta}
              onChange={(e) => setPregunta(e.target.value)}
              className="input"
              disabled={isAnimando} // Deshabilitado durante la animación de respuesta
            />

            {/* Botón para enviar la pregunta/respuesta */}
            <button
              className="btn-enviar"
              onClick={manejarEnvio}
              disabled={isAnimando} // Deshabilitado durante la animación
            >
              Enviar
            </button>

            {/* Área donde se muestra la respuesta animada */}
            <div className="respuesta-final">
              <strong>Respuesta:</strong> {textoAnimado}
            </div>

            {/* Botón para resetear solo el input de la pregunta */}
            <button
              className="btn-reset"
              onClick={resetearPregunta}
              disabled={isAnimando} // Deshabilitado durante la animación
              style={{ marginTop: "10px" }}
            >
              Resetear Pregunta
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;