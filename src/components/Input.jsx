import React, { useRef, useState } from 'react'
import '../scss/Input.scss'
import { promptSec } from '../assets/prompt'

export default function Input({
  clearText,
  onSubmit,
  name,
  setLoading,
}) {
  const [value, setValue] = useState('')
  const input = useRef(null)

  const getMessage = async () => {
    clearText()
    setLoading(true)
    const options = {
      method: 'POST',
      body: JSON.stringify({
        message: `Mi nombre es ${name}. ${promptSec}.  ${value}`,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
    setValue('')
    try {
      const response = await fetch(
        'http://localhost:8000/completions',
        options,
      )
      const data = await response.json()
      onSubmit(data.choices[0].message.content)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='input'>
      <textarea
        ref={input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder='habla con Rick...'
        className='input_tag'
        rows={4}
        cols={50}
      />
      <div
        id='submit'
        onClick={getMessage}
        className='input_icon'
      >
        ➢
      </div>
    </div>
  )
}
