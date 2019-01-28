/* tslint:disable:no-unused-expression*/
'use strict';

import TopNavbar from './index.vue';
import {
  expect
} from 'chai';
import {
  shallowMount,
  mount
} from '@vue/test-utils';



describe('TopNavbar', () => {

  const wrapper = shallowMount(TopNavbar, {
    computed: {
      isLoggedIn: () => {
        return false;
      },
      username: () => {
        return 'jack';
      },
      avatar: () => {
        return '';
      },
    },
  });
  it('renders b-nav-item with Users ref', () => {
    // expect(wrapper.vm.isLoggedIn).to.be.equal('User');
  });


});
