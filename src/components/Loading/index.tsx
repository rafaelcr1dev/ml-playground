import Presentation from "../Presentation"
import { Preloader, Oval } from 'react-preloader-icon';

export default function Loading() {
  return (
    <Presentation>
      <span className="mb-2">
        <Preloader
          use={Oval}
          size={74}
          strokeWidth={8}
          strokeColor="#3b82f6"
          duration={800}
        /> 
      </span>
      <span className="text-blue-500">
        Por favor aguarde...
      </span>
    </Presentation>
  );
}
