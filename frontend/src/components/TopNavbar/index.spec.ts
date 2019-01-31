/* tslint:disable:no-unused-expression*/
'use strict';

import TopNavbar from './index.vue';
import {
  expect
} from 'chai';
import {
  createLocalVue,
  shallowMount,
} from '@vue/test-utils';
import sinon from 'sinon';
import BootstrapVue from 'bootstrap-vue';
import Router from 'vue-router';


describe('TopNavbar', () => {

  const buildWrapper = (authorized = false) => {
    const localVue = createLocalVue();
    localVue.use(BootstrapVue);
    localVue.use(Router);
    return shallowMount(TopNavbar, {
      localVue,
      computed: {
        isLoggedIn: () => {
          return authorized;
        },
        username: () => {
          return 'jack';
        },
        avatar: () => {
          return '';
        },
      },
    });
  };

  // Auth state independent menu
  it('renders b-nav-item with Users ref for unauthorized users', () => {
    const ref = buildWrapper().findAll('bnavitem-stub').at(0);
    expect(ref.text()).to.be.equal('Users');
  });

  it('renders b-nav-item with Books ref for unauthorized users', () => {
    const ref = buildWrapper().findAll('bnavitem-stub').at(1);
    expect(ref.text()).to.be.equal('Books');
  });

  it('renders b-nav-item with Users ref for authorized users', () => {
    const ref = buildWrapper(true).findAll('bnavitem-stub').at(0);
    expect(ref.text()).to.be.equal('Users');
  });

  it('renders b-nav-item with Books ref for authorized users', () => {
    const ref = buildWrapper(true).findAll('bnavitem-stub').at(1);
    expect(ref.text()).to.be.equal('Books');
  });

  // Auth state dependent menu
  it('renders UserAvatar wrapped by b-nav-item for authorized users', () => {
    expect(buildWrapper(true).contains('bnavitem-stub > useravatar-stub')).to.be.true;
  });

  it('renders b-nav-item with Log out ref for authorized users', () => {
    const ref = buildWrapper(true).findAll('bnavitem-stub').at(3);
    expect(ref.text()).to.be.equal('Log out');
  });

  // @todo: does this even make any sense?
  it('calls log out handler when b-nav-item with Log out button', () => {
    const w = buildWrapper(true);
    const logOut = sinon.stub();
    w.setMethods({ logOut });
    w.findAll('bnavitem-stub').at(3).trigger('click');
    expect(logOut.calledOnce).to.be.true;
    w.destroy();
  });

  it('renders b-nav-item with Log out ref for unauthorized users', () => {
    const ref = buildWrapper().findAll('bnavitem-stub').at(2);
    expect(ref.text()).to.be.equal('Register');
  });

  it('renders b-nav-item with Log out ref for unauthorized users', () => {
    const ref = buildWrapper().findAll('bnavitem-stub').at(3);
    expect(ref.text()).to.be.equal('Log in');
  });
});
