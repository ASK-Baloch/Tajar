import { LucideProps } from "lucide-react";
import Image from "next/image";

export const Icons = {
  logo: (props:any) => (
    <Image src="/tajar.png" alt="logo" height={100} width={100} {...props} />
  ),
};
