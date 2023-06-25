"use client";

import Picker from "@emoji-mart/react";

// import dynamic from "next/dynamic";
// import { EmojiStyle } from "emoji-picker-react";

// const EmojiPicker = dynamic(() => import("emoji-picker-react"));

export default ({ isMutating, postEntryFunc }: { isMutating: boolean; postEntryFunc: (message: string) => Promise<boolean> }) => {
  return (
    <Picker theme="light" dynamicWidth={true} skinTonePosition="none" categories={["people", "nature", "foods", "activity", "places", "objects", "symbols", "flags"]} onEmojiSelect={(e: { native: string }) => !isMutating && postEntryFunc(e.native)} />
    // <EmojiPicker
    //   onEmojiClick={e => !isMutating && postEntryFunc(e.emoji)}
    //   lazyLoadEmojis
    //   skinTonesDisabled
    //   emojiStyle={EmojiStyle.NATIVE}
    //   emojiVersion="5.0"
    //   previewConfig={{ defaultEmoji: "1f47d" }}
    //   height={400}
    //   width={"100%"}
    //   // @ts-expect-error
    //   categories={["smileys_people", "animals_nature", "food_drink", "travel_places", "activities", "objects", "symbols", "flags"]}
    // />
  );
};
