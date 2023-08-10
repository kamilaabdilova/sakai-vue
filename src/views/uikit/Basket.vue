<template>
  <div class="col-12">
    <div class="card">
      <h5>Your basket:</h5>
      <div class="card m-3 border-1 surface-border" v-for="item in basketListValue.baskets" :key="item"  @click="viewProduct(item)"
           style="cursor: pointer">
        <Toast/>
        <div class="flex align-items-center justify-content-between">
          <img style="width: 140px; height: 100px"
               :src="'data:image/png;base64,' + item.image.image"
               :alt="item.image.name"/>
          <div class="font-semibold">{{ item.category == null ? '' : item.category.nameCategory }}</div>
          <div>{{ item.description }}</div>
          <div class="text-2xl font-semibold">${{ item.price }}</div>
          <Button icon="pi pi-trash " @click="removeFromBasket(item)"/>
        </div>
      </div>
      <h5>Number of products in the basket : {{ basketListValue.baskets.length }}</h5>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, reactive, watch} from 'vue';
import {useStore} from 'vuex';
import {useToast} from "primevue/usetoast";

const toast = useToast();
const store = useStore();
const currentUser = store.state.auth.user.userName;

const viewProduct = (product) => {
  // Handle the behavior when clicking on an existing product
  console.log(`Clicked on product with ID: ${product.id}`);
};

const basketListValue = reactive({
  baskets: []
})

onMounted(() => {
  basketListValue.baskets = []
  basketListValue.baskets = store.state.basket.basket.filter(item => item.userName === currentUser);
})

watch(() => store.state.basket.basket, (newBasket) => {
  basketListValue.baskets = newBasket.filter(item => item.userName === currentUser);
});

const removeFromBasket = async (item) => {
  await store.dispatch('basket/removeFromBasket', item);
  toast.add({severity: 'success', summary: 'Product successfully removed from the basket!', life: 3000});
};


</script>
