export function getLogoSourcePath(bankId) {
    switch (bankId) {
      case 'rbs': return require('resources/img/rbs-logo.png');
      case 'hsbc-test': return require('resources/img/hsbc-logo.png');
      case 'testowy_bank_id': return require('resources/img/db-logo.png');
      default: return require('resources/img/rbs-logo.png');
    }
}