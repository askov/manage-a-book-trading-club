/* tslint:disable:no-unused-expression*/
'use strict';
import ConciseBookCard from './index.vue';
import {
  expect
} from 'chai';
import {
  shallowMount
} from '@vue/test-utils';


describe('ConciseBookCard', () => {

  const book = {
    id: 1,
    title: 'Title',
    authors: 'Authors',
    thumbnail_link: 'thumbnail_link',
    preview_link: 'preview_link',
    published_date: '2010',
    username: 'Jack',
  };
  const wrapper = shallowMount(ConciseBookCard, {
    propsData: {
      book,
    },
  });

  it('renders with isLoaded equal to false', () => {
    expect(wrapper.vm.isLoaded).to.be.false;
  });

  it('renders img tag with provided thumbnail_link', () => {
    expect(wrapper.find('img').attributes('src')).to.equal(book.thumbnail_link);
  });

  it('renders a tag with provided preview_link', () => {
    expect(wrapper.find('a').attributes('href')).to.equal(book.preview_link);
  });
  it('renders span with provided title', () => {
    expect(wrapper.findAll('span[role="button"]').at(1).attributes('title')).to.contain(book.title);
  });
});
