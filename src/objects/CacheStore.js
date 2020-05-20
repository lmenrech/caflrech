import Util from "./Util";

var objects = [];
var onChangeListeners = [];

export class CacheStore {

    static addOnChangeListener(callback) {
        onChangeListeners.push(callback);
    }

    static onChange() {
        for (var i = 0; i < onChangeListeners.length; i++) {
            onChangeListeners[i]();
        }
    }

    static addObject(key, value, minutes) {
        var cacheObject = {
            key: key,
            value: value,
            expire: Util.getCurrentDate(minutes)
        };
        if (this.objectExists(key)) {
            this.removeObject(key);
        }
        objects.push(cacheObject);
        this.onChange();
    }

    static removeObject(key) {
        if (this.objectExists(key)) {
            for (var i = 0; i < objects.length; i++) {
                if (objects[i].key === key) {
                    objects.splice(i, 1);
                    break;
                }
            }
        }
    }

    static objectExists(key) {
        for (var i = 0; i < objects.length; i++) {
            if (objects[i].key === key) {
                return true;
            }
        }
        return false;
    }

    static getObject(key) {
        if (this.objectExists(key)) {
            for (var i = 0; i < objects.length; i++) {
                if (objects[i].key === key) {
                    return objects[i].value;
                }
            }
        }
        return null;
    }

    static isExpired(key) {
        if (this.objectExists(key)) {
            for (var i = 0; i < objects.length; i++) {
                if (objects[i].key === key) {
                    if (objects[i].expire !== null && objects[i].expire <= Util.getCurrentDate()) {
                        return true;
                    } else {
                        // console.log(":: Cache Hit (" + key + ") ::");
                        // console.log("Expire: " + objects[i].expire);
                        // console.log("Now: " + Util.getCurrentDate());
                        return false;
                    }
                }
            }
        }
        return true;
    }

}
