/* tslint:disable:no-unused-expression*/
'use strict';
import BookCard from './index.vue';
import {
  expect
} from 'chai';
import {
  shallowMount
} from '@vue/test-utils';
import sinon from 'sinon';

// @TODO: mock filter

describe('BookCard', () => {
  const book: IGoogleBook = {
    sourceApi: 'sourceApi',
    sourceId: 'sourceId',
    title: 'title',
    authors: 'authors',
    thumbnailLink: 'thumbnailLink',
    previewLink: 'previewLink',
    publishedDate: 'publishedDate',
    description: 'description',
  };

  const handleAddClick = sinon.spy();
  const wrapper = shallowMount(BookCard, {
    propsData: {
      book,
    },
  });
  wrapper.setMethods({
    handleAddClick,
  });
  it('renders with isLoaded equal to false', () => {
    expect(wrapper.vm.isLoaded).to.be.false;
  });
  it('renders a tag with provided src', () => {
    expect(wrapper.find('a').attributes('href')).to.equal(book.previewLink);
  });
  it('renders img tag with provided src inside a tag', () => {
    expect(wrapper.find('a > img').attributes('src')).to.equal(book.thumbnailLink);
  });
  it('renders correct description', () => {
    expect(wrapper.find('.book-card__description').text()).to.equal(book.description);
  });
  it('renders correct title', () => {
    expect(wrapper.find('.book-card__title > strong').text()).to.equal(book.title);
  });
  it('renders correct authors', () => {
    expect(wrapper.find('b-badge').text()).to.equal(book.authors);
  });
  it('sets isLoaded to true after image load triggered', () => {
    wrapper.find('img').trigger('load');
    expect(wrapper.vm.isLoaded).to.be.true;
  });
  it('changes image src after image error triggered', () => {
    wrapper.find('img').trigger('error');
    expect(wrapper.find('img').attributes('src')).to.not.equal(book.thumbnailLink);
  });
  it('renders add button that calls handleAddClick with book obj as arg on click', () => {
    wrapper.find('.book-card__add').trigger('click');
    expect(handleAddClick.callCount).to.equal(1);
    expect(handleAddClick.calledWithMatch(book)).to.be.true;
  });
});
