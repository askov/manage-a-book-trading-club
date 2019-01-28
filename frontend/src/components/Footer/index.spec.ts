/* tslint:disable:no-unused-expression*/
'use strict';
import Footer from './index.vue';
import {
  expect
} from 'chai';
import {
  shallowMount
} from '@vue/test-utils';


describe('Footer', () => {
  const wrapper = shallowMount(Footer);

  it('renders 4 a tags with non empty href', () => {
    expect(wrapper.findAll('a')).to.be.lengthOf(4);
    const { wrappers } = wrapper.findAll('a');
    wrappers.forEach((a: any) => {
      expect(a.attributes('href')).to.be.a('string').with.lengthOf.above(1);
    });
  });


});
