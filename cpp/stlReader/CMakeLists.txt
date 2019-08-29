cmake_minimum_required(VERSION 3.10)
project(stlReader)

set(EXECUTABLE_OUTPUT_PATH ${PROJECT_BINARY_DIR}/Pipelines)

set(SRCS main.cxx)


find_package(VTK REQUIRED)
include(${VTK_USE_FILE})

#BUILD
if(EMSCRIPTEN)
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s DISABLE_EXCEPTION_CATCHING=0")
    include(ITKBridgeJavaScript)
    web_add_executable(${CMAKE_PROJECT_NAME} ${SRCS})
    web_target_link_libraries(${CMAKE_PROJECT_NAME} ${VTK_LIBRARIES})
else()
    add_executable(${CMAKE_PROJECT_NAME} ${SRCS})
    target_link_libraries(${CMAKE_PROJECT_NAME} ${VTK_LIBRARIES})
endif()