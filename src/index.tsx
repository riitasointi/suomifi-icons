import React from 'react';
import { IconKeys, icons } from './icons';
import { StaticIconKeys, staticIcons } from './staticIcons';
export { IconKeys } from './icons';
export { StaticIconKeys } from './staticIcons';

const fallbackIcon = 'login';

function objValue<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

const getIcon = (icon: IconKeys | StaticIconKeys) => {
  const suomifiIcon =
    icon in icons
      ? objValue(icons, icon as IconKeys)
      : objValue(staticIcons, icon as StaticIconKeys);
  return !!suomifiIcon ? suomifiIcon : objValue(icons, fallbackIcon);
};

export const allIcons = Object.keys(icons);
export const allStaticIcons = Object.keys(staticIcons);

export interface SuomifiIconInterface {
  icon: IconKeys | StaticIconKeys;
  color?: string;
  className?: string;
}

export class SuomifiIcon extends React.Component<SuomifiIconInterface> {
  render() {
    const { icon, color, ...passProps } = this.props;
    const style = !(icon in staticIcons) && !!color ? { fill: color } : {};
    const Svg = getIcon(icon) as SvgrComponent;
    return <Svg {...passProps} style={style} />;
  }
}
