export type CoinDetail = {
    uuid:string,
    symbol:string,
    name:string,
    color:string,
    iconUrl:string,
    marketCap:any,
    price:string,
    listedAt:number,
    tier:number,
    change:any,
    rank:number,
    sparkLine:string[],
    lowVolume:boolean,
    coinrankingUrl:string,
    '24hVolume':string,
    btcPrice:string
}

export type CoinGraph={
    coinHistory:any,
    currentPrice:string,
    coinName:string
}