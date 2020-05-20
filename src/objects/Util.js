export class Util {

    // eslint-disable-next-line no-unused-vars
    static getCurrentDate(minutes) {
        var now = new Date();
        if (minutes) {
            now.setMinutes(now.getMinutes() + minutes);
        }
        return now;
    }

    static getRandom(max) {
        return Math.round(Math.random() * max)
    }

    static asMoney(obj) {
        obj = parseFloat(obj);
        return obj.toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    static asIntegerMoney(obj) {
        return obj.toFixed(2).replace(".", "");
    }

    static asRegularCurrency(obj) {
        obj = obj.toString();
        obj = obj.replace(/^0+/, '');
        if (isNaN(obj) || obj.length === 0) {
            return 0.00;
        }
        obj = obj.substr(0, obj.length - 2) + "." + obj.substr(obj.length - 2);
        return parseFloat(obj);
    }

    static replaceVariable(text, variable, replacement) {
        if (text && variable && replacement) {
            if (text.includes(variable)) {
                text = Util.replaceAll(text, variable, replacement);
            }
        }
        return text;
    }

    static asTagCurrency(obj) {
        obj = obj.toString();
        obj = obj.replace(/^0+/, '');
        if (isNaN(obj) || obj.length === 0) {
            return "000";
        }
        if (obj.includes(".")) {
            obj = obj.replace(".", "");
        } else {
            obj = obj + "00";
        }
        return parseInt(obj);
    }

    static asHexString(obj, length) {
        return parseInt(obj).toString(16).padStart(length, '0').toUpperCase();
    }

    static asDecimalString(obj, length) {
        return parseInt(obj, 16).toString().padStart(length, '0').toUpperCase();
    }

    static asAsciString(obj) {
        var hex  = obj;

        var str = '';
        for (var n = 0; n < hex.length; n += 2) {
            str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
        }

        return str.replace(/#/g,"");
    }

    static asHexStringASCI2(obj){
        var str = obj.padStart(10, '#');
        var arr1 = [];
        for (var n = 0, l = str.length; n < l; n ++) {
            var hex = Number(str.charCodeAt(n)).toString(16);
            arr1.push(hex);
        }
        return arr1.join('').toUpperCase();
    }

    static asDate(obj) {
        obj = obj.toString();
        return obj.substr(0, 2) + "/" + obj.substr(2, 2) + "/" + obj.substr(4);
    }

    static calcCrc(str) {

        let calc = [];
        for (let i = 0; i < str.length; i++) {
            calc.push(str.charCodeAt(i));
        }

        let val = 0;
        for (let i = 0; i < calc.length; i++) {
            val = calc[i] ^ val;
        }

        return val;
    }

    static asCPFDocument(obj, length, format = true) {
        obj = obj.toString();
        obj = obj.substr(obj.length - length);
        if (format) {
            return obj.substr(0, 3) + "." + obj.substr(3, 3) + "." + obj.substr(6, 3) + "-" + obj.substr(9);
        } else {
            return obj;
        }
    }

    static asCNPJDocument(obj, length, format = true) {
        obj = obj.toString();
        obj = obj.substr(obj.length - length);
        if (format) {
            return obj.substr(0, 2) + "." + obj.substr(2, 3) + "." + obj.substr(5, 3) + "/" + obj.substr(8, 4) + "-" + obj.substr(12);
        } else {
            return obj;
        }
    }

    static getValueWithInterest(interest, value, installments) {
        installments = installments - 1;
        let additional = installments * interest;
        additional = value * additional;
        additional = additional / 100;
        return Math.round(Number(value) + Number(additional));
    }

    static replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }

}

export default Util;
