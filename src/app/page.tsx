import PlenitudoMVP from "@/components/plenitudo/index";
import VerificationBanner from "@/components/plenitudo/VerificationBanner";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <Suspense fallback={null}>
        <VerificationBanner />
      </Suspense>
      <PlenitudoMVP />
    </>
  );
}
