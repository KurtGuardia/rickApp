import { useEffect, useState } from 'react'

function App() {
  const [value, setValue] = useState(null)
  const [message, setMessage] = useState(null)
  const [previousChats, setPreviousChats] = useState([])
  const [currentTitle, setCurrentTitle] = useState(null)

  useEffect(() => {
    if (!currentTitle && value && message)
      setCurrentTitle(value)
    if (currentTitle && value && message)
      setPreviousChats((prevChats) => [
        ...prevChats,
        {
          title: currentTitle,
          role: 'user',
          content: value,
        },
        {
          title: currentTitle,
          role: message.role,
          content: message.content,
        },
      ])
  }, [message, currentTitle])

  const currentChats = previousChats.filter(
    (previousChats) => previousChats.title === currentTitle,
  )

  const getMessages = async () => {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        message: value,
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
      console.log(
        '🚀 ~ file: App.js:52 ~ getMessages ~ data:',
        data,
      )
      setMessage(data.choices[0].message)
    } catch (error) {
      console.error(error)
    }
  }

  const createNewChat = () => {
    setMessage(null)
    setValue('')
    setCurrentTitle(null)
  }

  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle)
    setValue('')
    setMessage(null)
  }

  const uniqueTitles = Array.from(
    new Set(
      previousChats.map(
        (previousChat) => previousChat.title,
      ),
    ),
  )

  return (
    <div className='app'>
      <section className='side-bar'>
        <button onClick={createNewChat}>+ New Chat</button>
        <ul className='history'>
          {uniqueTitles?.map((uniqueTitle, index) => (
            <li
              key={index}
              onClick={() => handleClick(uniqueTitle)}
            >
              {uniqueTitle}
            </li>
          ))}
        </ul>
        <nav>
          <p>Made by Kurt</p>
        </nav>
      </section>
      <section className='main'>
        {!currentTitle && <h1>KurtGPT</h1>}
        <ul className='feed'>
          {currentChats?.map((chatMessage, index) => (
            <li key={index}>
              <p className='role'>{chatMessage.role}</p>
              <p>{chatMessage.content}</p>
            </li>
          ))}
        </ul>
        <div className='bottom-section'>
          <div className='input-container'>
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type='text'
              placeholder='Type a message...'
            />
            <div id='submit' onClick={getMessages}>
              ➢
            </div>
          </div>
          <p className='info'>
            Chat GPT Mar 14 Version. Free Research Preview.
            Our goal is to make AI systems more natural and
            safe to interact with. Your feedback will help
            us improve.
          </p>
        </div>
      </section>
    </div>
  )
}

export default App
