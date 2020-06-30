import React, { useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useDispatch } from "react-redux";
import { uploadAvatar } from "~/actions/user";
import { PrimaryButton } from "~/components/Button";

type Props = {
  aspectRatio: number;
  close: Function;
};

const AvatarUpload = ({ aspectRatio, close }: Props) => {
  const imageRef = useRef(null);
  let fileUrl;
  const dispatch = useDispatch();

  const [state, setState] = useState({
    src: null,
    croppedImageUrl: null,
    crop: {
      aspect: aspectRatio
    }
  });

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setState((s) => ({ ...s, src: reader.result }))
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // If you setState the crop in here you should return false.
  const onImageLoaded = (image) => {
    imageRef.current = image;
    const width =
      image.width > image.height ? image.height * aspectRatio : image.width;
    const height =
      image.height > image.width ? image.width / aspectRatio : image.height;
    const x = width === image.width ? 0 : (image.width - width) / 2;
    const y = height === image.height ? 0 : (image.height - height) / 2;

    const crop = {
      unit: "px",
      aspect: aspectRatio,
      width,
      height,
      x,
      y
    };
    setState((s) => ({ ...s, crop: crop }));

    makeClientCrop(crop);

    return false;
  };

  const onCropComplete = (crop) => {
    makeClientCrop(crop);
  };

  const onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    setState((s) => ({ ...s, crop }));
  };

  const makeClientCrop = async (crop) => {
    if (imageRef && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(
        imageRef.current,
        crop,
        "newFile.jpeg"
      );
      setState((s) => ({ ...s, croppedImageUrl }));
    }
  };

  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        window.URL.revokeObjectURL(fileUrl);
        fileUrl = window.URL.createObjectURL(blob);
        resolve(fileUrl);
      }, "image/jpeg");
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const response = await fetch(state.croppedImageUrl);
    const blob = await response.blob();
    formData.append("image", blob);
    // @ts-ignore
    dispatch(uploadAvatar(formData)).then((response) => close());
  };

  const { crop, croppedImageUrl, src } = state;
  return (
    <div className="flex flex-col items-center mx-4">
      <div>
        <input type="file" accept="image/*" onChange={onSelectFile} />
      </div>
      {src && (
        <ReactCrop
          src={src}
          crop={crop}
          ruleOfThirds
          onImageLoaded={onImageLoaded}
          onComplete={onCropComplete}
          onChange={onCropChange}
        />
      )}
      {croppedImageUrl && (
        <PrimaryButton className="mt-5 block w-full" onClick={handleUpload}>
          Speichern
        </PrimaryButton>
      )}
    </div>
  );
};

export default AvatarUpload;
