import React from 'react';
import {IonBackButton, IonHeader, IonToolbar, IonButtons, IonTitle} from '@ionic/react';

const NavHeader = ({title}) => {
    return (
        <IonHeader>
            <IonToolbar color="primary">
                <IonButtons slot="start">
                    <IonBackButton defaultHref = "/" />
                </IonButtons>
                <IonTitle>{title}</IonTitle>
            </IonToolbar>
        </IonHeader>
    );
};

export default NavHeader;