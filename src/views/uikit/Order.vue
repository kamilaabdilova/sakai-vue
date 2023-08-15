<template>
  <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
    <div class="flex flex-column align-items-center justify-content-center">
      <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0"/>
      <div
          style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
        <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
          <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">Order!</div>
          </div>
          <div>
            <label for="address" class="block text-900 text-xl font-medium mb-2">Address</label>
<!--            <InputText id="address" type="text" placeholder="Address" class="w-full md:w-30rem mb-5" style="padding: 1rem"/>-->
            <input v-model="address" id="address" type="text" placeholder="Address" class="w-full md:w-30rem mb-5" style="padding: 1rem"/>


            <label for="phone" class="block text-900 font-medium text-xl mb-2">Phone</label>
            <input v-model="formattedPhone" id="phone" type="text" placeholder="Phone" class="w-full md:w-30rem mb-5" style="padding: 1rem"/>
<!--            <InputText-->
<!--                id="phone"-->
<!--                type="text"-->
<!--                placeholder="Phone"-->
<!--                class="w-full md:w-30rem mb-5"-->
<!--                style="padding: 1rem"-->
<!--                v-model="formattedPhone"-->
<!--            />-->
            <label for="date" class="block text-900 text-xl font-medium mb-2">Order Date</label>
            <input v-model="selectedDate" id="date" type="date" class="w-full md:w-30rem mb-5" style="padding: 1rem" :min="minDate"/>
<!--            <input-->
<!--                id="date"-->
<!--                type="date"-->
<!--                class="w-full md:w-30rem mb-5"-->
<!--                style="padding: 1rem"-->
<!--                :min="minDate"-->
<!--                v-model="selectedDate"-->
<!--            />-->
            <label for="payment" class="block text-900 font-medium text-xl mb-2">Payment method:</label>
            <div class="mb-5">
              <div class="flex items-center mb-2">
                <input v-model="selectedPayment" type="radio" id="cash" value="cash" class="mr-2" :disabled="selectedPayment === 'card'"/>
<!--                <input-->
<!--                    type="radio"-->
<!--                    id="cash"-->
<!--                    value="cash"-->
<!--                    v-model="selectedPayment"-->
<!--                    class="mr-2"-->
<!--                    :disabled="selectedPayment === 'card'"-->
<!--                />-->
                <label for="cash">Pay with cash</label>
              </div>
              <div class="flex items-center">
                <input v-model="selectedPayment" type="radio" id="card" value="card" class="mr-2" :disabled="selectedPayment === 'cash'"/>
<!--                <input-->
<!--                    type="radio"-->
<!--                    id="card"-->
<!--                    value="card"-->
<!--                    v-model="selectedPayment"-->
<!--                    class="mr-2"-->
<!--                    :disabled="selectedPayment === 'cash'"-->
<!--                />-->
                <label for="card">Pay with card</label>
              </div>
            </div>
            <Button class="p-button-primary" @click="submitOrder" label="Оформить заказ"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {computed, ref} from 'vue';
import {saveOrder} from "@/service/OrderService";
import store from "@/store";

const selectedPayment = ref(null);

const selectedDate = ref(null);

const currentDate = new Date();
const minAllowedDate = new Date(currentDate);
minAllowedDate.setDate(minAllowedDate.getDate() + 7);

const minDate = computed(() => {
  const year = minAllowedDate.getFullYear();
  const month = (minAllowedDate.getMonth() + 1).toString().padStart(2, '0');
  const day = minAllowedDate.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
});
const formattedPhone = ref('+996');

const products = () => {
  let productsId = []

  store.state.basket.basket.forEach((item) => {
    productsId.push(item.id)
  })

  return productsId
}
const submitOrder = async () => {
  try {
    const orderData = {
      address: address.value,
      products: products(),
      phone: formattedPhone.value,
      date: selectedDate.value,
      // payment: selectedPayment.value === 'card' ? 'card' : 'cash'
      payment:selectedPayment.value === 'card'
    };
    console.log(orderData)
    const savedOrder = await saveOrder(orderData);
    console.log('Order saved:', savedOrder);
  } catch (error) {
    console.error('Error while saving the order:', error);
  }
};


</script>