import React from 'react';
import {IonBackButton, IonHeader, IonToolbar, IonButtons, IonTitle, IonButton, IonIcon} from '@ionic/react';

const NavHeader = ({title,option,action,icon}) => {
    return (
        <IonHeader>
            <IonToolbar color="primary">
                <IonButtons slot="start">
                    <IonBackButton defaultHref = "/" />
                </IonButtons>
                {option && (
                    <IonButtons slot="primary">
                        <IonButton onClick={action}>
                            <IonIcon slot="icon-only" icon={icon} />
                        </IonButton>
                    </IonButtons>
                )}
                <IonTitle>{title}</IonTitle>
            </IonToolbar>
        </IonHeader>
    );
};

export default NavHeader;