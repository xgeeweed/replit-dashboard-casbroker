import React, { useEffect, useRef } from "react";
import EditorJS, { API, OutputData } from "@editorjs/editorjs";
// @ts-ignore
import CheckList from "@editorjs/checklist";
// @ts-ignore
import Code from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
// @ts-ignore
import Embed from "@editorjs/embed";
import InlineCode from "@editorjs/inline-code";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
// @ts-ignore
import SimpleImage from "@editorjs/simple-image";
// @ts-ignore
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
// @ts-ignore
import Raw from "@editorjs/raw";
// @ts-ignore
import LinkTool from '@editorjs/link';

const EDITOR_TOOLS = {
  code: Code,
  //   header: {
  //     class: Header,
  //     shortcut: "CMD+H",
  //     inlineToolbar: true,
  //     config: {
  //       placeholder: "Enter a Header",
  //       levels: [2, 3, 4],
  //       defaultLevel: 2,
  //     },
  //   },
  header: Header,
  paragraph: {
    class: Paragraph,
    // shortcut: 'CMD+P',
    inlineToolbar: true,
  },
  checklist: CheckList,
  inlineCode: InlineCode,
  table: Table,
  list: List,
  quote: Quote,
  delimiter: Delimiter,
  raw: Raw,
  image: SimpleImage,
  embed: Embed,
};

interface EditorProps {
  data: OutputData;
  onChange: (data: OutputData) => void;
  holder: string;
}

function Editor({ data, onChange, holder }: EditorProps) {
  //add a reference to editor
  const ref = useRef<EditorJS>();

  //initialize editorjs
  useEffect(() => {
    //initialize editor if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,
        placeholder: "Start writing here..",
        tools: EDITOR_TOOLS,
        data,
        async onChange(api, event) {
          const content = await api.saver.save();
          // console.log(content, "sdfb");
          onChange(content);
        },
      });
      ref.current = editor;
    }

    //add a return function handle cleanup
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <div
        id={holder}
        style={{
          width: "100%",
          minHeight: 500,
          borderRadius: " 7px",
          background: "fff",
        }}
      />
    </>
  );
}

export default Editor;
