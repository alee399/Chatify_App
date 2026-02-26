import React, { useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Loader,
  LogOutIcon,
  Pen,
  Volume2Icon,
  VolumeOffIcon,
} from "lucide-react";
import { useChatStore } from "../store/useChatStore";
const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

const ProfileHeader = () => {
  const fileInputRef = useRef(null);
  const [selectedImg, setSelectedImg] = useState("");
  const { authUser, logout, updateProfile, isUpdatingProfilePhoto } =
    useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ dp: base64Image });
    };
  };
  return (
    <div>
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex justify-between items-center ">
          <div className="flex gap-3 items-center">
            <div className="avatar avatar-online">
              <button
                className="size-14 rounded-full relative group border-0 overflow-hidden"
                onClick={() => {
                  fileInputRef.current.click();
                }}
              >
                <img
                  src={
                    selectedImg ||
                    authUser?.dp ||
                    authUser?.user?.dp ||
                    "/avatar.png"
                  }
                  alt="User profile image"
                  className="size-full object-cover"
                />
                <div className="">
                  <span>
                    {isUpdatingProfilePhoto ? (
                      <div className="absolute  bg-black/50 inset-0 rounded-full flex justify-center items-center">
                        <Loader size={16} className="animate-spin " />
                      </div>
                    ) : (
                      <div className="absolute bg-black/50 inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity flex justify-center items-center cursor-pointer">
                        <Pen size={16} />
                      </div>
                    )}
                  </span>
                </div>
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
            <div>
              <h3 className="text-slate-200 font-medium font-base capitalize leading-6">
                {authUser?.fullname || authUser?.user?.fullname}
              </h3>
              <p className="text-sm text-slate-400 font-medium">online</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="text-slate-400 cursor-pointer hover:text-slate-200 transition-colors">
              <LogOutIcon size={24} onClick={logout} />
            </button>
            <button
              onClick={() => {
                mouseClickSound.currentTime = 0;
                mouseClickSound
                  .play()
                  .catch((error) => console.log("play sound error", error));
                toggleSound();
              }}
              className="text-slate-400 cursor-pointer hover:text-slate-200 transition-colors"
            >
              {isSoundEnabled ? <Volume2Icon /> : <VolumeOffIcon />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
