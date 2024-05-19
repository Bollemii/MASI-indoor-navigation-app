import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { routes } from "@/router/routes";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import NextButton from "@/components/NextButton";
import BackButton from "@/components/BackButton";
import { Waypoint } from "@/models/waypoint";
import { Picker } from "@react-native-picker/picker";
import { WaypointType } from "@/models/waypointType";
import Toast from "react-native-root-toast";

export default function Informations({ route }) {
    const { waypoint } = route.params as { waypoint: Waypoint };
    if (!waypoint) {
        console.log("No waypoint provided");
        return null;
    }
    const navigation = useNavigation();
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

        waypoint.name = name;
        waypoint.type = type;
        // @ts-expect-error: navigation type is not well defined
        navigation.navigate(routes.installation.addNeighbor, { waypoint: waypoint });
    };

    return (
        <View style={styles.container}>
            <BackButton text="Annuler" pageRedirect={routes.home}/>
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
