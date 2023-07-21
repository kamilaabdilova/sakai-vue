<template>
  <Toast />
      <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
        <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
          <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">Add new product!</div>
          </div>

          <div>
            <FileUpload name="demo[]" customUpload @uploader="customBase64Uploader" :multiple="false" accept="image/*" :maxFileSize="1000000" md:w-30rem mb-5>
              <template #empty>
                <p>Drag and drop files to here to upload.</p>
              </template>
            </FileUpload>
            <label for="price" class="block text-900 text-xl font-medium mb-2">Price</label>
            <input v-model="productData.price" type="number" placeholder="Price" class="w-full md:w-30rem mb-5" style="padding: 1rem" />

            <label for="description" class="block text-900 text-xl font-medium mb-2">Description</label>
            <input v-model="productData.description" type="text" placeholder="Description" class="w-full md:w-30rem mb-5" style="padding: 1rem" />

            <label for="status" class="block text-900 text-xl font-medium mb-2">Status</label>
              <Dropdown v-model="productData.statusId" :options="productStatuses" optionLabel="name" placeholder="Select status" class="w-full md:w-30rem mb-5" />
           </div>
          <Button @click="addNewProduct" label="Submit" class="mr-2 mb-2">Add product</Button>

<!--          <button @click="addNewProduct" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style="margin-top: 30px;">-->
<!--            Add Product-->
<!--          </button>-->
        </div>
      </div>
</template>
<script setup>
import {reactive, ref} from 'vue';
import * as AddProductService from "@/service/AddProductService";
import { useToast } from 'primevue/usetoast';


const productData = reactive({
  image: '',
  price: '',
  description: '',
  statusId: null,
});

const toast = useToast();

const uploadedImage = ref();

const productStatuses = ref([
  { name: 'IN STOCK', code: '1' },
  { name: 'OUT OF STOCK', code: '2' },
  { name: 'LOW STOCK', code: '3' }
]);

async function addNewProduct() {
  try {
    const response = await AddProductService.addProduct(
        productData.image,
        productData.price,
        productData.description,
        productData.statusId.code
    );

    productData.image = '';
    productData.price = '';
    productData.description = '';
    productData.statusId = '';

    products.value.push(response.data);
    toast.add({ severity: 'success', summary: 'Success', detail: "Product added successfully!", life: 2000 });
    console.log('Product added successfully!', response.data);
  } catch (error) {
    console.error('Failed to add product:', error);
    toast.add({ severity: 'error', summary: 'Error', detail: error, life: 2000 });
  }
}

const customBase64Uploader = async (event) => {
  const file = event.files[0];
  const reader = new FileReader();
  let blob = await fetch(file.objectURL).then((r) => r.blob());

  reader.readAsDataURL(blob);

  reader.onloadend = function () {
    const fileName = file.name;
    const extension = fileName.substring(fileName.lastIndexOf('.') + 1);
    const base64data = reader.result;
    const options = {
      imageName: fileName,
      imageExtension: extension,
      imageData: base64data
    };
    try
    {
      const result = AddProductService.uploadImage(options);
      console.log(result);
      toast.add({ severity: 'success', summary: 'Success', detail: result, life: 2000 });
      productData.image = result;
    }
    catch(error) {
      toast.add({severity: 'error', summary: 'Error', detail: error, life: 2000});
    }
  };
};

const products = ref([]);
</script>

