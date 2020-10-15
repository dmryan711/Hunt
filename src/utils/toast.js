export function toast(message, duration = 4000) { //This will make the duration default to 4k
    const toast = document.createElement('ion-toast');
    toast.message = message;
    toast.duration = duration;
    toast.color = "dark";
  
    document.body.appendChild(toast);
    return toast.present();
  }