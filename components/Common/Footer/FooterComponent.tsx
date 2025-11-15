import { useCallback, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  StyledFooterImage,
  StyledFooterWrapper,
  StyledCredits,
  StyledDeveloper,
} from "./Styles";

// Five-tap footer secret: navigate to same page with admin=1 to enable admin mode
// Debounce window: taps must occur within 3.5s total between first and last
// Resets after success or timeout

export const FooterComponent = () => {
  const tapData = useRef<{ count: number; first: number | null }>({
    count: 0,
    first: null,
  });
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const handleTap = useCallback(() => {
    const now = Date.now();
    const windowMs = 3500;
    if (
      tapData.current.first === null ||
      now - tapData.current.first > windowMs
    ) {
      tapData.current.first = now;
      tapData.current.count = 0;
    }
    tapData.current.count += 1;
    if (tapData.current.count >= 5) {
      // Preserve existing params but force admin=1
      const query = new URLSearchParams(params?.toString());
      query.set("admin", "1");
      router.push(`${pathname}?${query.toString()}`);
      tapData.current.count = 0;
      tapData.current.first = null;
      if (typeof window !== "undefined" && window.navigator.vibrate) {
        window.navigator.vibrate(50);
      }
    }
  }, [params, pathname, router]);

  return (
    <StyledFooterWrapper>
      <div
        onClick={handleTap}
        title=""
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
          width: "100%",
        }}
      >
        <StyledFooterImage
          src="/assets/images/gondor-tree.svg"
          alt="img-gondor-tree"
          width={65.73}
          height={93}
        />
        <StyledCredits>
          © {new Date().getFullYear()} Iván y Joanna. Todos los derechos
          reservados.
        </StyledCredits>
        <StyledDeveloper>
          Diseño y concepto por{" "}
          <a
            href="https://www.linkedin.com/in/andrea-alejandra-de-armas-nunez-200200ba/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Andrea de Armas
          </a>
        </StyledDeveloper>
        <StyledDeveloper>
          Desarrollado por{" "}
          <a
            href="https://www.linkedin.com/in/edgarivanespinoza/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Iván Espinoza
          </a>
        </StyledDeveloper>
      </div>
    </StyledFooterWrapper>
  );
};
