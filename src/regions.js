
const regions = [ 'eu', 'asia-se', 'brazil', 'us-west' ].reduce(function (acc, region) {
  acc[region] = region.concat('.thethings.network');
  return acc;
}, {});

const ttnSuffix = /\.thethings\.network$/;

const validate = function (region) {
  let reg = region;

  // get the region from regions if it exists
  if (region in regions) {
    reg = regions[region];
  }

  // validate the things network regions
  if (ttnSuffix.test(reg) && !(reg.replace(ttnSuffix, '') in regions)) {
    throw new Error('Invalid The Things Network region \'' + region + '\'');
  }

  return reg
};

module.exports = {
  validate: validate,
  regions: regions,
};

