// Debe hacer match con el snapshot
// Una sola linea de código

import { shallowMount } from '@vue/test-utils';
import Indecision from '@/components/Indecision.vue';

describe('Indecision component', () => {
  let wrapper;
  let clgSpy;

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          answer: 'yes',
          forced: false,
          image: 'https://yesno.wtf/assets/yes/2.gif',
        }),
    })
  );

  beforeEach(() => {
    wrapper = shallowMount(Indecision);

    clgSpy = jest.spyOn(console, 'log');

    jest.clearAllMocks();
  });

  test('debe de hacer match con el snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('Escribir en el input no debe disparar nada(console.log) ', async () => {
    const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer');

    const input = wrapper.find('input');
    await input.setValue('Hola Mundo');

    // expect( clgSpy ).toHaveBeenCalled()
    // expect( clgSpy ).toHaveBeenCalledTimes(1)
    expect(getAnswerSpy).not.toHaveBeenCalled();
  });

  test('Escribir simpbolo ? debe disparar el getAnswer', async () => {
    const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer');

    const input = wrapper.find('input');
    await input.setValue('Hola Mundo?');

    expect(clgSpy).toHaveBeenCalled();
    expect(getAnswerSpy).toHaveBeenCalled();
  });

  test('pruebas en getAnswer', async () => {
    await wrapper.vm.getAnswer();


    // console.log( wrapper.vm.img )
    // console.log( wrapper.vm.answer )

    const img = wrapper.find('img')

    expect(img.exists() ).toBeTruthy()
    expect( wrapper.vm.img ).toBe('https://yesno.wtf/assets/yes/2.gif')
    expect( wrapper.vm.answer ).toBe('Si!')


  });

  test('pruebas en getAnswer, fallo en el API', async () => {


    fetch.mockImplementationOnce( () => Promise.reject('API is down'))
    await wrapper.vm.getAnswer();

    //Fallo en el API
    const img = wrapper.find('img')
    expect( img.exists() ).toBeFalsy()

    expect( wrapper.vm.answer ).toBe('No se pudo cargar del API')


  });
});
