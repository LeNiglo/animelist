Date.prototype.YYYYMMDD = function() {

	var yyyy = this.getFullYear().toString();
	var mm = (this.getMonth()+1).toString();
	var dd  = this.getDate().toString();

	return (yyyy + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + (dd[1] ? dd : "0" + dd[0]));
};

Object.defineProperty(Date.prototype, 'YYYYMMDDHHMMSS', {
  value: function() {
    function pad2(n) {
      return (n < 10 ? '0' : '') + n;
    }

    return this.getFullYear() +
    pad2(this.getMonth() + 1) + 
    pad2(this.getDate()) +
    pad2(this.getHours()) +
    pad2(this.getMinutes()) +
    pad2(this.getSeconds());
  }
});