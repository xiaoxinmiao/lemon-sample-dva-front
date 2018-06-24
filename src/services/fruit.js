
import request from '../utils/request';
import { PAGE_SIZE } from '../constants';
import { backendAddr } from '../utils/config';


export function fetchAllFruit({ page = 1, values }) {
    const { name } = values ? values : {}
    let skipCount = 0
    if (page > 1) {
        skipCount = (page - 1) * PAGE_SIZE
    }
    if (name) {
        return request(backendAddr.sample + `/fruits?name=${name}&maxResultCount=${PAGE_SIZE}&skipCount=${skipCount}`, { method: 'GET' })
    } else {
        return request(backendAddr.sample + `/fruits?maxResultCount=${PAGE_SIZE}&skipCount=${skipCount}`, { method: 'GET' })
    }
}


export function createFruit(values) {
    values.id = parseInt(values.id)
    values.price = parseInt(values.price)
    return request(backendAddr.sample + '/fruits', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
}

export function updateFruit(values) {
    values.price = parseInt(values.price)
    return request(backendAddr.sample + `/fruits/${values.id.toString()}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
}

export function deleteFruit(id) {
    return request(backendAddr.sample + `/fruits/${id.toString()}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export function getFruit(id) {
    return request(backendAddr.sample + `/fruits/${id.toString()}?full=${true}`, {
        method: 'GET',
    });
}