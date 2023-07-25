<script setup>
import {ref, onMounted, reactive, computed} from 'vue';
import ProductService from '@/service/ProductService';
import {getListProduct} from "@/service/AddProductService";

const orderlistValue = ref([
  {name: 'San Francisco', code: 'SF'},
  {name: 'London', code: 'LDN'},
  {name: 'Paris', code: 'PRS'},
  {name: 'Istanbul', code: 'IST'},
  {name: 'Berlin', code: 'BRL'},
  {name: 'Barcelona', code: 'BRC'},
  {name: 'Rome', code: 'RM'}
]);
// const dataviewValue = ref([]); // Initialize as an empty array
// async function getAllProduct() {
//   try {
//     const response = await getListProduct();
//
//     let products = []
//     for (let i = 0; i < response.length; i++) {
//       let item = response[i]
//
//       products.push({
//         description: item.description,
//         id: item.id,
//         image: item.image,
//         inventoryStatus: item.status,
//         price: item.price,
//       })
//     }
//     dataviewValue.value.unshift(...products);
//   } catch (e) {
//     console.error(e);
//   }
// }
// const sortedDataviewValue = computed(() => {
//   return dataviewValue.value.slice().reverse();
// });

const convertBase64ToImageURL = async (base64String) => {
  return `data:image/png;base64,${base64String}`
}

async function getAllProduct() {
  try {
    await (async () => {
      getListProduct().then(response => {

        let products = []
        for (let i = 0; i < response.length; i++) {
          let item = response[i]

          products.push({
             category: item.category,
            // code: 'null',
            description: item.description,
            id: item.id,
            image: item.image,
            inventoryStatus: item.status,
            // name: 'null',
            price: item.price,
            // quantity: 5,
            // rating: 5
          })
        }
        dataviewValue.value = products
      })
    })()
  } catch (e) {
    console.log(e)
  }
}

const dataviewValue = ref(null);
const layout = ref('grid');
const sortKey = ref(null);
const sortOrder = ref(null);
const sortField = ref(null);
const sortOptions = ref([
  {label: 'Price High to Low', value: '!price'},
  {label: 'Price Low to High', value: 'price'}
]);

const productService = new ProductService();
onMounted(() => {
  // productService.getProductsSmall().then((data) => (dataviewValue.value = data));
  getAllProduct()
  console.log(dataviewValue)
});

const onSortChange = (event) => {
  const value = event.value.value;
  const sortValue = event.value;

  if (value.indexOf('!') === 0) {
    sortOrder.value = -1;
    sortField.value = value.substring(1, value.length);
    sortKey.value = sortValue;
  } else {
    sortOrder.value = 1;
    sortField.value = value;
    sortKey.value = sortValue;
  }
};
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>DataView</h5>
        <DataView :value="dataviewValue" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder"
                  :sortField="sortField">
          <template #header>
            <div class="grid grid-nogutter">
              <div class="col-6 text-left">
                <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Price"
                          @change="onSortChange($event)"/>
              </div>
              <div class="col-6 text-right">
                <DataViewLayoutOptions v-model="layout"/>
              </div>
            </div>
          </template>
          <template #grid="slotProps">
            <div class="col-12 md:col-4">
              <div class="card m-3 border-1 surface-border">
                <div class="flex align-items-center justify-content-between">
                  <div class="flex align-items-center">
                    <i class="pi pi-tag mr-2"></i>
                    <span class="font-semibold">{{ slotProps.data.category === null ? ' ' : slotProps.data.category.nameCategory}}</span>
                  </div>
                  <span class="product-badge">{{
                      slotProps.data.inventoryStatus === null ? ' ' : slotProps.data.inventoryStatus.status
                    }}</span>
                </div>
                <div class="text-center">
                  <img style="width: 140px; height: 100px" :src="'data:image/png;base64,'+slotProps.data.image.image" :alt="slotProps.data.image.name" />

                  <div class="text-2xl font-bold">{{ slotProps.data.name }}</div>
                  <div class="mb-3">{{ slotProps.data.description }}</div>
                  <!--                                    <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false"></Rating>-->
                </div>
                <div class="flex align-items-center justify-content-between">
                  <span class="text-2xl font-semibold">${{ slotProps.data.price }}</span>
                  <Button icon="pi pi-shopping-cart"></Button>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>
    </div>

    <div class="col-12 lg:col-4">
      <div class="card">
        <h5>OrderList</h5>
        <OrderList v-model="orderlistValue" listStyle="height:250px" dataKey="code" :rows="10">
          <template #header>Products</template>
          <template #item="slotProps">
            <div>{{ slotProps.item.name }}</div>
          </template>
        </OrderList>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/demo/styles/badges.scss';
</style>
