import type { FC, SVGProps } from "react";
import type { IconType } from "react-icons";
// Only the Font Awesome 6 icons whose names appear in src/ (see plugins/usedIcons.js).
// Use any react-icons/fa6 name (e.g. "FaRocket") in content or code and it is picked up at build time.
import * as FaIcons from "virtual:used-icons";

interface IDynamicIcon extends SVGProps<SVGSVGElement> {
  icon: string;
  className?: string;
}

const icons = FaIcons as unknown as Record<string, IconType>;

const DynamicIcon: FC<IDynamicIcon> = ({ icon, ...props }) => {
  const Icon = icons[icon];
  if (!Icon) {
    return <span className="text-sm">Icon not found</span>;
  }
  return <Icon {...props} />;
};

export default DynamicIcon;
