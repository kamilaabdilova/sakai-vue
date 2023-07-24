
import $api from '@/http'
// import {props as products} from "primevue/tag";

async function addProduct(productData, statusId) {
    debugger

    console.log('we are in service');
    const response = await $api.post('/product/save', {
        imageId: productData.imageId,
        price: productData.price,
        description: productData.description,
        statusId: statusId
    });
    console.log(response);

    return response;
}

function uploadImage(options) {
    const resp = $api.post('/product/upload', options);
    return resp;
}
async function getListProduct(){
    try {
        const response = await $api.get('/product/findAll');
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }

}

export {
    addProduct,
    uploadImage,
    getListProduct
}