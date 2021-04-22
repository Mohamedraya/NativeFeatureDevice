import React ,{useState}from 'react';
import {View,Text,Button,Image,StyleSheet,Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const ImgPicker = props => {

    const [pickedImage,setPickedImage] = useState();

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA);
        if(result.status !== 'granted') {
           Alert.alert('insufficient Permissions!',
           'you need to grant camera permissions to use this app',
           [{text: 'Okay'}]);

           return false;
        }

        return true;
    };

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if(!hasPermission) {
            return;
        }
        const image = ImagePicker.launchCameraAsync({
            allowsEditing: true,// like crop the img
            aspect: [16,6],// string that represent img
            quality: 0.5
        });
        setPickedImage(image.uri);
        props.onImageTaken(image.uri);
    };

    return <View style={styles.imagePicker}>
        <View style={styles.imagePreview}>
            {!pickedImage ? ( <Text>No Image Picked</Text> )
              : (<Image style={styles.image} source={{uri: pickedImage}}/>)}
        </View>
        <Button title= "Take Image" onPress={takeImageHandler}/>
    </View>
};

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: "center",
        marginBottom: 15
    },

    imagePreview: {
        width: "100%",
        height: 200,
        marginVertical: 30,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#ccc",
        borderWidth: 1
    },

    image: {
        width: "100%",
        height: "100%"
    }
});

export default ImgPicker;