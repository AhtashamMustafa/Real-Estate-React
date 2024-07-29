import { useEffect, useRef } from "react";

function Widget ({setState ,config}) {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const {cloudName,uploadPreset,multiple,maxImageFileSize,folder} = config
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        multiple: multiple,
        maxImageFileSize: maxImageFileSize,
        folder: folder
      },
      function result (error, result) {
        if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            setState(prev=>[...prev,result.info.secure_url]);
          }
      }
    );
  }, []);
  return <button onClick={() => widgetRef.current.open()}>Upload</button>;
}

export default Widget;
