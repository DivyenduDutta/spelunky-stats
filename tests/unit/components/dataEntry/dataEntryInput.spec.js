import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils';
import dataEntryInput from '@/components/dataEntry/dataEntryInput';

describe('dataEntryInput.vue', () => {
    let wrapper;
    let inputElement;
    let submitButton;

    beforeEach(async () => {
        wrapper = shallowMount(dataEntryInput);
        inputElement = wrapper.find('input');
        submitButton = wrapper.find('.data-display-root-submit');
        inputElement.element.value = 'Didnt use bombs correctly';
        inputElement.trigger('input');
        await wrapper.vm.$nextTick();
    });

    it('should populate data binding when text input is filled in', () => {
        expect(wrapper.vm.deathCause).to.equal('Didnt use bombs correctly');
    });
});