/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const footerStyles = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #191a1d;
  gap: 50px;

  .footersection {
    margin-top: 50px;
    margin-bottom: 10px;
    max-width: 1400px;
  }

  .socials {
    margin-top: 0px;
    margin-bottom: 50px;
    display: flex;
    justify-content: space-between;
    gap: 250px;

    div {
      display: flex;
      gap: 5px;

      p {
        color: #d0d0d0;
      }

      .clickable {
        color: #d0d0d0;
        margin-right: 25px;

        :hover {
          color: white;
        }
      }

      img {
        margin-left: 16px;

        :hover {
          filter: brightness(40%);
        }
      }

      .hearth {
        margin-left: 30px;
      }
    }
  }

  .options {
    display: flex;
    justify-content: center;
    margin-top: 0px;
    max-width: 1400px;

    .hire {
      ::after {
        content: url(/hire.png);
        margin-left: 8px;
      }
    }

    ul {
      width: 210px;
      min-width: 100px;
      list-style: none;
    }

    h6 {
      font-family: 'Poppins', sans-serif;
      color: white;
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 14px;
    }

    p {
      color: #d0d0d0;
      font-size: 16px;
      font-weight: 400;
      margin-top: 8px;
      margin-bottom: 8px;

      :hover {
        color: white;
      }
    }
  }
`;

export function PiePagina() {
  return (
    <div css={footerStyles}>
      <section className="footersection">
        <div className="options">
          <ul>
            <li>
              <p>Pricing</p>
            </li>
            <li>
              <p>Request a Demo</p>
            </li>
            <li>
              <p>Abyssal Studio</p>
            </li>
            <li>
              <p>Changelog</p>
            </li>
            <li>
              <p>Try for Free</p>
            </li>
          </ul>
          <ul>
            <li>
              <h6>Product</h6>
            </li>
            <li>
              <p>Automation</p>
            </li>
            <li>
              <p>Editor</p>
            </li>
            <li>
              <p>Spreadsheet</p>
            </li>
            <li>
              <p>Dynamic Image</p>
            </li>
          </ul>
          <ul>
            <li>
              <h6>Industries</h6>
            </li>
            <li>
              <p>E-commerce</p>
            </li>
            <li>
              <br />
            </li>
            <li>
              <h6>Solutions</h6>
            </li>
            <li>
              <p>For Marketing Teams</p>
            </li>
            <li>
              <p>For Enterprise</p>
            </li>
          </ul>
          <ul>
            <li>
              <h6>Integrations</h6>
            </li>
            <li>
              <p>Zapier</p>
            </li>
          
            <li>
              <p>Airtable</p>
            </li>
            <li>
              <p>All Integrations</p>
            </li>
          </ul>
          <ul>
            <li>
              <h6>Resources</h6>
            </li>
            <li>
              <p>Help Center</p>
            </li>
            <li>
              <p>Blog</p>
            </li>
            <li>
              <p>Case Studies</p>
            </li>
            <li>
              <p>FB Community</p>
            </li>
            <li>
              <p>
                <br />
              </p>
            </li>
            <li>
              <h6>Company</h6>
            </li>
            <li>
              <p>About Us</p>
            </li>
            <li>
              <p className="hire">Careers</p>
            </li>
            <li>
              <p>Become an affiliate</p>
            </li>
          </ul>
        </div>
      </section>
      
    </div>
  );
}
