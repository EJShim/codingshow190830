import vtkGenericRenderWindow from 'vtk.js/Sources/Rendering/Misc/GenericRenderWindow';
import vtkActor           from 'vtk.js/Sources/Rendering/Core/Actor';
import vtkConeSource      from 'vtk.js/Sources/Filters/Sources/ConeSource';
import vtkMapper          from 'vtk.js/Sources/Rendering/Core/Mapper';

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
        let renderWindow = this.genericWindow.getRenderWindow();
    
        const coneSource = vtkConeSource.newInstance({ height: 1.0 });
        const mapper = vtkMapper.newInstance();
        mapper.setInputConnection(coneSource.getOutputPort());
    
        const actor = vtkActor.newInstance();
        actor.setMapper(mapper);
    
        renderer.addActor(actor);
        renderer.resetCamera();
        renderWindow.render();
    }

    handleResize(){
        this.genericWindow.resize();
    }
};

export default K_Manager