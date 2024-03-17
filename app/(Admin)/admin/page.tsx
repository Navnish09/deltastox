"use client";

import { useState } from "react";

import { ThumbHeading } from "@/app/_components/ThumbHeading";
import { RichEditor } from "@/components/ui/rich-editor";
import { Button } from "@/components/ui/button";
import { postMessage } from "@/services/apiServices";
import { toast } from "@/components/ui/use-toast";

export default function Admin() {
  const [message, setMessage] = useState("Add your message here");
  const [posting, setPosting] = useState(false);

  const onEditorChange = (content: string) => {
    setMessage(content);
  };

  const handlePostMessage = async () => {
    setPosting(true);
    try {
      await postMessage(message);
      toast({
        title: "Message posted successfully",
        variant: "success",
      });
      setMessage("");
    } catch (error) {
      toast({
        title: "Error while posting message",
        variant: "destructive",
      });
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="flex px-4 py-5 flex-col md:gap-8 gap-6 relative h-full">
      <div className="flex item-center justify-between flex-wrap gap-2">
        <ThumbHeading heading="Post Your Message " color="success" />
        <Button disabled={posting} onClick={handlePostMessage}>
          {posting ? "Posting" : "Post"}
        </Button>
      </div>
      <div>
        <RichEditor onChange={onEditorChange} value={message} />
      </div>
    </div>
  );
}
