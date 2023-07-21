
import $api from '@/http'

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

export {
    addProduct,
    uploadImage
}