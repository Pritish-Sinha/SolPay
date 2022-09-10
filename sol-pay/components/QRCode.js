import { createQROptions } from "@solana/pay";
import QRCodeStyling from "@solana/qr-code-styling";
import React, {
  FC,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export const QRCode = ({url}) => {
  const [size, setSize] = useState(() =>
    typeof window === "undefined"
      ? 400
      : Math.min(window.screen.availWidth, 400)
  );
  useLayoutEffect(() => {
    const listener = () => setSize(Math.min(window.screen.availWidth, 400));

    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, []);

//   const [background, color] = useMemo(
//     () => (theme === "light" ? ["#eff2f3", "#2a2a2a"] : ["#eef5f6", "#2a2a2a"]),
//     [theme]
//   );
//   const { url } = usePayment();
  const options = useMemo(
    () => createQROptions(url, size),
    [url, size]
  );

  const qr = useMemo(() => new QRCodeStyling(), []);
  useLayoutEffect(() => qr.update(options), [qr, options]);

  const ref = useRef(null);
  useLayoutEffect(() => {
    if (ref.current) {
      qr.append(ref.current);
    }
  }, [ref, qr]);

  return <div ref={ref} />;
};
