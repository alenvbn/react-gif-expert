import { fireEvent, render, screen } from '@testing-library/react'
import { GifExpertApp } from '../src/GifExpertApp'

describe('Pruebas en <GifExpertApp />', () => {
  const category = 'Goku'

  test('debe cambiar el valor de la caja de texto', () => {
    render(<GifExpertApp />)
    const input = screen.getByRole('textbox')
    fireEvent.input(input, { target: { value: category } })
    expect(input.value).toBe(category)
  })

  test('debe hacer match con el snapshot', () => {
    const { container } = render(<GifExpertApp />)
    expect(container).toMatchSnapshot()
  })

  test('debe agregar la categoria', () => {
    const { container } = render(<GifExpertApp />)

    const input = screen.getByRole('textbox')
    fireEvent.input(input, { target: { value: category } })

    const form = screen.getByRole('form')
    fireEvent.submit(form)
    expect(screen.getByText(category).innerHTML).toBe(category)
  })

  test('no debe agregar la categoria si esta ya existe', () => {
    render(<GifExpertApp />)

    const input = screen.getByRole('textbox')
    fireEvent.input(input, { target: { value: category } })

    const form = screen.getByRole('form')
    fireEvent.submit(form)

    fireEvent.input(input, { target: { value: category } })
    fireEvent.submit(form)

    expect(screen.getAllByText(category).length).toBe(1)
  })

  test('debe evitar que se agregue una categoria sin texto en el input', () => {
    render(<GifExpertApp />)
    const form = screen.getByRole('form')
    fireEvent.submit(form)
    expect(screen.getAllByText('Cargando...').length).toBe(1)
  })
})
