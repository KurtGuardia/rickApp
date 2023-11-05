import { useState } from 'react'
import Input from './Input'
import '../scss/Main.scss'
import '../scss/Spinner.scss'
import Rick from '../assets/rick.png'
import Rick2 from '../assets/rick2.png'
import Rick3 from '../assets/rick3.png'
import Rick4 from '../assets/rick4.png'
import Rick5 from '../assets/rick5.png'
import NameOverlay from './NameOverlay'
import { prompt } from '../assets/prompt'

export default function Main() {
  const [rickImg, setRickImg] = useState(1)
  const [message, setMessage] = useState(null)
  const [name, setName] = useState('')
  const [showOverlay, setShowOverlay] = useState(true)
  const [showSpinner, setShowSpinner] = useState(true)

  function generateRandomRickImg() {
    const segundos = Math.floor(Math.random() * 15) + 3
    const num = Math.floor(Math.random() * 4) + 1

    setTimeout(() => {
      setRickImg(num)
    }, segundos * 1000)
  }
  generateRandomRickImg()

  const firstPrompt = () => {
    setShowOverlay(false)
    setShowSpinner(true)

    const getMessage = async () => {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          message: `Mi nombre es ${name}. ${prompt}`,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
      try {
        const response = await fetch(
          'http://localhost:8000/completions',
          options,
        )
        const data = await response.json()
        setMessage(data.choices[0].message.content)
        setShowSpinner(false)
      } catch (error) {
        console.error(error)
      }
    }
    getMessage()
  }

  return (
    <section className='main'>
      {showOverlay && (
        <NameOverlay
          onNameSet={(e) => setName(e)}
          onClose={firstPrompt}
        />
      )}
      <div className='main_rick'>
        {rickImg === 1 && <img src={Rick} alt='rick' />}
        {rickImg === 2 && <img src={Rick2} alt='rick' />}
        {rickImg === 3 && <img src={Rick3} alt='rick' />}
        {rickImg === 4 && <img src={Rick4} alt='rick' />}
        {rickImg === 5 && <img src={Rick5} alt='rick' />}
      </div>
      <div className='main_texts'>
        <div className='main_texts-ricks'>
          {showSpinner && <div className='spinner' />}
          {message && <h1>{message}</h1>}
        </div>
        <Input
          onSubmit={(e) => setMessage(e)}
          name={name}
          setLoading={(e) => setShowSpinner(e)}
          clearText={() => setMessage('')}
        />
      </div>
    </section>
  )
}
