import React, { Component } from "react";
import ParticlesBg from "particles-bg";
import Navigation from "./components/navigation/navigation";
import Logo from "./components/logo/logo";
import Register from "./components/Register/Register";
import ImageLinkform from "./components/ImageLinkform/ImageLinkform";
import Signin from "./components/Signin/Signin"
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/rank/rank";
import "./App.css";
const PAT = '096813c7f4874a5d919d91c3acd560e6';
const USER_ID = 'clarifai';       
const APP_ID = 'main';
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';

const raw = JSON.stringify({
  user_app_id: {
    user_id: USER_ID,
    app_id: APP_ID,
  },
  inputs: [
    {
      data: {
        image: {
          url: IMAGE_URL,
        },
      },
    },
  ],
});

const requestOptions = {
  method: "POST",
  headers: {
    Accept: "application/json",
    Authorization: "Key " + PAT,
  },
  body: raw,
};

class App extends Component {
  constructor() {
    super();
      this.state = {
      input: "",
      imageUrl: "",
      box:{},
      route : 'Signin',
      isSignin : false,
      };
      }
  calculateFaceLocation = (data) => {
    console.log(data)
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  faceBox =(box)=>{
    console.log(box);
    this.setState({box});
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonChange =  () => {
    this.setState({ imageUrl: this.state.input });

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
    .then(response => response.json())
    .then(response => this.faceBox(this.calculateFaceLocation(response)))
    .catch(error => console.log('error', error))

  
  };

  onRouteChange = (route) => {
    if(route ==='home' ){
      this.setState({isSignin :'true'})
    }else if (route === 'Signout'){
      this.setState({isSignin :'false'})
    }
    this.setState({route});
  } 

  render() {
    return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} />
        <Navigation isSignin={this.state.isSignin}onRouteChange={this.onRouteChange}/>
        {this.state.route === 'home'
        ? <div>
        <Logo />
        <Rank />
        <ImageLinkform
          onInputChange={this.onInputChange}
          onButtonChange={this.onButtonChange}
        />
        <FaceRecognition box ={this.state.box}imageUrl={this.state.imageUrl} />
        </div>      
        : (  this. state.route ==='Signin'
          ? <Signin onRouteChange={this.onRouteChange}/>
          : <Register onRouteChange={this.onRouteChange}/>
        )
       
        }
      </div>
        
    );
  }
}

export default App;