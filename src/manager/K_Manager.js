import vtkGenericRenderWindow from 'vtk.js/Sources/Rendering/Misc/GenericRenderWindow';
import vtkActor           from 'vtk.js/Sources/Rendering/Core/Actor';
import vtkMapper          from 'vtk.js/Sources/Rendering/Core/Mapper';
import vtkSTLReader from 'vtk.js/Sources/IO/Geometry/STLReader';


class K_Manager{
    static instance;
    static state;

    constructor(){
        if(K_Manager.instance) return K_Manager.instance;
        K_Manager.instance = this;

        this.genericWindow = vtkGenericRenderWindow.newInstance(); 
    }

    static Mgr(){
        return new K_Manager();
    }


    setContainer(container){
        this.genericWindow.setContainer(container)
    
        let renderer = this.genericWindow.getRenderer();
        renderer.setBackground(0.0, 0.0, 0.0);
    
      


        this.handleResize();
    }

    handleResize(){
        this.genericWindow.resize();
    }

    importMesh(file){

        let renderer = this.genericWindow.getRenderer();
        renderer.removeAllViewProps();
        let renderWindow = this.genericWindow.getRenderWindow();


        const fileReader = new FileReader();
        const stlReader = vtkSTLReader.newInstance();
        fileReader.onload = e=>{
            stlReader.parseAsArrayBuffer(fileReader.result);
            stlReader.update();
            const polydata = stlReader.getOutputData();

            const mapper = vtkMapper.newInstance({scalarVisibility:false});
            mapper.setInputData(polydata);
        
            const actor = vtkActor.newInstance();
            actor.setMapper(mapper);
        
            renderer.addActor(actor);
            renderer.resetCamera();
            renderWindow.render();
        }
        fileReader.readAsArrayBuffer(file);
    }

    ImportVolume(files){
        console.log(files)
    }
};

export default K_Manager