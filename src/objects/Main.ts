import {CacheStore} from '../objects/CacheStore';

export class Main {

  onError(exception) {
    this.getCache().addObject('loading', false);
    console.log(exception);
  }

  setLoading(bol) {
    this.getCache().addObject('loading', bol);
  }

  getCache() {
    return CacheStore;
  }

}
