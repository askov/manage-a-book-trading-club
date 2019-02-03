/* tslint:disable:no-unused-expression*/
'use strict';
import UserAvatar from './index.vue';
import {
  expect
} from 'chai';
import {
  shallowMount,
  createLocalVue,
} from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';


describe('UserAvatar', () => {
  const createWrapper = (propsData: any): any => {
    const localVue = createLocalVue();
    localVue.use(BootstrapVue);
    return shallowMount(UserAvatar, {
      localVue,
      propsData,
    });
  };

  it('renders avatar wrapper div', () => {
    const wrapper = createWrapper({});
    expect(wrapper.contains('.avatar-wrapper')).to.be.true;
  });

  // Title
  it('renders avatar wrapper div with default title when title is not provided', () => {
    const wrapper = createWrapper({title: ''});
    // @todo
    expect(wrapper.find('.avatar-wrapper').props('title')).to.equal('Click to select your avatar');
  });

  it('renders avatar wrapper div with provided title', () => {
    const userAvatar = {
      title: 'title',
    };
    const wrapper = createWrapper(userAvatar);
    expect(wrapper.find('.avatar-wrapper').props('title')).to.equal(userAvatar.title);
  });

  it('', () => {
    // @todo handle click
    const wrapper = createWrapper({});
  });

  it('renders avatar wrapper with "avatar-placeholder" class when avatar prop is incorrect', () => {
    const wrapper = createWrapper({});
    expect(wrapper.contains('.avatar-wrapper.avatar-placeholder')).to.be.true;
  });

  it('renders avatar wrapper without "avatar-placeholder" class when avatar prop is correct', () => {
    const userAvatar = {
      avatar: 'avatar',
    };
    const wrapper = createWrapper(userAvatar);
    expect(wrapper.contains('.avatar-wrapper.avatar-placeholder')).to.be.false;
  });

  it('renders avatar wrapper "with avatar-wrapper--small" class when size prop equals "small"', () => {
    const userAvatar = {
      size: 'small',
    };
    const wrapper = createWrapper(userAvatar);
    expect(wrapper.contains('.avatar-wrapper.avatar-wrapper--small')).to.be.true;
    expect(wrapper.contains('.avatar-wrapper.avatar-wrapper--middle')).to.be.false;
  });

  it('renders avatar wrapper with "avatar-wrapper--middle" class when size prop equals "middle"', () => {
    const userAvatar = {
      size: 'middle',
    };
    const wrapper = createWrapper(userAvatar);
    expect(wrapper.find('.avatar-wrapper').classes()).to.contain('avatar-wrapper--middle');
    expect(wrapper.find('.avatar-wrapper').classes()).to.not.contain('avatar-wrapper--small');
  });

  // Image
  it('renders img with appropriate src when avatar is provided', () => {
    const userAvatar = {
      avatar: 'avatar',
    };
    const wrapper = createWrapper(userAvatar);
    expect(wrapper.find('img').attributes('src')).to.equal(userAvatar.avatar);
  });

  it('does not render img if falsy avatar is provided', () => {
    const wrapper = createWrapper({});
    expect(wrapper.contains('img')).to.be.false;
  });



  // File input
  it('renders hidden file input when editable prop is true', () => {
    const userAvatar = {
      editable: true,
    };
    const wrapper = createWrapper(userAvatar);
    expect(wrapper.contains('input[type="file"]')).to.be.true;
    expect(wrapper.find('input[type="file"]').isVisible()).to.be.false;
  });

  it('does not render file input when editable prop is false', () => {
    const userAvatar = {
      editable: false,
    };
    const wrapper = createWrapper(userAvatar);
    expect(wrapper.contains('input[type="file"]')).to.be.false;
  });

  it('', () => {
    // @todo: handle change
  });
});

