const storage = window.sessionStorage;
const prefix = 'shmaur_';

export let set = function(key, val, fun) {
    if (typeof val !== 'string') {
        try {
            val = JSON.stringify(val);
        } catch (e) {

        }
    }
    storage.setItem(prefix + key, val);
    //typeof fun === 'function' && fun();
}
export let get = function(key, fun) {
    let val = storage.getItem(prefix + key)
    try {
        val = JSON.parse(val)
        if (val === null) val = {};
    } catch (e) {
        val = {};
    }

    return
}

export let remove = function(key) {
    storager.removeItem(prefix + key);
}