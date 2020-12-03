<template>
  <div class="dynamic-scroller-demo">
    <div class="toolbar">
      <input
        v-model="search"
        placeholder="Filter..."
      >

      <label>
        <input type="checkbox" v-model="dynamic">
        Dynamic scroller
      </label>
    </div>

    <DynamicScroller
      v-if="dynamic"
      :items="filteredItems"
      :min-item-size="54"
      class="scroller"
    >
      <template #before-container>
        <div class="notice">
          Array of simple strings (no objects).
        </div>
      </template>

      <template v-slot="{ item, index, active }">
        <DynamicScrollerItem
          :item="item"
          :index="index"
          :active="active"
          :data-index="index"
          :data-active="active"
          class="message"
        >
          <div class="text">
            {{ item }}
          </div>
          <div class="index">
            <span>{{ index }} (index)</span>
          </div>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>

    <RecycleScroller
      v-else
      :items="filteredItems.map((o, i) => `${i}: ${o.substr(0, 42)}...`)"
      :item-height="54"
      class="scroller"
    >
      <template v-slot="{ item, index }">
        <div class="message">
          <div class="text">
            {{ item }}
          </div>
          <div class="index">
            <span>{{ index }} (index)</span>
          </div>
        </div>
      </template>
    </RecycleScroller>
  </div>
</template>

<script lang="ts">
import { generateMessage } from '../data'

const items: string[] = []
for (let i = 0; i < 10000; i++) {
  items.push(generateMessage().message)
}

export default {
  data() {
    return {
      item: items,
      search: '',
      dynamic: true,
    }
  },

  computed: {
    filteredItems() {
      const { search, item } = this as any
      if (!search) return item
      const lowerCaseSearch = search.toLowerCase()
      return item.filter((i) => i.toLowerCase().includes(lowerCaseSearch))
    },
  },
}
</script>

<style scoped>
.dynamic-scroller-demo,
.scroller {
  height: 100%;
}

.dynamic-scroller-demo {
  overflow: hidden;
}

.notice {
  padding: 24px;
  font-size: 20px;
  color: #999;
}

.message {
  display: flex;
  min-height: 32px;
  padding: 12px;
  box-sizing: border-box;
}

.index,
.text {
  flex: 1;
}

.text {
  max-width: 400px;
}

.index span {
  display: inline-block;
  width: 160px;
  text-align: right;
}
</style>
