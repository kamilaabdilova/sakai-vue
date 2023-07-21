
import $api from '@/http'

async function addProduct(image, price, description, statusId) {
    console.log('we are in service');
    const response = await $api.post('/product/save', {
        // image: image,
        price: price,
        description: description,
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