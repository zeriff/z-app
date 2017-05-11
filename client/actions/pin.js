import {LOAD_PINS, SHOW_PIN} from '../actions';
import {postPin} from '../api/pin';
import {browserHistory} from 'react-router';
import {loadPins} from './home';
import {dataURItoBlob} from './utils';

export function uploadPin(data) {
    return function(dispatch) {
        Loader.setLoading();
        var formData = new FormData()
        formData.append('boards', data.boards);
        formData.append('title', data.title);
        formData.append('story', data.story);
        formData.append('image', dataURItoBlob(data.image));
        postPin(formData).then(function(res) {
            Loader.done();
            toastr.info(res.message);
            window.location.reload();
        });
    }
}

export function LoadActiveBoard() {
    return function (dispatch) {
        
    }
}



