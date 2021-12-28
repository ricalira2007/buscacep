import { useState } from 'react'; 
import { FiSearch } from 'react-icons/fi';
import  api  from './services/api';

import './styles.css';

function App() {

  const [inputValue, setInputValue] = useState('')
  const [cep, setCep] = useState({})

  async function handleSearch(){

    if (inputValue === '') {
      alert('Digite um CEP válido!')
      return;
    }

    try{
      const response = await api.get(`${inputValue}/json/`)
      console.log(response.data)
      setCep(response.data)
    }catch{
      alert('Opss erro ao Buscar o Cep')
      setInputValue('')
    }

  }

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Busca de CEP</h1>
      </div>
      
      <div className="containerInput">
        <input 
          type="text" 
          placeholder="Digite o CEP" 
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        /> 

        <button className="buttonSearch" 
          onClick={handleSearch}
        >
          <FiSearch size={25} color="#fff"/>
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>
            {cep.logradouro ? cep.logradouro : 'Não Informado'}
          </span>
          <span>
            Complemento: {cep.complemento ? cep.complemento: 'Não Informado'}
          </span>
          <span>
            Bairro: {cep.bairro ? cep.bairro: 'Não Informado'}
          </span>
          <span>
            Cidade/Estado: {cep.localidade}/{cep.uf}
          </span>
        </main>
      )}

    </div>
  );
}

export default App;
