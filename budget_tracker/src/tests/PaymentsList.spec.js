import { shallowMount, createLocalVue } from '@vue/test-utils'
import PaymentsList from '../components/PaymentsList'

const localVue = createLocalVue();

describe('PaymentsList', () => {
  it('paymentsList property does not equal the object passed from props', () => {
    const wrapper = shallowMount(PaymentsList, {
      propsData: {
        payments: [{ date: new Date() }]
      }
    })

    expect(wrapper.vm.paymentsList).not.toBe(wrapper.props().payments)
  })

})