import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import { Picker } from "@react-native-picker/picker";

import { routes } from "@/router/routes";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import { WaypointType } from "@/models/waypointType";
import NextButton from "@/components/NextButton";
import BackButton from "@/components/BackButton";
import { useWaypointContext } from "@/context/waypointContext";

export default function Informations() {
    const navigation = useNavigation();
    const { waypointCtx, setWaypointCtx } = useWaypointContext();
    const [name, setName] = useState("");
    const [type, setType] = useState<WaypointType>(WaypointType.ENTRY_EXIT);

    const handlePress = () => {
        if (!name) {
            console.log("Name is required");
            Toast.show("Le nom est requis", {
                position: Toast.positions.CENTER,
            });
            return;
        }
        if (!type) {
            console.log("Type is required");
            Toast.show("Le type est requis", {
                position: Toast.positions.CENTER,
            });
            return;
        }

        const waypoint = waypointCtx;
        waypoint.name = name.trim();
        waypoint.type = type;
        setWaypointCtx(waypoint);
        navigation.navigate(routes.ADD_NEIGHBOR);
    };

    useEffect(() => {
        if (!waypointCtx) {
            console.error("Waypoint context is not defined");
            navigation.navigate(routes.HOME);
        }
    }, []);

    return (
        <View style={styles.container}>
            <BackButton text="Annuler" pageRedirect={routes.HOME}/>
            <Text style={styles.title}>Ajout d'un nouveau point de passage</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Nom</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nom du point de passage"
                    onChangeText={(value) => setName(value)}
                />
                <Text style={styles.label}>Type</Text>
                <View style={styles.selectContainer}>
                    <Picker
                        style={styles.input}
                        selectedValue={type}
                        onValueChange={(value) => setType(value)}
                    >
                        <Picker.Item label="Entrée - Sortie" value={WaypointType.ENTRY_EXIT}/>
                        <Picker.Item label="Salle" value={WaypointType.ROOM}/>
                        <Picker.Item label="Intersection" value={WaypointType.CORRIDOR_INTERSECTION}/>
                        <Picker.Item label="Escaliers" value={WaypointType.STAIRS}/>
                        <Picker.Item label="Ascenseur" value={WaypointType.ELEVATOR}/>
                    </Picker>
                </View>
            </View>
            <NextButton text="Suivant" onPress={handlePress}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: colors.brown,
    },
    title: {
        fontSize: fonts.size.title,
        fontWeight: 'bold',
        color: colors.white,
        textAlign: 'center',
    },
    inputContainer: {
        width: '80%',
    },
    label: {
        fontSize: fonts.size.normal,
        fontWeight: 'bold',
        marginBottom: 5,
        color: colors.white,
    },
    input: {
        width: '100%',
        height: 60,
        marginBottom: 20,
        borderWidth: 1,
        padding: 10,
        backgroundColor: colors.white,
    },
    selectContainer: {
        width: '100%',
        height: 60,
        marginBottom: 20,
        borderWidth: 1,
        backgroundColor: colors.white,
    },
});
