function transaction_parser(data){
    let trans = data.split('|')
    let result = {
        type: trans[0],
        transaction_no: trans[2]
    }
    return result
}

const Cimb = {
    parser: function(data){
        let cimb = {
            datetime: data['Date/Time'],
            moneyIn: data['Money In'],
            moneyOut: data['Money Out'],
            balance: data['Balance'],
            transaction: transaction_parser(data['Transaction Details'])
        }
        return cimb
    },
    parserBulk: function(data){
        let cimb = []
        data.forEach(value => {
            var parse = this.parser(value)
            // if(parse.transaction.type == 'CDM CASH DEPOSIT'){
                cimb.push(this.parser(value))
            // }
        })
        return cimb;
    }
}

export const CimbParser = Cimb