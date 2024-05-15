# Indoor navigation app
Maked by: BOLLE Emilien

## Context
This application is the prototype of a research project. This project has the objective of design a system to navigate people in a building. There are already some applications that do this, but they are expensive because they use a physical infrastructure to locate the user. The objective of this project is to create a system that does not need any physical infrastructure.

The prototype is a mobile application that implements the navigation system. It has objective to check if the system is viable and functional. The application is composed of two parts: the installation part and the navigation part. 

The research document is available in the `docs` folder : [Document](docs/Documentation%20-%20Indoor%20navigation.pdf)

## How it works
### Theory
The system use a neural network to locate and navigate the user. This network is build by an administrator that uses the application to create the network. The network contains a lot of points that are connected by lines. Each point, that we name "nexthop", corresponds to a place in the building as a room, a entrance/a exit, a corridor intersection, a stair, etc. With that network, the building is transformed in a graph where it is possible to create a path between any two points. The application can navigate the user using the path between the user's current point and the wanted destination point.

### Practice
The points are represented by QR codes in the building. The user can scan the QR code of a point. To navigate the user between two points, we use the orientation of the nexthop from the current point.

## How to use
### Network creation
To build the network, the administrator must use the application. The administrator must create the points and connect them. For that, he must use the "Installation" part of the application. In this part, he can create a new point and reference the neighbors of this point.

### Navigation
To navigate, the user must use the application. The user scan the QR code of the point where he is. The application will locate the user and ask him the destination point. The application will calculate the path and show the nexthop to the user. The user must go to the nexthop and scan the QR code of this point. The application will show the next nexthop to the user. The user must repeat this process until he arrives at the destination point.
