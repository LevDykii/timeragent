import axios from 'axios';

const Http = axios.create({
    headers: {
        'X-CSRF-Token': window.Laravel && window.Laravel.csrfToken ? window.Laravel.csrfToken : 'FAKE_CSRF_TOKEN',
    },
});

export default Http;
