const currentCoin = document.querySelector('#coin')
const currentCoinName = document.querySelector('.current-coin-name')
const currentCoinPrice = document.querySelector('.current-coin-price')
const currentCoinImage = document.querySelector('.current-coin-image')
const currentCoinCode = document.querySelector('.current-coin-code')
const quantityReal = document.querySelector('#real')
const priceReal = document.querySelector('#selected-coin')

const images = [
    './images/usa.png',
    './images/usa.png',
    './images/canada.png',
    './images/euro.png',
    './images/uk.png',
    './images/argentina.png',
    './images/bitcoin.png',
    './images/litecoin.png',
    './images/japan.png',
    './images/swiss.png',
    './images/australia.png',
    './images/china.png',
    './images/israel.png',
    './images/ethereum.png',
    './images/ripple.png'
]

const api = 'https://economia.awesomeapi.com.br/json/all'
fetch(api)
.then( (response) => {
    return response.json()
})
.then( (data) => {
    const coins = Object.values(data)
    let coin = coins[currentCoin.value]

    updateInfo()
    quantityReal.onchange = setTwoNumberDecimal
    priceReal.onchange = setTwoNumberDecimal
    currentCoin.onchange = updateInfo

    quantityReal.addEventListener('change', () => {
        priceReal.value = parseFloat(quantityReal.value / coin.bid).toFixed(2)
    })

    priceReal.addEventListener('change', () => {
        quantityReal.value = parseFloat(priceReal.value * coin.bid).toFixed(2)
    })

    function updateInfo() {
        coin = coins[currentCoin.value]
        currentCoinName.innerText = `1 ${coin.name} igual a`
        currentCoinPrice.innerText = `${Number(coin.bid).toLocaleString('pt-br', {minimumFractionDigits: 2, maximumFractionDigits: 2})} Real Brasileiro`
        currentCoinCode.innerText = `${coin.code}`
        currentCoinImage.src=`${images[currentCoin.value]}`
        currentCoinImage.alt=`${coin.name}`
        priceReal.value = parseFloat(1).toFixed(2)
        quantityReal.value = parseFloat(Number(coin.bid)).toFixed(2)
    }

    function setTwoNumberDecimal(event) {
        this.value = parseFloat(this.value).toFixed(2);
    }
})