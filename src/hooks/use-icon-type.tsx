import Success from '../components/alert-icons/success';
import { Alert } from '../core/types';

export const useIconType = (alert?: Alert | null) => {
   switch (alert?.type) {
      case 'success':
         return <Success alert={alert} />;

      // case 'error':
      //    return 'Error';

      // case 'warning':
      //    return 'Warning';

      // case 'info':
      //    return 'Info';

      // case 'blank':
      //    return 'Custom';

      default:
         return <></>;
   }
};
