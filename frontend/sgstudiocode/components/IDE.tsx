import React, { FunctionComponent, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { okaidia } from "@uiw/codemirror-theme-okaidia";

const IDE: FunctionComponent<{
  output: string;
  code: string;
  setCode: Function;
}> = ({ code, setCode, output }) => {
  return (
    <div>
      <div className="mt-5 text-base">
        <CodeMirror
          value={code}
          theme={okaidia}
          height="50vh"
          // extensions={[python()]}
          onChange={(value, viewUpdate) => {
            setCode(value);
            // console.log("value:", value);
          }}
        />
      </div>
      <div className="p-6 mt-5 text-base text-white whitespace-pre-wrap rounded-lg bg-lightBlack font-monospace">
        {!output ? <h1>what u get &gt; </h1> : output}
      </div>
    </div>
  );
};

export default IDE;
