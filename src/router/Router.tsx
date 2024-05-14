import { Text } from "react-native";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { routes } from "@/router/routes";
import HomeScreen from "@/screens/HomeScreen";
import NotFound from "@/screens/NotFound";

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
                <Stack.Screen name="*" component={NotFound}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};
