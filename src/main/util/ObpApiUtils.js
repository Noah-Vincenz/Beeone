export const joinPath = (...paths) => paths.map(it=> it.replace(/^\/|\/$/g, '')).join('/')

export const base_url = 'https://apisandbox.openbankproject.com'

export const login = async (username, password, consumerKey) => {
    try {   
        let response = await fetch(joinPath(base_url, '/my/logins/direct'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `DirectLogin username="${username}",password="${password}",consumer_key="${consumerKey}"`
            }
        });
        let json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const getBankIdsAndAccountIdsAndAccountTypesAndRoutings = async (token) => {
    try {
      let response = await fetch(joinPath(base_url, `/obp/v4.0.0/my/accounts`), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `DirectLogin token="${token}"`
        },
      })
      let json = await response.json();
      const bankIds = json.accounts.map(x => x.bank_id) // return array of account ids
      const accountIds = json.accounts.map(x => x.id) // return array of account ids
      const accountTypes = json.accounts.map(x => x.account_type) // return array of account types
      const accountRoutings = json.accounts.map(x => x.account_routings) // return array of account types
      return {bankIds, accountIds, accountTypes, accountRoutings};
    } catch(error) {
      console.error(error);
    }
}
  
/**
 * This function gets an account with given bank id and account id.
 * It adds the retrieved account to a given listOfAccounts `Array`. This function returns a Promise,
 * because where it is used we want to wait for all promises to have been collected, ie. the listOfAccounts `Array`
 * to be populated. Using promises here allows us to run multiple calls of this asynchronous function in parallel.
 * @param {string} bankId 
 * @param {string} accountId 
 * @param {Array} listOfAccounts 
 * @param {string} token 
 */
export function getAccount(bankId, accountId, accountType, accountRoutings, token) {
    return new Promise(resolve => {
      fetch(joinPath(base_url, `/obp/v4.0.0/my/banks/${bankId}/accounts/${accountId}/account`), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `DirectLogin token="${token}"`
        },
      })
      .then((response) => response.json())
      .then((json) => {
        json['account_type'] = accountType;
        json['account_routings'] = accountRoutings;
        resolve(json);
      })
      .catch((error) => {
        console.error(error);
      });
    });
}

export const getCounterParties = async (bankId, accountId, token) => {
    try {
        let response = await fetch(joinPath(base_url, `/obp/v4.0.0/banks/${bankId}/accounts/${accountId}/owner/counterparties`), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `DirectLogin token="${token}"`
            }
        });
        let json = await response.json();
        return json.counterparties;
    } catch (error) {
        console.error(error);
    }
}

export const answerChallenge = async (bankId, accountId, transactionReqId, challengeQuery) => {
    try {
        let response = await fetch(joinPath(base_url, `/obp/v4.0.0/banks/${bankId}/accounts/${accountId}/owner/transaction-request-types/sandbox/transaction-requests/${transactionReqId}/challenge`), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `DirectLogin token="${token}"`
            },
            body: JSON.stringify({
                id: challengeQuery,
                answer: 123456
            })
        });
        let json = await response.json();
        return json;
    }
    catch (error) {
        console.error(error);
    }
}
  
export const getChallengeTypes = async (bankId, accountId, token) => {
    try {
        let response = await fetch(joinPath(base_url, `/obp/v4.0.0/banks/${bankId}/accounts/${accountId}/owner/transaction-request-types`), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `DirectLogin token="${token}"`
            }
        });
        let json = await response.json();
        const challengeTypes = []
        json.transaction_request_types.forEach(function (type, index) {
            challengeTypes.push(type.value)
        });
        return challengeTypes;
    } catch (error) {
        console.error(error);
    }
}
  
export const initiateTransactionRequest = async (senderBankId, senderAccountId, recipientBankId, recipientAccountId, challengeType, token, amountIn, currencyIn) => {
    try {
        let response = await fetch(joinPath(base_url, `/obp/v4.0.0/banks/${senderBankId}/accounts/${senderAccountId}/owner/transaction-request-types/${challengeType}/transaction-requests`), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `DirectLogin token="${token}"`
            },
            body: JSON.stringify({
                to: {
                    account_id: recipientAccountId,
                    bank_id: recipientBankId
                },
                value: {
                    currency: currencyIn,
                    amount: amountIn
                },
                description: 'Internal Transfer',
                challenge_type: challengeType
            })
        });
        let json = await response.json();
        return json
    } catch(error) {
        console.error(error);
    }
}  

export const initiateCounterPartyTransactionRequest = async (senderBankId, senderAccountId, counterPartyId, challengeType, token, currencyIn, descriptionIn, amountIn) => {
    try {
        let response = await fetch(joinPath(base_url, `/obp/v4.0.0/banks/${senderBankId}/accounts/${senderAccountId}/owner/transaction-request-types/${challengeType}/transaction-requests`), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `DirectLogin token="${token}"`
            },
            body: JSON.stringify({
                to: {
                    counterparty_id: counterPartyId
                },
                value: {
                    currency: currencyIn,
                    amount: amountIn
                },
                description: descriptionIn,
                // challenge_type: challengeType,
                charge_policy: 'SHARED'
            })
        });
        let json = await response.json();
        return json
    } catch(error) {
        console.error(error);
    }
}  

export const createCounterParty = async (senderBankId, senderAccountId, counterpartyName, counterpartyDescription, counterpartyCurrency, counterpartyRoutingScheme, counterpartyRoutingAddress, bankId, token) => {
    try {
        let response = await fetch(joinPath(base_url, `/obp/v4.0.0/banks/${senderBankId}/accounts/${senderAccountId}/firehose/counterparties`), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `DirectLogin token="${token}"`
            },
            body: JSON.stringify({
                name: counterpartyName,
                description: counterpartyDescription,
                currency: counterpartyCurrency,
                other_account_routing_scheme: counterpartyRoutingScheme,
                other_account_routing_address: counterpartyRoutingAddress,
                other_account_secondary_routing_scheme: '',
                other_account_secondary_routing_address: '',
                other_bank_routing_scheme: 'OBP',
                other_bank_routing_address: bankId,
                other_branch_routing_scheme: 'OBP',
                other_branch_routing_address: '',
                is_beneficiary: true,
            })
        });
        let json = await response.json();
        return json
    } catch(error) {
        console.error(error);
    }
}

export const getBanks = async (token) => {
    try {
        let response = await fetch(joinPath(base_url, `/obp/v4.0.0/banks`), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `DirectLogin token="${token}"`
            }
        });
        let json = await response.json();
        return json.banks
    } catch(error) {
        console.error(error);
    }
}

export const getTransactions = async (bankId, accountId, token) => {
    try {
        let response = await fetch(joinPath(base_url, `/obp/v4.0.0/banks/${bankId}/accounts/${accountId}/owner/transactions`), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `DirectLogin token="${token}"`
            }
        });
        let json = await response.json();
        return json.transactions
    } catch(error) {
        console.error(error);
    }
}
