import React from 'react';
import {IonPage, IonContent, IonItem, IonLabel, IonInput, IonRow, IonCol, IonButton, IonRouterLink} from '@ionic/react';
import NavHeader from '../components/Header/NavHeader';

const Login = () => {
    return (
        <IonPage>
            <NavHeader title ="Log In" />
            <IonContent>
                
                <IonItem lines="full">
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput name="Email" type="text" required></IonInput>
                </IonItem>

                <IonItem lines="full">
                    <IonLabel position="floating">Password</IonLabel>
                    <IonInput name="Password" type="password" required></IonInput>
                </IonItem>

                <IonRow>
                    <IonCol>
                        <IonButton type ="submit" color="primary" expand="block">
                        Log In
                        </IonButton>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                       <IonRouterLink routerLink={'/forgot'}>
                            Forgot Password?
                       </IonRouterLink>
                    </IonCol>
                </IonRow>
            </IonContent>
        </IonPage>
    );
}

export default Login;