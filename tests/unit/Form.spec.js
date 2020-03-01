jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: 'Mock Welcome!' }))
}))

import { shallowMount } from '@vue/test-utils'
import Form from '@/components/Form.vue'
import axios from 'axios' // axios here is the mock from above!

describe('Form.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Form);
});
  it('renders check empty name validity', () => {
    const checkEmptyInvalid = wrapper.vm.getValidationField('name')['$invalid']
    expect(checkEmptyInvalid).toBe(true)
  })
  it('renders check message length left', () => {
    wrapper.vm.form.message = 'Hi There, how are you.'
    const checkCharaLeft = wrapper.vm.getCharactersLeft('message')
    expect(checkCharaLeft).toBe(478)
  })

  it('Check submit call ', async (done) => {
    wrapper.vm.form = {
      name: 'Alex A S',
      email: 'alexsebastine@gmail.com',
      subject: 'Hai,There',
      message: 'Going Good'
    }
    wrapper.vm.submit() 

    await axios.post()

    wrapper.vm.$nextTick(() => {
      console.log('111111 ',wrapper.vm.submitStatus);
      expect(wrapper.vm.submitStatus).toMatch('OK');
      done();
    });
  })
})
