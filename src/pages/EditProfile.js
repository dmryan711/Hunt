import React from 'react';
import {IonPage, IonContent, IonItem, IonLabel, IonInput, IonRow, IonCol, IonButton, IonLoading} from '@ionic/react';
import NavHeader from '../components/Header/NavHeader';
import UserContext from '../contexts/UserContext';
import useFormValidation from '../hooks/useFormValidation';
import validateEditProfile from '../components/Auth/validateEditProfile';
import firebase from '../firebase';
import {toast} from '../utils/toast';

const EditProfile = (props) => {
    
    const {user, setUser} = React.useContext(UserContext);

    const INITIAL_STATE = {
        name:user && user.displayName, //checks if there is a user first
        email:user && user.email,
        newPassword:"",
        currentPassword: ""
    };

    const {
        handleSubmit,
        handleChange,
        setValues,
        values,
        isSubmitting
    } = useFormValidation(INITIAL_STATE, validateEditProfile, authenticateUser);

    const [busy, setBusy] =  React.useState(false);
    
    async function reauthenticate(email,password){
        const credential = firebase.app.auth.EmailAuthProvider.credential(email,password);
        try{
            await user.reauthenticateWithCredential(credential);
            console.log("Reauthentication Success");
            
        }catch(err){
            console.error("Profile Update Error",err);
            toast(err.message);
        }
    }

    async function updateProfileItems(name, email, password){
        await user.updateProfile({
            displayName:name, 
        });

        await user.updateEmail(email);
        if(password){
            await user.updatePassword(password);
        }
    }

    async function authenticateUser(){
        setBusy(true);
        const {name,email,currentPassword,newPassword} = values;
        try{
            await reauthenticate(user.email,currentPassword);
            await updateProfileItems(name,email,newPassword);
            const result = await firebase.login(email, newPassword || currentPassword); //checks if new password is even available
            setValues({
                name:user && user.displayName,
                email:user && user.email,
                newPassword:"",
                currentPassword:""
            });
            setUser(result.user);
            toast("You have updated your profile successfully");
            props.history.push("/profile");
        }catch(err){
            console.error("Profile update error",err);
            toast(err.message);
        }
        setBusy(false);
    }
    return (
        <IonPage>
            <NavHeader title ="Edit Profile" />
            <IonLoading message={"Please wait ..."} isOpen={busy}></IonLoading>
            <IonContent>
                
                <IonItem lines="full">
                    <IonLabel position="floating">Username</IonLabel>
                    <IonInput name="name" value={values.name} onIonChange={handleChange} type="text" required></IonInput>
                </IonItem>

                <IonItem lines="full">
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput name="email" value = {values.email} onIonChange={handleChange} type="text" required></IonInput>
                </IonItem>

                <IonItem lines="full">
                    <IonLabel position="floating">New Password</IonLabel>
                    <IonInput name="newPassword" value = {values.newPassword} onIonChange={handleChange} type="password"></IonInput>
                </IonItem>

                <IonItem lines="full">
                    <IonLabel position="floating">Current Password</IonLabel>
                    <IonInput name="currentPassword" value = {values.currentPassword} onIonChange={handleChange} type="password"></IonInput>
                </IonItem>


                <IonRow>
                    <IonCol>
                        <IonButton type ="submit" color="primary" onClick = {handleSubmit} disabled={isSubmitting} expand="block">
                        Save
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonContent>
        </IonPage>
    );
}

export default EditProfile;