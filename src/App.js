import React, {Component} from 'react';
import './App.css';

class App extends Component {

  onImportMesh(e){
    alert("Import Mesh")
  }

  onImportVolume(e){
    alert("Import Volume")
  }

  render(){
    return (
      <div className="App">
        <div className="App-toolbar">
          <div className="Button" onClick={e=>{this.onImportMesh(e)}}> Import mesh </div>
          <div className="Button" onClick={e=>{this.onImportVolume(e)}}> Import Volume </div>
        </div>
  
        <div className="App-renderer">
          <div className="App-renderer1"/>
          <div className="App-renderer2"/>
          <div className="App-renderer3"/>
          <div className="App-renderer4"/>
        </div>
      
      </div>
    );
  }
  
};

export default App;
