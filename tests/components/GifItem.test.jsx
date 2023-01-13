import { GifItem } from '../../src/components/GifItem'
import { render, screen } from '@testing-library/react'

describe('Pruebas en <GifItem />', () => {
  const title = 'One Punch'
  const url = 'https://one-punch.com/saitama.jpg'

  test('debe hacer match con el snapshot', () => {
    const { container } = render(<GifItem title={title} url={url} />)
    expect(container).toMatchSnapshot()
  })

  test('debe de mostrar la imagen con el URL y el ALT indicado', () => {
    render(<GifItem title={title} url={url} />)
    // screen.debug()
    // expect(screen.getByRole('img').src).toBe(url)
    const { src, alt } = screen.getByRole('img')
    expect(src).toBe(url)
    expect(alt).toBe(title)
  })

  test('debe mostrar el titulo del componente', () => {
    render(<GifItem title={title} url={url} />)
    expect(screen.getByText(title).innerHTML).toBe(title)
  })
})
