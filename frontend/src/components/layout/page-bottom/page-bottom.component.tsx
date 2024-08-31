/**
 * @prettier
 */

/* component, style imports */
import { Footer } from './page-bottom.styles';

/*
 * component - TODO - add functionality description
 */
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
