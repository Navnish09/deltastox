"use client";

import React from "react";
import { Editor, IAllProps } from "@tinymce/tinymce-react";
import { Skeleton } from "./skeleton";

type Props = {
  onChange?: (content: string) => void;
  value?: string;
};

export const RichEditor = ({ onChange, value }: Props) => {
  return (
    <>
      <Editor
        apiKey="eiiyfmle196n4fkaid9eofgvyxld5qkaglmkvyg2prnwh1ah"
        onEditorChange={onChange}
        init={{
          plugins:
            "autoresize anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tableofcontents footnotes autocorrect typography inlinecss",
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          min_height: 400,
          menubar: false,
          skin: "oxide-dark",
          content_css: "dark",
        }}
        value={value}
      />
    </>
  );
};
