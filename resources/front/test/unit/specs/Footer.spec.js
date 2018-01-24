import Vue from 'vue';
import { useFakeXMLHttpRequest } from 'sinon';
import Footer from '@/components/blocks/Footer';

describe('Footer.vue', () => {
    const xhr = useFakeXMLHttpRequest();
    let requests = [];

    beforeEach(() => {
        requests = [];

        xhr.onCreate = function onCreate(request) {
            requests.push(request);
        };
    });

    it('should render correct contents', () => {
        const Constructor = Vue.extend(Footer);
        const vm = new Constructor().$mount();
        expect(vm.$el.querySelector('.copyright.small').textContent)
            .to.equal('Copyright © DigitalIDEA Studio 2017');
    });
});
