/* tslint:disable:no-unused-expression*/
'use strict';
import BookList from './index.vue';
import {
  expect
} from 'chai';
import {
  shallowMount
} from '@vue/test-utils';


describe('BookList', () => {
  const wrapper = shallowMount(BookList, {
    propsData: {
      books: [],
      isLoading: false,
    },
  });

  it('renders virtual-list component', () => {
    expect(wrapper.contains('virtual-list')).to.be.true;
  });

  it('contains invisible virtual list parent when book list is empty', () => {
    expect(wrapper.find('.vld-parent').isVisible()).to.be.false;
  });

  it('contains visible virtual list parent when component when isLoading is true', () => {
    wrapper.setProps({
      isLoading: true,
    });
    expect(wrapper.find('.vld-parent').isVisible()).to.be.true;
  });

  it('h6 is invisible when book list is empty', () => {
    expect(wrapper.find('h6').isVisible()).to.be.false;
  });

  it('b-badge displays the number of books', () => {
    const books = [{
      title: 'A',
    }, {
      title: 'B',
    }];
    wrapper.setProps({
      books,
    });
    expect(wrapper.find('b-badge').text()).to.equal(`books discovered: ${books.length}`);
  });

});
