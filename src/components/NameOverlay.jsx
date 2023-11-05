import '../scss/Overlay.scss'

export default function NameOverlay({
  onNameSet,
  onClose,
}) {
  return (
    <div className='overlay'>
      <p>¿Cómo te llamas?</p>
      <input
        type='text'
        onChange={(e) => onNameSet(e.target.value)}
      />
      <div onClick={onClose}>continua</div>
    </div>
  )
}
