/* tslint:disable:no-unused-expression*/
'use strict';
import ConciseBookCard from './index.vue';
import {
  expect
} from 'chai';
import {
  shallowMount,
  createLocalVue,
} from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import sinon from 'sinon';


describe('ConciseBookCard', () => {

  const book = {
    id: 1,
    title: 'Title',
    authors: 'Authors',
    thumbnail_link: 'thumbnail_link',
    preview_link: 'preview_link',
    published_date: '2010',
    username: 'Jack',
    offers: 42,
  };
  const localVue = createLocalVue();
  localVue.use(BootstrapVue);
  const wrapper = shallowMount(ConciseBookCard, {
    localVue,
    propsData: {
      book,
    },
  });
  const handleRemoveClick = sinon.stub();
  wrapper.setMethods({ handleRemoveClick });

  // it('renders with isLoaded equal to false', () => {
  //   expect(wrapper.vm.isLoaded).to.be.false;
  // });

  it('renders img tag with provided thumbnail_link', () => {
    expect(wrapper.find('img').attributes('src')).to.equal(book.thumbnail_link);
  });

  // it('sets isLoaded to true after image load triggered', () => {
  //   wrapper.find('img').trigger('load');
  //   expect(wrapper.vm.isLoaded).to.be.true;
  // });

  it('changes image src after image error triggered', () => {
    wrapper.find('img').trigger('error');
    expect(wrapper.find('img').attributes('src')).to.not.equal(book.thumbnail_link);
  });

  it('renders a tag with provided preview_link', () => {
    expect(wrapper.find('a').attributes('href')).to.equal(book.preview_link);
  });

  it('renders span with number of offers', () => {
    expect(wrapper.findAll('span').at(0).text()).to.contain(book.offers);
  });

  it('renders span with provided title', () => {
    expect(wrapper.findAll('span').at(1).attributes('data-original-title')).to.contain(book.title);
  });

  it('calls book remove', () => {
    wrapper.findAll('span').at(2).trigger('click');
    expect(handleRemoveClick.calledOnce).to.be.true;
  });
});
