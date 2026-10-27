import Image from "next/image";
import { asset } from "@/lib/asset";

export default function TextLink({ children }: { children: React.ReactNode }) {
  return (
    <a href="#" className="text-link">
      {children}
      <Image src={asset("/assets/icons/link-line.svg")} alt="" width={28} height={2} />
    </a>
  );
}
