import { keyframes, styled } from 'goober';
import { Alert } from '../../core/types';

const drawCircle = keyframes`
   to {
      stroke-dashoffset: 0;
   }
`;

const drawCheck = keyframes`
   to {
      stroke-dashoffset: 0;
   }
`;

const CheckboxContainer = styled('div')`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100px;
   height: 100px;
`;

const Checkmark = styled('div')`
   width: 100px;
   height: 100px;
   position: absolute;
   justify-content: center;
   align-items: center;
`;

const Svg = styled('svg')`
   width: 100px;
   height: 100px;
   stroke-width: 2;
`;

const Circle = styled('circle')`
   stroke: rgba(137, 222, 137, 0.5);
   stroke-dasharray: 157;
   stroke-dashoffset: -157;
   transform: rotate(-150deg);
   transform-origin: center;

   &.animate {
      animation: ${drawCircle} 0.2s ease-in forwards;
   }
`;

const Check = styled('polyline')`
   stroke: #8bc968;
   stroke-dasharray: 50;
   stroke-dashoffset: 50;
   stroke-width: 3;
   stroke-linecap: round;
   stroke-linejoin: round;

   &.animate {
      animation: ${drawCheck} 0.15s ease-in forwards;
      animation-delay: 0.25s;
   }
`;

const Success = ({ alert }: { alert: Alert | null }) => {
   return (
      <CheckboxContainer>
         <Checkmark className={`${alert ? 'animate' : ''}`}>
            <Svg className='checkmark-circle' viewBox='0 0 52 52'>
               <Circle className='circle' cx='26' cy='26' r='25' fill='none' />
               <Check className='check' points='14,27 22,35 38,19' fill='none' />
            </Svg>
         </Checkmark>
      </CheckboxContainer>
   );
};

export default Success;
