exports.serviceToFunction = serviceName => {
  return serviceName[0].toLowerCase() + serviceName.substr(1)
};

exports.expandRegion = options => {
  
  if (!options.baseUrl && options.region) {
    options.baseUrl = 'https://' + options.region + '.thethings.network:8084';
  }
  
  delete options.region;
}

exports.expandAuth = options => {

  if (options.key) {
    if (!options.headers) {
      options.headers = {};
    }
    if (!options.headers.Authorization) {
      options.headers.Authorization = 'Key ' + options.key;
    }
  }

  delete options.key;

  if (options.token) {
    if (!options.auth) {
      options.auth = {
        bearer: options.token
      };
    }
  }

  delete options.token;
};

exports.expandUri = (options) => {
  options.uri = options.uri.replace(/\{([^\}]+)\}/g, (match, option) => {
    let replaced = options[option];
    delete options[option];
    return replaced;
  });
}