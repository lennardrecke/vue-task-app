import { mount } from '@vue/test-utils';
import App from '../App.vue';

describe('App', () => {
    test('should add a new task when the "Add Task" button is clicked', async () => {
        const wrapper = mount(App);

        const input = await wrapper.find('input[type="text"]');
        const button = wrapper.find('button');

        await input.setValue('New Task');
        await button.trigger('click');

        expect(wrapper.find('New Task')).toBeTruthy();
    });
  });