import { styled } from 'goober';
import { Alert, AlertProps } from '../core/types';
import Success from './alert-icons/success';
import { useIconType } from '../hooks/use-icon-type';

interface RenderAlertProps {
   alert: Alert | null;
   alertOptions: AlertProps;
}

const Logo = styled('div')`
   display: flex;
   justify-content: center;
   align-items: center;
   margin-bottom: 20px;
   margin-top: 20px;
   padding: 0 15px;
`;

const Header = styled('header')`
   font-size: 20px;
   font-weight: 500;
   text-align: center;
   border-radius: 15px 15px 0 0;
   background-color: #fcfcfc;
   padding: 15px;
`;

const AlertBody = styled('div')`
   padding: 20px;

   h1 {
      font-size: 20px;
      padding: 0 15px;
      text-align: center;
      font-weight: 500;
      margin-bottom: 10px;
   }

   p {
      padding: 1px 15px;
      font-size: 14px;
      font-weight: 300;
      text-align: center;
      color: #525252;
   }
`;

const Footer = styled('footer')`
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 15px;
   border-radius: 0 0 15px 15px;
   background-color: #fcfcfc;

   button {
      padding: 5px 15px;
      font-size: 14px;

      &:first-child {
         border-radius: 7px;
         color: rgb(0, 160, 0);
         border: 1px solid rgb(0, 160, 0);
         margin-right: 12px;
      }

      &:last-child {
         color: white;
         border-radius: 7px;
         background-color: rgb(0, 160, 0);
         border: 1px solid rgb(0, 160, 0);
      }
   }
`;

export const RenderAlert = ({ alert, alertOptions }: RenderAlertProps) => {
   const IconType = useIconType(alert);

   return (
      <>
         {alert?.header ? <Header>{alert?.header}</Header> : null}
         <AlertBody>
            {alert?.icon ? <Logo>{IconType}</Logo> : null}
            {alert?.title ? <h1>{alert?.title}</h1> : null}
            <p>{alert?.description}</p>
         </AlertBody>
         <Footer>
            <button>Cancel</button>
            <button>Confirm</button>
         </Footer>
      </>
   );
};
