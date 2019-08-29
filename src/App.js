import React, {Component} from 'react';
import './App.css';

class App extends Component {

  constructor(props){
    super(props)


    this.mouseDown = false;
    this.state={
      dividerLeft:50,
      dividerTop:50,
    }
  }


  onImportMesh(e){
    alert("Import Mesh")
  }

  onImportVolume(e){
    alert("Import Volume")
  }

  onMouseDown(e){
    e.preventDefault();
    this.mouseDown = true;
  }

  onMouseMove(e){
    e.preventDefault();
    if(this.mouseDown){
      const container = this.refs["rendererContainer"]; 
      const rect = container.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;

      let updateLeft = x * 100 / container.clientWidth;
      let updateTop = y * 100 / container.clientHeight;
      
      this.setState({
        dividerLeft:updateLeft,
        dividerTop:updateTop,
      })

    }
  }

  onMouseUp(e){
    e.preventDefault();
    this.mouseDown = false;
  }

  render(){


    const dividerHStyle={
      top:`${this.state.dividerTop}%`
    }

    const dividerVStyle={
      left:`${this.state.dividerLeft}%`
    }

    const renderer1Style={
      width:`${this.state.dividerLeft}%`,
      height:`${this.state.dividerTop}%`,

    }

    const renderer2Style={
      left:`${this.state.dividerLeft}%`,
      width:`${100 - this.state.dividerLeft}%`,
      height:`${this.state.dividerTop}%`,
    }

    const renderer3Style={
      top:`${this.state.dividerTop}%`,
      height:`${100-this.state.dividerTop}%`,
      width:`${this.state.dividerLeft}%`

    }

    const renderer4Style={
      left:`${this.state.dividerLeft}%`,
      width:`${100-this.state.dividerLeft}%`,
      top:`${this.state.dividerTop}%`,
      height:`${100-this.state.dividerTop}%`,
      
    }

    return (
      <div className="App">
        <div className="App-toolbar">
          <div className="Button" onClick={e=>{this.onImportMesh(e)}}> Import mesh </div>
          <div className="Button" onClick={e=>{this.onImportVolume(e)}}> Import Volume </div>
        </div>
  
        <div className="App-renderer"
            ref="rendererContainer"
            onMouseMove={e=>{this.onMouseMove(e)}}
            onMouseUp={e=>{this.onMouseUp(e)}}>
          <div className="App-renderer1"
              style={renderer1Style}/>
          <div className="App-renderer2"
              style={renderer2Style}/>
          <div className="App-renderer3"
              style={renderer3Style}/>
          <div className="App-renderer4"
              style={renderer4Style}/>

          <div className="Divider-horizontal"
              style={dividerHStyle}
              onMouseDown={e=>{this.onMouseDown(e)}}/>
          <div className="Divider-vertical" 
              style={dividerVStyle}
              onMouseDown={e=>{this.onMouseDown(e)}}/>
        </div>
      
      </div>
    );
  }
  
};

export default App;
