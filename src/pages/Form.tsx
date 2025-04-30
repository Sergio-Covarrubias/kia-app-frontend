"use client"

import type React from "react"
import { useState } from "react"

export default function Form() {
  const [activeTab, setActiveTab] = useState("formulario")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted")
  }

  return (
    <div className="form-container">

      {/* Título del formulario */}
      <h1 className="text-3xl font-bold mb-6 text-center pt-10">Formulario</h1>


      {/* El formulario */}
      {activeTab === "formulario" && (
        <div className="form-section">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              {[
                "Nombre de residuo",
                "Tipo de contenedor",
                "Área o proceso de generación",
                "Fecha de ingreso",
                "Fecha de salida",
                "Estado de procesamiento - Art. 71 fracción I inciso (e)",
                "Razón social 1",
                "Número de autorización SCT",
                "Razón social 2",
                "Nombre de responsable"
              ].map((label, i) => (
                <div key={i} className="form-field">
                  <label htmlFor={`field${i + 1}`} className="form-label">
                    {label}
                  </label>
                  <input id={`field${i + 1}`} className="form-input" />
                </div>
              ))}
            </div>
            <div className="submit-container">
              <button type="submit" className="submit-button">
                Crear Registro
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
