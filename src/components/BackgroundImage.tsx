"use client";

const BackgroundImage = () => {
  return (
    <div
      className="absolute inset-0 z-[-1]"
      style={{
        backgroundImage: `url('https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ced5627f-1e72-4e00-9ec3-a5c66d8255e2.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "blur(8px)",
        opacity: 0.5,
      }}
    />
  );
};

export default BackgroundImage;
