export function getLogoSourcePath(bankId) {
    switch (bankId) {
      case 'rbs': return require('resources/img/rbs-logo.png');
      case 'hsbc-test': return require('resources/img/hsbc-logo.png');
      case 'testowy_bank_id': return require('resources/img/db-logo.png');
      case 'gh.29.us': return require('resources/img/db-logo.png');
      case 'chase': return require('resources/img/hsbc-logo.png');
      default: return require('resources/img/rbs-logo.png');
    }
}

export function getRealBankName(bankId) {
  switch (bankId) {
    case 'rbs': return 'RBS';
    case 'hsbc-test': return 'HSBC';
    case 'testowy_bank_id': return 'Deutsche Bank';
    case 'gh.29.us': return 'Deutsche Bank';
    case 'chase': return 'HSBC';
    default: return 'RBS';
  }
}