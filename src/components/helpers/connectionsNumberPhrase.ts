const numeralsUnits = [
  '', 'один ', 'два ', 'три ', 'четыре ', 'пять ', 'шесть ', 'семь ', 'восемь ', 'девять ',
  'десять ', 'одиннадцать ', 'двенадцать ', 'тринадцать ', 'четырнадцать ', 'пятнадцать ',
  'шестнадцать ', 'семнадцать ', 'восемнадцать ', 'девятнадцать ',
]

const numeralsTens = [
  '', 'десять ', 'двадцать ', 'тридцать ', 'сорок ', 'пятьдесят ',
  'шестьдесят ', 'семьдесят ', 'восемьдесят ', 'девяносто ',
]

const numeralsHundreds = [
  '', 'сто ', 'двести ', 'триста ', 'четыреста ', 'пятьсот ',
  'шестьсот ', 'семьсот ', 'восемьсот ', 'девятьсот ',
]

const endOfPhrase = [
  'дополнительный узел', 'дополнительных узла', 'дополнительных узлов',
]

export default (n: number) => {
  if (n === 0) {
    return 'Прямое соединение'
  }

  let phrase = ''

  const lastDigit = n % 10
  const twoLastDigit = n % 100

  if (twoLastDigit >= 10 && twoLastDigit < 20) {
    phrase = numeralsUnits[twoLastDigit] + endOfPhrase[2]
  } else {
    const tens = Math.floor(n / 10) % 10

    if (tens > 1) {
      phrase = numeralsTens[tens]
    }

    if (lastDigit === 1) {
      phrase += numeralsUnits[lastDigit] + endOfPhrase[0]
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      phrase += numeralsUnits[lastDigit] + endOfPhrase[1]
    } else {
      phrase += numeralsUnits[lastDigit] + endOfPhrase[2]
    }
  }

  const hundreds = Math.floor(n / 100) % 10

  if (hundreds > 0) {
    phrase = numeralsHundreds[hundreds] + phrase
  }

  return phrase[0].toUpperCase() + phrase.slice(1)
}
