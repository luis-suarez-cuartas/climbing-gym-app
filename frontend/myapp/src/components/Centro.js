/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

const flexStyles = css`
  display: flex;
  justify-content: center;
  margin: 50px auto;
  max-width: 1200px;
  gap: 20px;

  img {
    height: 450px;
  }
`;

const columnStyles = css`
  display: flex;
  flex-direction: column;

  .description {
    max-width: 550px;
    margin-bottom: 30px;
  }
`;

  

export function GrowthSection() {
  return (
    <section css={flexStyles}>
      <div css={columnStyles}>
        <h4>Growth & ROI</h4>
        <h1>Make your images Relevant</h1>
        <h3 className="description">
          Use URL parameters to deliver dynamic & personalized images. Works
          perfectly for email marketing campaigns, E-commerce stores, or blogs
          at scale..
        </h3>
      </div>
      <div>
        <img src="/ipad.png" alt="" />
      </div>
    </section>
  );
}
