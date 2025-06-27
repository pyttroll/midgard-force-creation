<template>
  <ol>
    <label v-for="co in contingentOptions" :key="co"
      ><input
        :type="qty > 1 ? 'checkbox' : 'radio'"
        :name="`${props.name}-contingent`"
        :value="co"
        :checked="contingentInternal?.find((x) => x.value === co) != null"
        @change="(e) => onContingentChange((e.target as HTMLInputElement).checked, co)"
      />{{ co }}
      <span class="unit-allocation" v-show="qty > 1">
        <input
          class="qty"
          type="number"
          :value="
            contingentInternal?.find((x) => x.value === co)
              ? contingentInternal?.find((x) => x.value === co).qty
              : null
          "
          @change="(e) => onContingentQuantityChange((e.target as HTMLInputElement).value, co)"
        />
        <span class="badge"># units</span>
      </span>
    </label>
  </ol>
</template>

<script setup lang="ts">
import { IContingentAllocation } from '@/models/Contingent'
import { onMounted, Ref, ref, watch } from 'vue'

interface IProps {
  name: string
  contingent: Array<IContingentAllocation> | null
  qty?: number
  isHeroUnit?: boolean
}

const props = withDefaults(defineProps<IProps>(), { qty: 1, isHeroUnit: false })

const emit = defineEmits(['changed'])

const contingentInternal: Ref<Array<IContingentAllocation>> = ref([])
const contingentOptions = ref(['I', 'II', 'III', 'IV'])

function onContingentQuantityChange(inputValue: string, contingentOption: string) {
  const qty = parseInt(inputValue)
  if (!isNaN(qty)) {
    let entry = contingentInternal.value.find((x) => x.value === contingentOption)
    if (entry == null) {
      entry = { value: contingentOption, qty }
      contingentInternal.value.push(entry)
    }
    entry.qty = qty
    emit('changed', contingentInternal.value)
  }
}

function onContingentChange(isChecked: boolean, contingentOption: string) {
  if (props.isHeroUnit || props.qty === 1) {
    contingentInternal.value = [{ value: contingentOption, qty: 1 }]
  } else {
    if (isChecked) {
      const qty = Math.max(
        1,
        props.qty - contingentInternal.value.reduce((sum, x) => sum + x.qty, 0),
      )
      const existing = contingentInternal.value.find((c) => c.value === contingentOption)
      if (existing) {
        existing.qty = qty
      } else {
        contingentInternal.value.push({
          value: contingentOption,
          qty,
        })
      }
    } else {
      contingentInternal.value = contingentInternal.value.filter(
        (x) => x.value !== contingentOption,
      )
    }
  }
  emit('changed', contingentInternal.value)
}

// watch(
//   contingentInternal,
//   (val) => {
//     emit('changed', val)
//   },
//   { deep: true },
// )

watch(
  () => props.contingent,
  (val) => {
    contingentInternal.value = val || []
  },
)

watch(
  () => props.qty,
  (val) => {
    const firstAllocation = contingentInternal.value?.length
      ? contingentInternal.value.find((x) => x.qty > 0)
      : null
    if (firstAllocation) {
      const qtyAllocated = contingentInternal.value.reduce((mem, x) => mem + x.qty, 0)
      if (qtyAllocated > val) {
        firstAllocation.qty -= qtyAllocated - val
      } else {
        firstAllocation.qty += val - qtyAllocated
      }
    }
  },
)

onMounted(() => {
  contingentInternal.value = props.contingent ? [...props.contingent] : []
})
</script>

<style lang="scss" scoped>
ol {
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;

  label {
    .qty {
      width: 3.5rem;
    }

    .unit-allocation {
      position: relative;
      .badge {
        background-color: #eee;
        font-size: 0.8em;
        font-weight: 800;
        font-family: var(--base-font);
        position: absolute;
        margin-top: 3rem;
        left: 0;
      }
    }
  }
}
</style>
