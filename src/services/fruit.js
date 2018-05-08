
import request from '../utils/request';
import { PAGE_SIZE } from '../constants';
import { backendAddr } from '../utils/config';


export function fetchAllFruit({ page = 1 }) {
    let skipCount = 0
    if (page > 1) {
        skipCount = (page - 1) * PAGE_SIZE
    }
    return request(backendAddr.sample + `/fruits?maxResultCount=${PAGE_SIZE}&skipCount=${skipCount}`, { method: 'GET' })
}


export function createFruit(values) {
    values.id = parseInt(values.id)
    return request(backendAddr.sample + '/fruits', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
}

export function updateFruit(values) {
    return request(backendAddr.sample + `/fruits/${values.id.toString()}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
}

export function deleteFruit(values) {
    return request(backendAddr.sample + `/fruits/${values.id.toString()}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export function fetchFruitByFruitId(values) {
    return request(backendAddr.sample + `/fruits/${values}/fruits`, {
        method: 'GET',
    });
}