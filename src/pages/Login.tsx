import React, { useState } from 'react';
import whitelogo from '@assets/kia-logo-white.png'; 
import blacklogo from '@assets/kia-logo-black.png'; 

const Login: React.FC = () => {
  const [idKia, setIdKia] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('ID KIA:', idKia, 'Password:', password);
  };

  return (
    <div className="flex h-screen">
      {/* Columna izquierda con la imagen y el texto */}
      <div className="flex-1 flex flex-col justify-center items-center bg-black text-white p-5">
        <img src={whitelogo} alt="KIA Logo" className="max-w-[80%] mb-0" />
        <div className="text-center mt-0">
          <h2 className="text-xl font-bold mb-2">Portal de registro de residuos peligrosos</h2>
          <hr className="border-t-2 border-white mb-2 w-4/5 mx-auto" />
          <p className="text-lg italic mt-2">Menos desechos, más caminos limpios</p>
        </div>
      </div>

      {/* Línea vertical divisoria entre las dos secciones */}
      <div className="w-[2px] bg-white h-full"></div>

      {/* Columna derecha con el formulario de inicio de sesión */}
      <div className="flex-1 flex justify-center items-center p-5">
        <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
          <img src={blacklogo} alt="KIA Logo" className="block mx-auto mb-5 max-w-[120px]" />
          <form onSubmit={handleSubmit}>
            {/* Campo para el ID KIA */}
            <div className="mb-5">
              <label htmlFor="idKia" className="block text-lg font-bold mb-2">ID KIA</label>
              <input
                type="text"
                id="idKia"
                value={idKia}
                onChange={(e) => setIdKia(e.target.value)}
                className="w-full p-3 text-lg border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your KIA ID"
              />
            </div>

            {/* Campo para la contraseña */}
            <div className="mb-5">
              <label htmlFor="password" className="block text-lg font-bold mb-2">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 text-lg border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>

            {/* Botón para iniciar sesión */}
            <button
              type="submit"
              className="w-full py-3 text-lg font-bold text-white bg-black rounded-md hover:bg-gray-800 transition-colors"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
