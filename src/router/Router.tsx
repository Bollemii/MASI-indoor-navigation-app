import { Text } from "react-native";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "@/router/routes";
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

declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
  }

export default function Router() {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    const navigationRef = useNavigationContainerRef();

    const handleError = (error: any) => {
        console.log("Unhandled routing action", error);
        navigationRef.navigate("*");
    };

    return (
        <NavigationContainer
            fallback={<Text>Chargement...</Text>}
            ref={navigationRef}
            onUnhandledAction={handleError}
        >
            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={"Home"}>
                <Stack.Screen name={"Home"} component={HomeScreen}/>
                {/* Installation screens */}
                <Stack.Group>
                    <Stack.Screen name={"AddPoint"} component={AddPoint}/>
                    <Stack.Screen name={"Informations"} component={Informations}/>
                    <Stack.Screen name={"AddNeighbor"} component={AddNeighbor}/>
                    <Stack.Screen name={"NeighborScan"} component={NeighborScan}/>
                    <Stack.Screen name={"SetStageChange"} component={SetStageChange}/>
                    <Stack.Screen name={"NewOrientation"} component={NewOrientation}/>
                    <Stack.Screen name={"NeighborOrientation"} component={NeighborOrientation}/>
                </Stack.Group>
                {/* Navigation screens */}
                <Stack.Group>
                    <Stack.Screen name={"StartScan"} component={StartScan}/>
                    <Stack.Screen name={"Destination"} component={Destination}/>
                    <Stack.Screen name={"Navigation"} component={Navigation}/>
                    <Stack.Screen name={"End"} component={End}/>
                </Stack.Group>
                <Stack.Screen name="*" component={NotFound}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};
