import BookCard from './index.vue';
import {expect} from 'chai';
import { shallowMount } from '@vue/test-utils';
const sinon = require('sinon');


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

  const handleAddClick = sinon.spy(BookCard.methods, 'handleAddClick')
  const wrapper = shallowMount(BookCard, {
    propsData: { book },
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
    expect(wrapper.vm.isLoaded).to.be.false;
    wrapper.find('img').trigger('load');
    expect(wrapper.vm.isLoaded).to.be.true;
  });
  it('changes image src after image error triggered', () => {
    wrapper.find('img').trigger('error');
    expect(wrapper.find('img').attributes('src')).to.not.equal(book.thumbnailLink);
  });
  it('changes image src after image error triggered', () => {
    wrapper.find('.book-card__add').trigger('click');
    expect(handleAddClick.calledOnce).to.be.true;
  });
});
