import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import StyleElement from '../StyleElement.vue'

describe('StyleElement', () => {
  it('renders properly', () => {
    const wrapper = mount(StyleElement, { props: { name: 'margin' } });
    expect(wrapper.text()).toContain('margin');
    expect(wrapper.find('input').exists()).toBe(true);
  })
})
