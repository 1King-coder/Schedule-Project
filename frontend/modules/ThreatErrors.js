export default class ErrorThreatment {

    static throwErrors (errorObjArray) {
        for (let error of errorObjArray) {
            ErrorThreatment.createError(error.input, error.msg);
        };

        return [];
    };

    static createError (el, message) {
        const div = document.createElement('div');
        div.setAttribute('class', 'text-danger error');
        div.innerHTML = message;
        el.insertAdjacentElement('afterend', div);
    };

};