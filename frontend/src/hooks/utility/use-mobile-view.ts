/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { useWindowSize } from '@uidotdev/usehooks';

export const useMobileView = () => {
  const MOBILE_VIEW_END = 1028;

  const { width } = useWindowSize();

  const isMobileView = width && width <= MOBILE_VIEW_END;

  return isMobileView;
};
