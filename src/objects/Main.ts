import {CacheStore} from '../objects/CacheStore';

export class Main {

  private loadingTimeout;

  onError(exception) {
    this.getCache().addObject('loading', false);
    if (exception.error.message) {
      alert(exception.error.message);
    }
    console.log(exception);
  }

  setLoading(bol) {
    this.getCache().addObject('loading', bol);
    if (bol) {
      this.loadingTimeout = setTimeout(function() {
        this.setLoading(false);
        console.log('Loading timed out.');
      }.bind(this), 5000);
    } else {
      if (this.loadingTimeout !== null) {
        clearTimeout(this.loadingTimeout);
      }
    }
  }

  getCache() {
    return CacheStore;
  }

}
