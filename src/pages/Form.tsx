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
      <h2 className="form-title">10.2 Formulario</h2>

      {/* Botones del titulo para cambiar entre formulario y el dashboard */}
      <div className="tab-buttons">
        <button
          onClick={() => setActiveTab("formulario")}
          className={`tab-button ${activeTab === "formulario" ? "active-tab" : ""}`}
        >
          Formulario
        </button>
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`tab-button ${activeTab === "dashboard" ? "active-tab" : ""}`}
        >
          Dashboard
        </button>
      </div>

      {/* El formulario */}
      {activeTab === "formulario" && (
        <div className="form-section">
          <h3 className="form-section-title">Formulario</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="form-field">
                  <label htmlFor={`field${i + 1}`} className="form-label">
                    Label
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

      {/* Cambiar al dashboard */}
      {activeTab === "dashboard" && (
        <div className="dashboard-placeholder">
          <p className="dashboard-text">Contenido del dashboard</p>
        </div>
      )}
    </div>
  )
}
