import { shallowMount } from '@vue/test-utils'
import Counter from '@/components/Counter'

describe('Counter Component', () => {

    let wrapper
    

    beforeEach(() => {
        wrapper = shallowMount( Counter )
    })

    // test('Debe hacer match con el snapshot', () => {

    //     const wrapper = shallowMount( Counter )

    //     expect( wrapper.html() ).toMatchSnapshot()

    // })

    test('h2 debe tener el valor por defecto, Counter',()=>{

        // const wrapper = shallowMount( Counter )

        expect( wrapper.find('h2').exists() ).toBeTruthy()
        
        const h2Value =  wrapper.find('h2').text()
        
        
        expect(h2Value).toBe('Counter')
        
    })
    
    
    test('El valor por defecto debe ser 100 en el 2º p', () => {
     
        
        // Wrapper
        // const wrapper = shallowMount( Counter )
        //pTags
        const pTags =  wrapper.findAll('p')
        // console.log(pTags);
        
        // expect segundo p === 100
        // importa la posición del tag p en el html
        expect( pTags[1].text() ).toBe('100')

        // Forma mas rápida y resumida sigue necesitando el wrapper
        // Usando un data test id para la prueba id especifico para la pruebal
        // ya no importa la posición del parrafo p en el html
        const value = wrapper.find('[data-testid="counter"]').text()
        expect(value ).toBe('100')
        
    })

    test('Debe incrementar  y decrementar el contador', async() => {
    
        // const wrapper = shallowMount( Counter )

        const [increaseBtn, decreaseBtn] =  wrapper.findAll('button')
        
        await increaseBtn.trigger('click')
        await increaseBtn.trigger('click')
        await increaseBtn.trigger('click')
        
        await decreaseBtn.trigger('click')
        await decreaseBtn.trigger('click')

        const value = wrapper.find('[data-testid="counter"]').text()

        expect( value ).toBe('101')
    })
    
    test('Debe establecer el valor por defecto', () => {

        // Leer las properties
        // console.log( wrapper.props() )
        // const { start } =  wrapper.props()
        const  start =  wrapper.props('start')
        

        // console.log( typeof start )

        const value = wrapper.find('[data-testid="counter"]').text()
        expect( Number(value) ).toBe( start )
    })



    test('Debe mostrar la prop title', ()=>{

        const title = 'Hola Mundo!!!!!!'
        const wrapper = shallowMount( Counter,{
            props: {
                title,
            }
        })

        // console.log( wrapper.html() );

        expect( wrapper.find( 'h2' ).text() ).toBe( title )
        
    })





})