export const props = {
  items: {
    type: Array,
    required: true,
  },

  keyField: {
    type: String,
    default: 'id',
  },

  direction: {
    type: String,
    default: 'vertical',
    validator: (value) => ['vertical', 'horizontal'].includes(value),
  },
}

export const scrollParent = () => {
  const regex = /(auto|scroll)/;

  function parents (node, ps) {
    if (node.parentNode === null) { return ps; }
    return parents(node.parentNode, ps.concat([node]));
  }

  function style (node, prop) {
    return getComputedStyle(node, null).getPropertyValue(prop);
  }

  function overflow (node) {
    return style(node, "overflow") + style(node, "overflow-y") + style(node, "overflow-x");
  }

  function scroll (node) {
    return regex.test(overflow(node));
  }

  function scrollParent (node) {
    if (!(node instanceof HTMLElement || node instanceof SVGElement)) {
      return ;
    }

    const ps = parents(node.parentNode, []);

    for (let i = 0; i < ps.length; i += 1) {
      if (scroll(ps[i])) {
        return ps[i];
      }
    }

    return document.scrollingElement || document.documentElement;
  }

  return scrollParent;
}

export function simpleArray () {
  return this.items.length && typeof this.items[0] !== 'object'
}
