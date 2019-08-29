
#include <iostream>
#include <vtkSmartPointer.h>
#include <vtkSTLReader.h>
#include <vtkPolyData.h>
#include <vtkJSONDataSetWriter.h>



int main(int argc, char* argv[]){


    if( argc < 3 )
    {
        std::cerr << "Usage: " << argv[0] << " <inputMesh> <outputPolyData> " << std::endl;
        return EXIT_FAILURE;
    }

    vtkSmartPointer<vtkSTLReader> stlReader = vtkSmartPointer<vtkSTLReader>::New();
    stlReader->SetFileName(argv[1]);
    stlReader->Update();

    vtkSmartPointer<vtkPolyData> polyData = stlReader->GetOutput();

    vtkSmartPointer<vtkJSONDataSetWriter> writer = vtkSmartPointer<vtkJSONDataSetWriter>::New();
    writer->SetFileName(argv[2]);
    writer->SetInputData(polyData);
    writer->Update();

    return EXIT_SUCCESS;
}