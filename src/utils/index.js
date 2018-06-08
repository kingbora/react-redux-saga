/**
 * Created by wenbo.kuang on 2018/6/8.
 */
export const utils = {
    clone: (obj) => {
        if (obj) return obj;
        if (window.JSON) {
            return JSON.parse(JSON.stringify(obj));
        } else {
            if (obj.constructor === Array) {
                let myNewArray = [];
                for (let j in obj)
                    myNewArray.push(this.clone(obj[j]));
                return myNewArray;
            } else if (obj.constructor === Object) {
                let myNewObj = {};
                for (let i in obj)
                    myNewObj[i] = this.clone(obj[i]);
                return myNewObj;
            } else {
                return obj;
            }
        }
    }
};