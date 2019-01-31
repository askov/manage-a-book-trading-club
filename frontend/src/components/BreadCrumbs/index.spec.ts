/* tslint:disable:no-unused-expression*/
'use strict';
import BreadCrumbs from './index.vue';
import {
  expect
} from 'chai';
import {
  createLocalVue,
  shallowMount,
} from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';


describe('BreadCrumbs', () => {
  let wrapper: any;

  const createWrapper = ($route: any): any => {
    const localVue = createLocalVue();
    localVue.use(BootstrapVue);
    return shallowMount(BreadCrumbs, {
      localVue,
      mocks: {
        $route,
      },
    });
  };

  const createEmptyRoute = (): any => {
    return {
      params: {},
      matched: [],
    };
  };
  it('should render b-breadcrumb component', () => {
    const route = createEmptyRoute();
    wrapper = createWrapper(route);
    expect(wrapper.contains('bbreadcrumb-stub')).to.be.true;
  });

  it('should contain appropriate computed bc of Array type ', () => {
    const route = createEmptyRoute();
    wrapper = createWrapper(route);
    expect(wrapper.vm.bc).to.be.an('Array');
  });

  it('should contain empty bc when $route matched array is empty', () => {
    const route = createEmptyRoute();
    wrapper = createWrapper(route);
    expect(wrapper.vm.bc).to.be.empty;
  });

  it('should contain appropriate bc for provided $route config', () => {
    const route = {
      params: {
        bookId: 17,
        userId: 5,
      },
      matched: [{
          path: '/users',
          name: 'users',
          meta: {
            bc: 'Users',
          },
        },
        {
          path: '/users/:userId(\\d+)',
          name: 'user-details',
          meta: {
            // we expect this to be replaced with appropriate param value (userId)
            bc: 'placeholder',
          },
        },
        {
          path: '/users/:userId(\\d+)/books',
          name: 'user-books',
          meta: {
            bc: 'Books',
          },
        },
        {
          path: '/users/:userId(\\d+)/books/:bookId(\\d+)',
          name: 'user-book-details',
          meta: {
            // we expect this to be replaced with appropriate param value (bookId)
            bc: 'placeholder',
          },
        },
      ],
    };
    wrapper = createWrapper(route);
    expect(wrapper.vm.bc).to.have.lengthOf(route.matched.length);
    wrapper.vm.bc.forEach((el: any, index: number) => {
      expect(el.to.name).to.be.equal(route.matched[index].name);
      if (index === 1) {
        expect(el.text).to.be.equal(route.params.userId);
      } else if (index === 3) {
        expect(el.text).to.be.equal(route.params.bookId);
      } else {
        expect(el.text).to.be.equal(route.matched[index].meta.bc);
      }
    });
  });
});
