import Container from './Container'
import cn from 'classnames'

export default function Alert({ preview }) {
  return (
    <div
      className={cn('border-b dark:bg-black', {
        'bg-accent-7 border-accent-7 text-white': preview,
        'bg-accent-1 border-accent-2': !preview,
      })}
    >
      <Container>
        <div className="py-2 text-center text-sm">
        Site en construction
        </div>
      </Container>
    </div>
  )
}
