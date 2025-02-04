import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "./store/slices/authSlice";
import { RootState, AppDispatch } from "./store/store";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, userData } = useSelector(
    (state: RootState) => state.auth
  );

  // Função para disparar o registerUser com payload mockado
  const handleRegister = () => {
    dispatch(
      registerUser({
        username: "UserRedux",
        email: "Redux@email.com",
        password: "123456988",
      })
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Testando Registro</h1>

      {loading && <p className="text-blue-500 mb-2">Enviando dados...</p>}
      {error && <p className="text-red-500 mb-2">Erro: {error}</p>}
      {userData && (
        <div className="bg-green-100 p-2 rounded mb-2">
          <p>Registro bem-sucedido!</p>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      )}

      <button
        onClick={handleRegister}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Registrar Usuário (Mockado)
      </button>
    </div>
  );
}

export default App;
