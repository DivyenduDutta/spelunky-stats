import * as bulmaToast from 'bulma-toast';

export function createBulmaToast(message, type, position){
    return bulmaToast.toast({ 
                    message,
                    type,
                    position,
                    dismissible: true,
                    duration: 3000
           });
}
