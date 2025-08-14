
//conversor de string a solo consonantes
const strConv = (str) => {
    return ( 
        str.replace(/[aeiouáéíóú\s\d\W_]/gi, '')
    )
}


//Creador del id 
const generateId = (data) => {
    const date =  (data.fecha).replace(/-/gi, '');
    const orig = strConv(data.origen)
    const dest = strConv(data.destino)
    const veh =  (data.vehiculo).includes('-')?(data.vehiculo).replace(/-/gi, ''):(data.vehiculo);
    const newId =  `${date}-${orig}-${dest}-${veh}`;
    return (
        newId.toUpperCase()
    )
}

module.exports = { generateId }