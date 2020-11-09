import React, { Component } from 'react';
import flashParkingLogo from './img/flash_parking_logo-1.png'
import './App.css'
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
          carsInLot: 0,
          totalParkingSpots: 0,
          spotsAvailable: 0,
          parkingLotID: '',
          REACT_APP_URL: process.env.REACT_APP_PROD_URL
        }
        this.getParkingLot = this.getParkingLot.bind(this);
        this.arrival = this.arrival.bind(this);
        this.departure = this.departure.bind(this);
    }

    componentDidMount() {
        let lot = 'C3' // set the lot ID here 
        this.getParkingLot(lot)
        
          
    }

    getParkingLot = async (lot) => {
        //call api
        let URL = this.state.REACT_APP_URL
        
        
        const response = await fetch(URL+'getParkingLot?lot='+lot,{
            method: 'GET',
        });
        const myJson = await response.json(); //extract JSON from the http response
        // do something with myJson
        console.log("testAPI response: ", myJson);
        this.setState({
            parkingLotID: myJson['ID'],
            carsInLot: myJson['carsInLot'],
            spotsAvailable: myJson['spotsAvailable'],
            totalParkingSpots: myJson['totalParkingSpots']
        })
    }

    arrival = async () => {
		//POST body
        let parkingLot = {
            parkingLotID: this.state.parkingLotID,
            carsInLot: this.state.carsInLot,
            spotsAvailable: this.state.spotsAvailable,
            totalParkingSpots: this.state.totalParkingSpots
		}
		//headers
        const options = {
            method: 'POST',
            body: JSON.stringify(parkingLot),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        //call api
        const response = await fetch(this.state.REACT_APP_URL+'arrival', options);
        const myJson = await response.json(); //extract JSON from the http response
        // do something with myJson
        console.log("arrival response: ", myJson);
        this.setState({
            carsInLot: myJson['carsInLot'],
            spotsAvailable: myJson['spotsAvailable'],
            totalParkingSpots: myJson['totalParkingSpots']
        })
    }

    departure = async () => {
		//POST body
        let parkingLot = {
            parkingLotID: this.state.parkingLotID,
            carsInLot: this.state.carsInLot,
            spotsAvailable: this.state.spotsAvailable,
            totalParkingSpots: this.state.totalParkingSpots
		}
		//headers
        const options = {
            method: 'POST',
            body: JSON.stringify(parkingLot),
            headers: {
                'Content-Type': 'application/json'
            }
		}
		//call api
        const response = await fetch(this.state.REACT_APP_URL+'departure', options);
        const myJson = await response.json(); //extract JSON from the http response
        // do something with myJson
        console.log("departure response: ", myJson);
        this.setState({
            carsInLot: myJson['carsInLot'],
            spotsAvailable: myJson['spotsAvailable'],
            totalParkingSpots: myJson['totalParkingSpots']
        })
    }


    render(props) {
        return (
            <div>
            
            <div className="main">
            <img src={flashParkingLogo} alt="this is the flash parking logo" />
                    <div className="container">
                        <div className="welcome-font">
                            {process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_MODE : process.env.REACT_APP_PRO_MODE}
                        </div>
                            
                        <div className="vertical-center">
							{this.state.spotsAvailable <= 0 ? <div className="row ">
								<h2 className="warning-font font-weight-bold " id="edit-welcome-text">PARKING LOT IS FULL!</h2>
							</div> 
							: 
							null
							
							}
							
                            <div className="row ">
                                <p className="welcome-font font-weight-bold " id="edit-welcome-text">WELCOME TO PARKING LOT: {this.state.parkingLotID}</p>
                            </div>
                            <div className="row mt-3">
                                <p className="welcome-font " id="parking-spots-avilable-text" >Number of spots available: {this.state.spotsAvailable} / {this.state.totalParkingSpots}</p>
                            </div>
                            <div className="row">
								{this.state.spotsAvailable > 0 ?
                                <button type="button" className="btn btn-lg mr-4" onClick={() =>this.arrival()}>ARRIVAL</button>
								:
								<button type="button" className="btn btn-lg mr-4" disabled onClick={() =>this.arrival()}>ARRIVAL</button>}

                                {this.state.spotsAvailable < this.state.totalParkingSpots ?
								<button className="btn btn-lg" onClick={() =>this.departure()}>DEPARTURE</button>
								:
								<button className="btn btn-lg" disabled onClick={() =>this.departure()}>DEPARTURE</button>
								}
                            </div>
                        </div>
                    
                        
                    
                    
                    
                    
                </div>
                
            </div>
            </div>
        )
    }

} export default App
