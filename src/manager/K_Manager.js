import vtkGenericRenderWindow from 'vtk.js/Sources/Rendering/Misc/GenericRenderWindow';
import vtkActor           from 'vtk.js/Sources/Rendering/Core/Actor';
import vtkMapper          from 'vtk.js/Sources/Rendering/Core/Mapper';
import vtkSTLReader from 'vtk.js/Sources/IO/Geometry/STLReader';
import readImageDICOMFileSeries from 'itk/readImageDICOMFileSeries';
import vtkImageData from 'vtk.js/Sources/Common/DataModel/ImageData';
import vtkDataArray from 'vtk.js/Sources/Common/Core/DataArray';
import vtkVolume from 'vtk.js/Sources/Rendering/Core/Volume';
import vtkVolumeMapper from 'vtk.js/Sources/Rendering/Core/VolumeMapper';
import vtkColorTransferFunction from 'vtk.js/Sources/Rendering/Core/ColorTransferFunction';
import vtkPiecewiseFunction from 'vtk.js/Sources/Common/DataModel/PiecewiseFunction';




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

    async importVolume(files){

        const result = await readImageDICOMFileSeries(null, files);
        result.webWorker.terminate();
        
        //Initialize Renderer
        let renderer = this.genericWindow.getRenderer();
        renderer.removeAllViewProps();
        let renderWindow = this.genericWindow.getRenderWindow();

        const itkImage = result.image;

        const vtkImage = this.convertItkToVtkImage(itkImage);

        //Initialize Volume Rendering Pipeline
        const mapper = vtkVolumeMapper.newInstance();
        mapper.setInputData(vtkImage);
        // mapper.setSampleDistance(1.0);
        
        const volume = vtkVolume.newInstance();
        volume.setMapper(mapper);

        //Initialize Property
        const ctf = vtkColorTransferFunction.newInstance();
        const otf = vtkPiecewiseFunction.newInstance();
        otf.addPoint(0, 0.0)
        otf.addPoint(100, 1.0)
        otf.addPoint(1024, 1.0)

        //Add OTF, CTF            
        volume.getProperty().setInterpolationTypeToFastLinear();
        volume.getProperty().setScalarOpacity(0, otf);
        // volume.getProperty().setRGBTransferFunction(0, ctf);
      

        renderer.addViewProp(volume);
        renderer.resetCamera();
        renderWindow.render();
    }

    
    convertItkToVtkImage(itkImage, options={}){
        // Make sure we can handle input pixel type
        // Refer to itk-js/src/PixelTypes.js for numerical values
        switch (itkImage.imageType.pixelType) {
            case 1: // Scalar
            case 2: // RGB
            case 3: // RGBA
            break;
            default:
            // vtkErrorMacro(
            //     `Cannot handle ITK.js pixel type ${itkImage.imageType.pixelType}`
            // );
            return null;
        }

        const vtkImage = {
            origin: [0, 0, 0],
            spacing: [1, 1, 1],
        };

        const dimensions = [1, 1, 1];
        const direction = [0, 0, 1, 0, 1, 0, 1, 0, 0];

        for (let idx = 0; idx < itkImage.imageType.dimension; ++idx) {
            vtkImage.origin[idx] = itkImage.origin[idx];
            vtkImage.spacing[idx] = itkImage.spacing[idx];
            dimensions[idx] = itkImage.size[idx];
            for (let col = 0; col < itkImage.imageType.dimension; ++col) {
                // ITK (and VTKMath) use a row-major index axis, but the direction
                // matrix on the vtkImageData is a webGL matrix, which uses a
                // column-major data layout. Transpose the direction matrix from
                // itkImage when instantiating that vtkImageData direction matrix.
                direction[col + idx * 3] =
                itkImage.direction.data[idx + col * itkImage.imageType.dimension];
            }
        }

        // Create VTK Image Data
        const imageData = vtkImageData.newInstance(vtkImage);

        // create VTK image data
        const scalars = vtkDataArray.newInstance({
            name: options.scalarArrayName || 'Scalars',
            values: itkImage.data,
            numberOfComponents: itkImage.imageType.components,
        });

        imageData.setDirection(direction);
        imageData.setDimensions(...dimensions);
        imageData.getPointData().setScalars(scalars);

        return imageData;
    }
};

export default K_Manager