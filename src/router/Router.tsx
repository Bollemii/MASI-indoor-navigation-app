import { Text } from "react-native";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { routes } from "@/router/routes";
import HomeScreen from "@/screens/HomeScreen";
import NotFound from "@/screens/NotFound";
// Installation screens
import AddPoint from "@/screens/installation/AddPoint";
import Informations from "@/screens/installation/Informations";
import AddNeighbor from "@/screens/installation/AddNeighbor";
import NeighborScan from "@/screens/installation/NeighborScan";
import SetStageChange from "@/screens/installation/SetStageChange";
import NewOrientation from "@/screens/installation/NewOrientation";
import NeighborOrientation from "@/screens/installation/NeighborOrientation";
// Navigation screens
import StartScan from "@/screens/navigation/StartScan";
import Destination from "@/screens/navigation/Destination";
import Navigation from "@/screens/navigation/Navigation";
import End from "@/screens/navigation/End";

export default function Router() {
    const Stack = createNativeStackNavigator();
    const navigationRef = useNavigationContainerRef();

    const handleError = (error: any) => {
        console.log("Unhandled routing action", error);
        // @ts-expect-error: navigation type is not well defined
        navigationRef.navigate("*");
    };

    return (
        <NavigationContainer
            fallback={<Text>Chargement...</Text>}
            ref={navigationRef}
            onUnhandledAction={handleError}
        >
            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={routes.home}>
                <Stack.Screen name={routes.home} component={HomeScreen}/>
                {/* Installation screens */}
                <Stack.Group>
                    <Stack.Screen name={routes.installation.addPoint} component={AddPoint}/>
                    <Stack.Screen name={routes.installation.informations} component={Informations}/>
                    <Stack.Screen name={routes.installation.addNeighbor} component={AddNeighbor}/>
                    <Stack.Screen name={routes.installation.neighborScan} component={NeighborScan}/>
                    <Stack.Screen name={routes.installation.setStageChange} component={SetStageChange}/>
                    <Stack.Screen name={routes.installation.newOrientation} component={NewOrientation}/>
                    <Stack.Screen name={routes.installation.neighborOrientation} component={NeighborOrientation}/>
                </Stack.Group>
                {/* Navigation screens */}
                <Stack.Group>
                    <Stack.Screen name={routes.navigation.startScan} component={StartScan}/>
                    <Stack.Screen name={routes.navigation.destination} component={Destination}/>
                    <Stack.Screen name={routes.navigation.navigation} component={Navigation}/>
                    <Stack.Screen name={routes.navigation.end} component={End}/>
                </Stack.Group>
                <Stack.Screen name="*" component={NotFound}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};
