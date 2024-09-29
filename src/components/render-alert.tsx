import { styled } from 'goober';
import { alert as coreAlert } from '../../src/core/alert';
import { Alert as AlertType, AlertProps } from '../../src/core/types';
import { useIconType } from '../../src/hooks/use-icon-type';

interface RenderAlertProps {
   alert: AlertType | null;
   alertOptions: AlertProps;
}

const Logo = styled('div')`
   display: flex;
   justify-content: center;
   align-items: center;
   margin-bottom: 25px;
   padding: 0 15px;
`;

const Header = styled('header')`
   font-size: 1.3em;
   font-weight: 500;
   text-align: center;
   border-radius: 15px 15px 0 0;
   background-color: #fcfcfc;
   padding: 15px;
`;

const AlertBody = styled('div')`
   padding: 20px;

   h1 {
      font-size: 1.4em;
      padding: 0 15px;
      color: #525252;
      text-align: center;
      font-weight: 500;
      margin-bottom: 15px;
   }

   p {
      padding: 1px 15px;
      font-size: 1em;
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

   button {
      padding: 5px 15px;
      border-radius: 7px;
      font-size: 1em;
   }

   .secondary {
      color: rgb(0, 160, 0);
      border: 1px solid rgb(0, 160, 0);
      margin-right: 12px;
      border: 1px solid rgb(0, 160, 0);
   }

   .primary {
      color: white;
      border-radius: 7px;
      background-color: rgb(0, 160, 0);
      border: 1px solid rgb(0, 160, 0);
   }
`;

export const RenderAlert = ({ alert }: RenderAlertProps) => {
   const IconType = useIconType(alert);

   return (
      <>
         {alert?.header ? <Header>{alert?.header}</Header> : null}
         <AlertBody>
            {alert?.icon ? <Logo>{alert?.icon}</Logo> : <Logo>{IconType}</Logo>}
            {alert?.title ? <h1>{alert?.title}</h1> : null}
            <p>{alert?.description}</p>
         </AlertBody>
         <Footer>
            {alert?.buttons && alert?.buttons?.length > 0 ? (
               alert?.buttons?.map((button) => (
                  <button
                     key={alert.id}
                     type={`${button.type || 'button'}`}
                     onClick={button.onClick}
                     style={button.style}
                     className={button.className && `${button.variant || 'primary'}`}
                  >
                     {button.label}
                  </button>
               ))
            ) : (
               //TODO: Option to pass style and className from outside.
               <button type='button' className='primary' onClick={() => coreAlert.remove(alert?.id)}>
                  Okay
               </button>
            )}
         </Footer>
      </>
   );
};
