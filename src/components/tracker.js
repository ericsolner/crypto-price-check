import React, { Component } from "react";
import axios from "axios";

export default class BitcoinOpenClose extends Component {
  constructor(props) {
    super(props);

    this.state = {
        dogePrice: 0,
        bitcoinPrice: 0,
        dogeName: "",
        bitcoinName: "",
        dogeholdings: "0",
        bitholdings: "0",
        currentTime: "Calculating......",
        dogeholdingsAmount: 519.97,
        bitholdingsAmount: .00013881
      };
  }

  componentDidMount() {
    this.interval = setInterval(() => 
    axios
      .get(
        "https://api.nomics.com/v1/prices?key=8b2f0a15c9f5c1fa8bf201e289f60d08"
      )
      .then(response => {
        console.log(response);
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].currency === "DOGE") {
            let updatedDogecoinPrice = response.data[i].price;
            let newCoinName = response.data[i].currency;
            let dogeHoldings = updatedDogecoinPrice * this.state.dogeholdingsAmount;
            this.setState({ dogeName: newCoinName });
            this.setState({ dogePrice: updatedDogecoinPrice });
            this.setState({dogeholdings: dogeHoldings});
          }

          if (response.data[i].currency === "BTC") {
            let updatedBitcoinPrice = response.data[i].price;
            let bitName = response.data[i].currency;
            let bitHoldings = updatedBitcoinPrice * this.state.bitholdingsAmount;
            this.setState({ bitcoinPrice: updatedBitcoinPrice });
            this.setState({ bitcoinName: bitName });
            this.setState({bitholdings: bitHoldings});
          }
          
        }
        
        let liveTime = Date().toLocaleString();
        this.setState({currentTime: liveTime})
        
      })
      , 5000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
        <div className="container">
            <h1 className="timer">{this.state.currentTime}</h1>
                <div className="flex">
                    <div className="doge card">
                        {/* <h1>Dogecoin</h1> */}
                        <img className="dogeimage" src="https://cnet3.cbsistatic.com/img/JdgcCFyRIZTnn8VtrEGYt0Ccn2k=/940x0/2013/12/27/292438ab-8533-11e3-bc97-14feb5ca9861/dogecoin.jpg" alt="dogecoin"/>
                        <h3>The Current Price Of {this.state.dogeName} Is:</h3>
                        <h3>${this.state.dogePrice}</h3>
                        <br></br>
                        <h3>Your current holdings of {this.state.dogeName} are:</h3>
                        <h3>${this.state.dogeholdings}</h3>
                    </div>
                    <div className="bit card">
                        {/* <h1>Bitcoin</h1> */}
                        <img className="bitimage" src="https://pbs.twimg.com/profile_images/421692600446619648/dWAbC2wg_400x400.jpeg" alt="bitcoin"/>
                        <h3>The Current Price Of {this.state.bitcoinName} Is:</h3>
                        <h3>${this.state.bitcoinPrice}</h3>
                        <br></br>
                        <h3>Your current holdings of {this.state.bitcoinName} are:</h3>
                        <h3>${this.state.bitholdings}</h3>
                    </div>
                </div>
      </div>
    );
  }
}