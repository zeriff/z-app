import {UPLOAD_RIFF} from '../actions';
import {browserHistory} from 'react-router';
import {dataURItoBlob} from './utils';

import {createRiff} from '../api/RiffApi';

export function uploadRiff(data) {
    return function (dispatch) {
        Loader.setLoading();
        var formData = new FormData();
        formData.append('tags', data.tags);
        formData.append('title', data.title);
        formData.append('story', data.story);
        formData.append('image', dataURItoBlob(data.image));
        createRiff(formData).then(function (res) {
            Loader.done();
            toastr.info(res.message);
            window
                .location
                .reload();
        })

    }
}
