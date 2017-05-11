import {likeRiff, unlikeRiff, status} from '../api/LikeApi';
import Promise from 'promise';

export function createLike(riff_id) {
    return likeRiff(riff_id)
}

export function deleteLike(riff_id) {
    return unlikeRiff(riff_id);
}

export function like_status(riff_id) {
    return status(riff_id)
}