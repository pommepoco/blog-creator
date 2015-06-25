var tools = {
  alert: function(msg, type) {
    if($.isString(msg))
      alert(msg);
    else
      alert("une erreur c'est produite");
  }
};