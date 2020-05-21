export class Util {

    // eslint-disable-next-line no-unused-vars
    static getCurrentDate(minutes) {
        var now = new Date();
        if (minutes) {
            now.setMinutes(now.getMinutes() + minutes);
        }
        return now;
    }

}

export default Util;
