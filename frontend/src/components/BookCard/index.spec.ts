import BookCard from './index.vue';
import {expect} from 'chai';
import { mount, shallowMount } from '@vue/test-utils';

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

  const wrapper = mount(BookCard, {
    propsData: { book },
  });
  it('renders correct description', () => {
    expect(wrapper.find('.book-card__description').text()).equal('description');
  });
  it('renders correct title', () => {
    expect(wrapper.find('.book-card__title > strong').text()).equal('title');
  });
  it('renders correct authors', () => {
    // expect(wrapper.find('badge').text()).equal('authors');
    // TODO: nested library component
  });
});
