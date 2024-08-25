/**
 * @prettier
 */

import { Footer } from './page-bottom.styles';

export const PageBottom = () => {
  return (
    <>
      <div></div>
      <Footer>
        <p>
          {'\u00A9'} 2024 - {new Date().getFullYear().toString()}
        </p>
        <p>built with reactjs, spring boot, redis, psql and ❤️</p>
      </Footer>
    </>
  );
};
