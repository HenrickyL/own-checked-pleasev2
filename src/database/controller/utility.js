export function getStatusBill(bills){
    let actives,deactives,paids
    actives = bills.filter(b=>b.status==='Ativo').length
    deactives = bills.filter(b=>b.status==='Fechado').length
    paids = bills.filter(b=>b.status==='Pago').length

    return {actives,deactives,paids}
}

export default getStatusBill