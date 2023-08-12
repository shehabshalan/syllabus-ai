import React from "react";
import { RingSpinnerOverlay } from "react-spinner-overlay";

const OverlayLoader = ({ loading }: { loading: boolean }) => {
  return (
    <>
      <RingSpinnerOverlay
        loading={loading}
        overlayColor="rgba(185, 183, 183, 0.5)"
        color="#000"
      />
    </>
  );
};

export default OverlayLoader;
