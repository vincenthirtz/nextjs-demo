import Container from './Container'

export default function Footer() {
  return (
    <footer className="bg-accent-1 border-t border-accent-2 dark:bg-black">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            Dev | Tips & Tricks | News
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
           console.log(viewvers)
          </div>
        </div>
      </Container>
    </footer>
  )
}
