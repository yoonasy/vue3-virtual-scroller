<template>
  <RecycleScroller
    ref="scroller"
    :items="itemsWithSize"
    :min-item-size="minItemSize"
    :direction="direction"
    key-field="id"
    v-bind="$attrs"
    @resize="onScrollerResize"
    @visible="onScrollerVisible"
    v-on="listeners"
  >
    <template #default="{ item: itemWithSize, index, active }">
      <slot
        v-bind="{
          item: itemWithSize.item,
          index,
          active,
          itemWithSize
        }"
      />
    </template>
    <template #before>
      <slot name="before" />
    </template>
    <template #after>
      <slot name="after" />
    </template>
  </RecycleScroller>
</template>

<script>
import RecycleScroller from './RecycleScroller.vue'
import { props, simpleArray } from './common'

export default {
  name: 'DynamicScroller',

  components: {
    RecycleScroller,
  },

  provide () {
    let vscrollResizeObserver = undefined

    if (typeof ResizeObserver !== 'undefined') {
      vscrollResizeObserver = new ResizeObserver(entries => {
        for (const entry of entries) {
          if (entry.target) {
            const event = new CustomEvent('resize', {
                detail: {
                  contentRect: entry.contentRect,
                },
              },
            )
            entry.target.dispatchEvent(event)
          }
        }
      })
    }

    return {
      vscrollData: this.vscrollData,
      vscrollParent: this,
      vscrollResizeObserver,
      onUpdateScroll: (cb) => this.vScrollMap.push(cb),
    }
  },

  inheritAttrs: false,

  props: {
    ...props,

    minItemSize: {
      type: [Number, String],
      required: true,
    },
  },

  emits: ['vscroll:update', 'resize', 'visible'],

  data () {
    return {
      vscrollData: {
        active: true,
        sizes: {},
        validSizes: {},
        keyField: this.keyField,
        simpleArray: false,
      },
      vScrollMap: [],
    }
  },

  computed: {
    simpleArray,

    itemsWithSize () {
      const result = []
      const { items, keyField, simpleArray } = this
      const sizes = this.vscrollData.sizes
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        const id = simpleArray ? i : item[keyField]
        let size = sizes[id]
        if (typeof size === 'undefined' && !this.$_undefinedMap[id]) {
          size = 0
        }
        result.push({
          item,
          id,
          size,
        })
      }
      return result
    },

    listeners () {
      const listeners = {}

      for (const key in this.$attrs) {
        if (key.startsWith('on')) {
          if (key !== 'onResize' && key !== 'onVisible') {
            listeners[key] = this.$attrs
          }
        }
      }

      return listeners
    },
  },

  watch: {
    items () {
      this.forceUpdate(false)
    },

    simpleArray: {
      handler (value) {
        this.vscrollData.simpleArray = value
      },
      immediate: true,
    },

    direction (value) {
      this.forceUpdate(true)
    },
  },

  created () {
    this.$_updates = []
    this.$_undefinedSizes = 0
    this.$_undefinedMap = {}
  },

  activated () {
    this.vscrollData.active = true
  },

  deactivated () {
    this.vscrollData.active = false
  },

  methods: {
    onScrollerResize () {
      const scroller = this.$refs.scroller
      if (scroller) {
        this.forceUpdate()
      }
      this.$emit('resize')
    },

    onScrollerVisible () {
      this.vScrollUpdate(false)
      this.$emit('visible')
    },

    vScrollUpdate(force = false) {
      const data = { force }
      this.$emit('vscroll:update', data)

      this.vScrollMap.forEach(callback => callback(data))
    },

    forceUpdate (clear = true) {
      if (clear || this.simpleArray) {
        this.vscrollData.validSizes = {}
      }
      this.vScrollUpdate(true)
    },

    scrollToItem (index) {
      const scroller = this.$refs.scroller
      if (scroller) scroller.scrollToItem(index)
    },

    getItemSize (item, index = undefined) {
      const id = this.simpleArray ? (index != null ? index : this.items.indexOf(item)) : item[this.keyField]
      return this.vscrollData.sizes[id] || 0
    },

    scrollToBottom () {
      if (this.$_scrollingToBottom) return
      this.$_scrollingToBottom = true
      const el = this.$el
      // Item is inserted to the DOM
      this.$nextTick(() => {
        el.scrollTop = el.scrollHeight + 5000
        // Item sizes are computed
        const cb = () => {
          el.scrollTop = el.scrollHeight + 5000
          requestAnimationFrame(() => {
            el.scrollTop = el.scrollHeight + 5000
            if (this.$_undefinedSizes === 0) {
              this.$_scrollingToBottom = false
            } else {
              requestAnimationFrame(cb)
            }
          })
        }
        requestAnimationFrame(cb)
      })
    },
  },
}
</script>
