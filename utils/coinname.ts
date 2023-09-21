export const formatCoinName = (name: string) => {
  if (name.includes('tusdcerc20')) {
    name = name.replace('tusedcerc20', 'TUSD Coin ERC20')
  }
  if (name.includes('usdcerc20')) {
    name = name.replace('usdcerc20', 'USD Coin ERC20')
  }
  if (name.includes('usdt')) {
    name = name.replace('usdt', 'USDT')
  }
  if (!name.includes('USDT ')) {
    name = name.replace('USDT', 'USDT ')
  }
  if (name.includes('erc')) {
    name = name.replace('erc', 'ERC')
  }
  if (name.includes('trc')) {
    name = name.replace('trc', 'TRC')
  }
  if (name.includes('usd')) {
    name = name.replace('usd', 'USD')
  }
  if (name.indexOf('USD') > 0 && !name.includes(' USD') && !name.toUpperCase().includes('TUSD')) {
    name = name.replace('USD', ' USD')
  }
  if (name.includes('Binance USD')) {
    name = name.replace('Binance USD', 'BUSD BEP20')
  }
  if (name.includes('USDT')) {
    name = name.replace('USDT', 'Tether')
  }
  name = name[0].toUpperCase() + name.slice(1)
  return name
}
