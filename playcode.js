// const products = {
//   title: 'Todos os produtos',
//   items: [
//     purpleHazeInitialObj
//   ]
// }

// STATUS GERAL DO PEDIDO
// status 0 = aguardando meta
// status 1 = meta batida, buscando no fornecedor
// status 2 = aguardando pagamento de todos
// status 3 = a combinar entrega
// status 4 = entregue

// STATUS-ORDER (DE CADA CLIENTE)
// statusOrder 0 = pedido realizado
// statusOrder 1 = pedido confirmado - pagamento pendente
// statusOrder 2 = pagamento realizado
// statusOrder 3 = entrega pendente
// statusOrder 4 = entregue

const purpleHazeInitialObj = {
    id: 'mf-1',
    header: "Mensalidades e anualidade temporariamente com desconto",
    title: "Purple Haze Outdoor",
    status: 1,
    goal: {
        required: 0.5,
        current: 0.07,
    },
    prices: [
        {
          minimum: 0.02,
          price: 50.00
        },
        {
          minimum: 0.05,
          price: 45.00
        },
        {
          minimum: 0.1,
          price: 40.00
        },
      ],
    participants: [
      {
        userId: '',
        name: 'Joel',
        statusOrder: 0,
        amount: 0.02,
        totalPrice: 100.00
      },
      {
        userId: '',
        name: 'Thiago',
        statusOrder: 0,
        amount: 0.05,
        totalPrice: 225.00
      }
    ]
  }
  
  const {header, title, priceObj, participants} = purpleHazeInitialObj;  // consulta no banco
  
  let priceStr = ``;
  for ( const i in purpleHazeInitialObj.priceObj){
    const {price, minimum} = purpleHazeInitialObj.priceObj[i];
    const newLine = `${price} --> ${minimum}`
    priceStr = `${priceStr}\n${newLine}`
  }
  
  let participantsList = ``;
  for ( const i in purpleHazeInitialObj.participants){
    const {name, amount, statusOrder} = purpleHazeInitialObj.participants[i];

    let statusOrderStr = ``;
    switch (statusOrder){
        case 0:
            statusOrderStr = `pedido realizado`;
            break;
        case 1:
            statusOrderStr = `pedido confirmado - pagamento pendente`;
            break;
        case 2:
            statusOrderStr = `pagamento realizado`;
            break;
        case 3:
            statusOrderStr = `entrega pendente`;
            break;
        case 4:
            statusOrderStr = `entregue`;
            break;
    }

    const newLine = `${name} -> ${amount} | status: ${statusOrderStr}`
    participantsList = `${participantsList}\n${newLine}`
  }

  let statusStr = ``;
  switch(purpleHazeInitialObj.status) {
    case 0:
        statusStr = `Aguardando meta`
        break
    case 1:
        statusStr = `Buscando pedido no fornecedor`
        break
    case 2:
        statusStr = `Aguardando pagamento`
        break
    case 3:
        statusStr = `Entrega`
        break
  }

  let metaStr;
  const {current, required} = purpleHazeInitialObj.goal;
  if(current >= required) metaStr = `Meta batida`;
  else {
    metaStr = `${current}/${required}`;
  }
  
  const message = `
    *${header}*
    *${title}*

    ----------
    *Meta:*
    ${metaStr}
    
    ----------
    *Valor (por grama):*
    ${priceStr}
  
    ----------
  
    *Participantes do rateio:*
    ${participantsList}
    ----------

    *Status do item:*
    ${statusStr}
  `
  
  console.log(message);