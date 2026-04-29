import EmojiPicker from "emoji-picker-react";
import { Image, X } from "lucide-react";
import { useState } from "react";

const EmojiPickerPopUp = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  // 🟢 Correct function
  const handleEmojiClick = (emojiData) => {
    // emoji-picker-react gives:
    // emojiData.emoji  → actual emoji
    onSelect(emojiData.emoji);
    setIsOpen(false);  // close popup
  };

  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-6">

      {/* Icon + Label */}
      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-4 cursor-pointer"
      >
        <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-purple-500 rounded-lg">
          {icon ? (
            <span className="text-3xl">{icon}</span>
          ) : (
            <Image />
          )}
        </div>

        <p className="text-sm text-gray-700">
          {icon ? "Change Icon" : "Pick Icon"}
        </p>
      </div>

      {/* POPUP */}
      {isOpen && (
        <div className="relative p-4 bg-white shadow-lg rounded-lg">

          {/* CLOSE BUTTON */}
          <button
            onClick={() => setIsOpen(false)}
            className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer"
          >
            <X />
          </button>

          {/* EMOJI PICKER */}
          <EmojiPicker
            open={isOpen}
            onEmojiClick={handleEmojiClick}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopUp;
