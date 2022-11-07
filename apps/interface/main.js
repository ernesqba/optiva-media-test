const prompt = require('prompt-sync')({ sigint: true })
const axios = require('axios')

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

const main = async () => {
  console.clear()

  const wait = 40
  const waitLineLenght = 20
  for (let i = 0; i < wait; i++) {
    console.log('Starting other services...\n')
    for (let j = 0; j < waitLineLenght; j++) process.stdout.write(i / wait >= j / waitLineLenght ? '*' : '-')
    await sleep(200)
    console.clear()
  }
  console.clear()

  while (true) {
    console.log(
      'Wellcome to Metadata Management CLI:\n' +
        'Press 0 to see valid options\nPress a number between 1 and 4 to execute one of the options\n',
    )
    const option = prompt()

    let answer = null
    let param = null

    switch (option) {
      case '0':
        console.log(
          '\nPress 1 to get all the cards of a set\n' +
            'Press 2 to get a card by its id (you need to know the id assigned to the card when this one was save in the database)\n' +
            'Press 3 to get a card by its name (the name needs to be the same as the name on the card)\n' +
            'Press 4 to get all the legal cards in X game mode\n',
        )
        break

      case '1':
        console.clear()
        console.log('Insert a valid set name')
        param = prompt()
        answer = await axios.get(`http://server:3000/api/v1/card/set/${param}`).then((data) => data.data)
        if (answer.length) console.log(answer)
        else console.log('No valid cards')
        break

      case '2':
        console.clear()
        console.log('Insert a valid id')
        param = prompt()
        answer = await axios.get(`http://server:3000/api/v1/card/${param}`).then((data) => data.data)
        if (answer) console.log(answer)
        else console.log('No valid cards')
        break

      case '3':
        console.clear()
        console.log('Insert a valid name')
        param = prompt()
        answer = await axios.get(`http://server:3000/api/v1/card/name/${param}`).then((data) => data.data)
        if (answer) console.log(answer)
        else console.log('No valid card')
        break

      case '4':
        console.clear()
        console.log('Insert a valid game mode')
        param = prompt()
        answer = await axios.get(`http://server:3000/api/v1/card/legality/${param}`).then((data) => data.data)
        if (answer.length) console.log(answer)
        else console.log('No valid cards')
        break

      default:
        console.log('\nInvalid Option')
        break
    }

    prompt('Press enter to continue')
    console.clear()
  }
}

if (require.main === module)
  main().catch((error) => {
    console.log('ERROR!!! ' + error.message)
  })
