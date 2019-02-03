/* tslint:disable:no-unused-expression*/
'use strict';
import UserCard from './index.vue';
import {
  expect
} from 'chai';
import {
  RouterLinkStub,
  shallowMount,
} from '@vue/test-utils';


describe('UserCard', () => {

  const user = {
    id: 1,
    username: 'Jack',
    avatar: 'avatar',
    books_added: 10,
  };
  const userDetailsRoute = {
    name: 'user-details',
    params: {
      userId: user.id,
    },
  };
  const userBooksRoute = {
    name: 'user-books',
    params: {
      userId: user.id,
    },
  };

  const wrapper = shallowMount(UserCard, {
    propsData: {
      user,
    },
    stubs: {
      RouterLink: RouterLinkStub,
    },
  });


  it('renders user details route with correct to', () => {
    expect(wrapper.findAll(RouterLinkStub).at(0).props().to).to.deep.equal(userDetailsRoute);
  });

  it('renders span with username contained in user details route', () => {
    const r = wrapper.findAll(RouterLinkStub).at(0);
    const n = r.find('span');
    expect(n.text()).to.be.equal(user.username);
  });

  it('renders UserAvatar with correct avatar prop contained in user details route', () => {
    const r = wrapper.findAll(RouterLinkStub).at(0);
    expect(r.find('useravatar-stub').props('avatar')).to.be.equal(user.avatar);
  });

  it('renders user books route with correct to', () => {
    expect(wrapper.findAll(RouterLinkStub).at(1).props().to).to.deep.equal(userBooksRoute);
  });

  it('renders b-badge with number of books added contained in books route', () => {
    const r = wrapper.findAll(RouterLinkStub).at(1);
    const b = r.find('b-badge');
    expect(b.text()).to.be.equal(`books: ${user.books_added}`);
  });
});
