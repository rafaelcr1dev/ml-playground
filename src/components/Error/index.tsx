import { VscError } from "react-icons/vsc";

import Presentation from "../Presentation";

export default function Error({ messageText }: any) {
  return (
    <Presentation>
      <span className="mb-2 border border-red-200 rounded-full text-center p-4">
        <VscError size="74" className="text-red-500" />
      </span>
      <p className="text-2xl mb-2">
        {messageText}
      </p>
    </Presentation>
  );
}
