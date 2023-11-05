import './App.scss'
import Main from './components/Main'

function App() {
  return (
    <div className='app'>
      <Main />
      <small className='info'>
        Un Rick dentro de una app, como el episodio de
        Pickle Rick. Usando la API de OpenAI, React y Scss.
        by{' '}
        <a href='https://github.com/KurtGuardia'>Kurt G.</a>
      </small>
    </div>
  )
}

export default App
