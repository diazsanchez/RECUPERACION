import React, { useEffect, useState } from "react";
import Modal from "react-modal"; // Importa react-modal
import { fetchAllCountries, fetchCountryById } from "../api/countriesApi";
import CountryCard from "./CountryCard";

Modal.setAppElement("#root"); // Necesario para accesibilidad

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAllCountries()
      .then(setCountries)
      .catch(console.error);
  }, []);

  const handleCountrySelect = (id) => {
    fetchCountryById(id)
      .then((data) => {
        setSelectedCountry(data[0]); // Guarda la información del país seleccionado
        setIsModalOpen(true); // Abre el modal
      })
      .catch(console.error);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCountry(null);
  };

  return (
    <div>
      <h1>Desarrollo Web 2024 - Chiquimulilla, Santa Rosa</h1>
      <h2>UMG</h2>
      <h2>EXAMEN DE RECUPERACIÓN</h2>
      <div className="country-list">
        {countries.map((country) => (
          <CountryCard
            key={country.cca3}
            country={country}
            onClick={handleCountrySelect}
          />
        ))}
      </div>

      {/* Modal para mostrar la información del país */}
      {selectedCountry && (
        <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Country Details"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.85)", // Fondo translúcido oscuro
          },
          content: {
            maxWidth: "500px", // Ancho del modal
            maxHeight: "700px",
            margin: "auto",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "#ffffff", // Fondo del modal
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)", // Sombra
          },
        }}
      >
        {selectedCountry && (
          <div>
            {/* Nombre del país */}
            <h2 style={{ textAlign: "center", marginBottom: "15px" }}>
              {selectedCountry.name.common}
            </h2>
      
            {/* Bandera */}
            <img
              src={selectedCountry.flags?.svg}
              alt={`${selectedCountry.name.common} flag`}
              style={{
                width: "100%",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "15px",
              }}
            />
      
            {/* Información adicional */}
            <p>
              <strong>Capital:</strong> {selectedCountry.capital?.[0] || "N/A"}
            </p>
            <p>
              <strong>Region:</strong> {selectedCountry.region}
            </p>
            <p>
              <strong>Zona Horaria:</strong> {selectedCountry.timezones?.[0] || "N/A"}
            </p>
      
            {/* Botón de cierre */}
            <button
              onClick={closeModal}
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                backgroundColor: "#2a5298",
                color: "#ffffff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "16px",
                marginTop: "20px",
              }}
            >
              Cerrar
            </button>
          </div>
        )}
      </Modal>      
      
      )}
    </div>
  );
};

export default CountryList;
