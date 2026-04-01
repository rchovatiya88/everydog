import { useGoogleDriveImage } from "@/lib/googleDrive";

export default function GoogleDriveImage({
  imageKey,
  alt,
  className,
  style,
  loading,
  decoding,
  fetchPriority,
}) {
  const src = useGoogleDriveImage(imageKey, alt);

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
    />
  );
}
