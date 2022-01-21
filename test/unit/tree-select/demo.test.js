import { mount } from '@vue/test-utils';
import base from '@/examples/tree-select/demos/base.vue';
import multiple from '@/examples/tree-select/demos/multiple.vue';
import collapsed from '@/examples/tree-select/demos/collapsed.vue';
import filterable from '@/examples/tree-select/demos/filterable.vue';
import valuetype from '@/examples/tree-select/demos/valuetype.vue';
import props from '@/examples/tree-select/demos/props.vue';
import lazy from '@/examples/tree-select/demos/lazy.vue';
import prefix from '@/examples/tree-select/demos/prefix.vue';
import valuedisplay from '@/examples/tree-select/demos/valuedisplay.vue';

// unit test for component in examples.
describe('TreeSelect', () => {
  it('base demo works fine', () => {
    const wrapper = mount(base);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('multiple demo works fine', () => {
    const wrapper = mount(multiple);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('collapsed demo works fine', () => {
    const wrapper = mount(collapsed);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('filterable demo works fine', () => {
    const wrapper = mount(filterable);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('valuetype demo works fine', () => {
    const wrapper = mount(valuetype);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('props demo works fine', () => {
    const wrapper = mount(props);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('lazy demo works fine', () => {
    const wrapper = mount(lazy);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('prefix demo works fine', () => {
    const wrapper = mount(prefix);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('valuedisplay demo works fine', () => {
    const wrapper = mount(valuedisplay);
    expect(wrapper.element).toMatchSnapshot();
  });
});
