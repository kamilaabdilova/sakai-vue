<template>
  <div class="col-12">
    <div class="card">
      <h5>Your basket:</h5>

      <RouterLink to="/uikit/list" class="p-link layout-topbar-button">
        <span>Back to catalog</span>
      </RouterLink>

      <div class="card m-3 border-1 surface-border" v-for="item in basketListValue.baskets" :key="item.id">
         <router-link
             :to="{ name: 'productItem', query: { id: item.id }  }">
           <Toast />
           <div class="flex align-items-center justify-content-between">
             <img style="width: 140px; height: 100px"
                  :src="'data:image/png;base64,' + item.image.image"
                  :alt="item.image.name"/>
             <div class="font-semibold">{{ item.category == null ? '' : item.category.nameCategory }}</div>
             <div>{{ item.description }}</div>
             <div class="text-2xl font-semibold">${{ item.price }}</div>
             <Button icon="pi pi-trash " @click="removeFromBasket(item)"/>
           </div>
         </router-link>
      </div>
      <h5>Number of products in the basket : {{ basketListValue.baskets.length }}</h5>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, watch } from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import {useRouter} from "vue-router";

const toast = useToast();
const store = useStore();
const currentUser = store.state.auth.user.userName;

const basketListValue = reactive({
  baskets: [],
});

onMounted(() => {
  basketListValue.baskets = store.state.basket.basket.filter((item) => item.userName === currentUser);
});

watch(() => store.state.basket.basket, (newBasket) => {
  basketListValue.baskets = newBasket.filter((item) => item.userName === currentUser);
});

const removeFromBasket = async (item) => {
  await store.dispatch('basket/removeFromBasket', item);
  toast.add({ severity: 'success', summary: 'Product successfully removed from the basket!', life: 3000 });
};
</script>
