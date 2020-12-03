<template>
  <div class="hello">
    <div>
      <button @click="addItems()">
        Add item
      </button>
      <button @click="addItems(5)">
        Add 5 items
      </button>
      <button @click="addItems(10)">
        Add 10 items
      </button>
    </div>

    <DynamicScroller
      ref="scroller"
      :items="items"
      :min-item-size="24"
      class="scroller"
      @resize="scrollToBottom()"
    >
      <template v-slot="{ item, index, active }">
        <DynamicScrollerItem
          :item="item"
          :active="active"
          :data-index="index"
        >
          <div
            class="message"
            :style="{
              height: `${item.size}px`,
            }"
          >
            {{ item.text }}
          </div>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
  </div>
</template>

<script lang="ts">
import faker from 'faker'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'TestChat',

  setup() {
    const items = ref<{ text: string; id: number; size: number }[]>([])
    const scroller = ref<any>(null)

    const scrollToBottom = () => {
      if (!scroller.value) return

      scroller.value.scrollToBottom()
    }

    const addItems = (count = 1) => {
      for (let i = 0; i < count; i++) {
        items.value.push({
          text: faker.lorem.sentence(),
          id: items.value.length + 1,
          size: Math.random() * 120 + 40,
        })
      }
      scrollToBottom()
    }

    return {
      items,
      scroller,
      addItems,
      scrollToBottom,
    }
  },
})
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.scroller {
  height: 500px;
  border: 2px solid #ddd;
}

.message {
  padding: 10px 10px 9px;
  border-bottom: solid 1px #eee;
}
</style>
