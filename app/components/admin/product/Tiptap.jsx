"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { Toolbar } from "@mui/material";
import Button from "@mui/material/Button";
import Underline from "@tiptap/extension-underline";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import {
  FormatBold as FormatBoldIcon,
  FormatItalic as FormatItalicIcon,
  FormatUnderlined as FormatUnderlinedIcon,
} from "@mui/icons-material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FontDownloadIcon from "@mui/icons-material/FontDownload";
const TipTap = ({ onChange, description }) => {
  const handleChange = (newData) => {
    onChange(newData);
  };
  const editor = useEditor({
    extensions: [StarterKit, Paragraph, Text, Underline, ListItem, OrderedList],
    content: description || "<p>รายละเอียดสินค้า 🌎️</p>",
    autofocus: true,
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full px-4">
      <div className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start gap-5 w-full flex-wrap border border-gray-700">
        <Toolbar className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap">
          <Button
            className={
              editor.isActive("bold")
                ? "bg-sky-700 text-white p-2 rounded-lg"
                : "text-sky-400"
            }
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
          >
            <FormatBoldIcon className="w-5 h-5" />
          </Button>
          <Button
            className={
              editor.isActive("italic")
                ? "bg-sky-700 text-white p-2 rounded-lg"
                : "text-sky-400"
            }
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
          >
            <FormatItalicIcon className="w-5 h-5" />
          </Button>
          <Button
            className={
              editor.isActive("underline")
                ? "bg-sky-700 text-white p-2 rounded-lg"
                : "text-sky-400"
            }
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
          >
            <FormatUnderlinedIcon className="w-5 h-5" />
          </Button>
          <Button
            className={
              editor.isActive("orderedList")
                ? "bg-sky-700 text-white p-2 rounded-lg"
                : "text-sky-400"
            }
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            disabled={!editor.can().chain().focus().toggleOrderedList().run()}
          >
            <FormatListBulletedIcon className="w-5 h-5" />
          </Button>

          {/* Add more buttons as needed */}
        </Toolbar>
        <div className="border border-black-400 w-full mt-2 rounded-lg p-4">
          <EditorContent
            editor={editor}
            className="prose prose-lg mx-auto"
            style={{ whiteSpace: "pre-line" }}
          />
        </div>
      </div>
    </div>
  );
};

export default TipTap;
