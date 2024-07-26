import React, { useState } from 'react';
import styled from 'styled-components';
import { BarraNavegacion } from '../components/BarraNavegacion';

const Publications = () => {
  const [like1, setLike1] = useState(0);
  const [like2, setLike2] = useState(0);

  const handleLike1 = () => setLike1(like1 + 1);
  const handleLike2 = () => setLike2(like2 + 1);

  return (
    <div>
    <BarraNavegacion />
      <br />
        <br />
        <br />
        <br />
        <br />
    <Container>
        <div>
        <Article>
          <SharedActor>
            <a href="#">
              <img src="/images/fotocv.jpg" alt="Profile" />
              <div>
                <h3>
                  Jorge Morais
                  <br />
                  <div>
                    <img src="/images/clock.png" alt="Clock" />
                    <span>about 1 day ago</span>
                    <img src="/images/language.png" alt="Public" />
                    <span>Public</span>
                  </div>
                </h3>
              </div>
              <button>
                <img src="/images/expand_more_black_24dp.svg" alt="Expand" />
              </button>
            </a>
          </SharedActor>
          <MessageBox>
            <span>This publication is public, everyone can see!</span>
          </MessageBox>
          <ActionsPub>
            <div>
              <img src="/images/like.png" alt="Like" />
              <span>
                <b>{like2}</b> likes
              </span>
            </div>
            
          </ActionsPub>
          <ArticleButtons>
            <button onClick={handleLike2}>
              <img src="/images/like.png" alt="Like" />
              <span>Like</span>
            </button>
            <button>
              <img src="/images/comente.png" alt="Comment" />
              <span>Comment</span>
            </button>
            <div>
              <span>55 comments</span>
              <span>12 shares</span>
            </div>
          </ArticleButtons>
        </Article>
        
      </div>
      <div>
        <Article>
          <SharedActor>
            <a href="#">
              <img src="/images/fotocv.jpg" alt="Profile" />
              <div>
                <h3>
                  Jorge Morais
                  <br />
                  <div>
                    <img src="/images/clock.png" alt="Clock" />
                    <span>about 1 day ago</span>
                    <img src="/images/language.png" alt="Public" />
                    <span>Public</span>
                  </div>
                </h3>
              </div>
              <button>
                <img src="/images/expand_more_black_24dp.svg" alt="Expand" />
              </button>
            </a>
          </SharedActor>
          <MessageBox>
            <span>This publication is public, everyone can see!</span>
          </MessageBox>
          <ActionsPub>
            <div>
              <img src="/images/like.png" alt="Like" />
              <span>
                <b>{like2}</b> likes
              </span>
            </div>
            
          </ActionsPub>
          <ArticleButtons>
            <button onClick={handleLike2}>
              <img src="/images/like.png" alt="Like" />
              <span>Like</span>
            </button>
            <button>
              <img src="/images/comente.png" alt="Comment" />
              <span>Comment</span>
            </button>
            <div>
              <span>55 comments</span>
              <span>12 shares</span>
            </div>
          </ArticleButtons>
        </Article>
        
      </div>
      <div>
        <Article>
          <SharedActor>
            <a href="#">
              <img src="/images/fotocv.jpg" alt="Profile" />
              <div>
                <h3>
                  Jorge Morais
                  <br />
                  <div>
                    <img src="/images/clock.png" alt="Clock" />
                    <span>about 1 day ago</span>
                    <img src="/images/language.png" alt="Public" />
                    <span>Public</span>
                  </div>
                </h3>
              </div>
              <button>
                <img src="/images/expand_more_black_24dp.svg" alt="Expand" />
              </button>
            </a>
          </SharedActor>
          <MessageBox>
            <span>This publication is public, everyone can see!</span>
          </MessageBox>
          <ActionsPub>
            <div>
              <img src="/images/like.png" alt="Like" />
              <span>
                <b>{like2}</b> likes
              </span>
            </div>
            
          </ActionsPub>
          <ArticleButtons>
            <button onClick={handleLike2}>
              <img src="/images/like.png" alt="Like" />
              <span>Like</span>
            </button>
            <button>
              <img src="/images/comente.png" alt="Comment" />
              <span>Comment</span>
            </button>
            <div>
              <span>55 comments</span>
              <span>12 shares</span>
            </div>
          </ArticleButtons>
        </Article>
        
      </div>
      <div>
      <MoreButton>More</MoreButton>
      </div>
    </Container>
    </div>
  );
};

const Container = styled.div`
  grid-area: main;
  width :75%;
  margin: 0 auto;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 0 0 rgb(0, 0, 0, 0.20);
`;



const Article = styled(CommonCard)`
  padding: 0;
  margin: 18px 0 18px;
  overflow: visible;
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;
    justify-content: space-between;
    align-items: center;

    img {
      width: 48px;
      height: 48px;
      border: 2px solid #000;
      border-radius: 50%;
    }
    & > div {
      display: flex;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      justify-content: column;

      h3 {
        text-align: left;
        font-size: 18px;
        font-weight: 800;
        color: #5ab2da;

        div {
          display: flex;
          align-items: center;
        }
        img {
          width: 16px;
          height: 16px;
          border: none;
          margin-right: 2px;
        }
        span {
          margin-left: 0px;
          margin-right: 15px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.4);
          align-items: center;
        }
      }
    }
  }

  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;

    &:hover {
      background-color: rgba(0, 0, 0, 0.09);
    }
    img {
      border: none;
      width: 24px;
      height: 24px;
    }
  }
`;

const MessageBox = styled.div`
  font-family: Arial;
  font-size: 16px;
  display: flex;
  padding: 10px;
  margin-left: 8px;
  text-align: left;
  color: rgba(0, 0, 0, 0.5);
`;

const ActionsPub = styled.div`
  display: flex;
  justify-content: space-between;
  color: rgba(0, 0, 0, 0.5);
  align-items: center;
  margin-right: 10px;
  padding: 0px 8px 16px 16px;

  img {
    border: none;
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }
  div {
    display: flex;
    span {
      margin-right: 8px;
    }
  }
`;
const MoreButton = styled.button`
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #0073b1;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #005582;
  }
`;

const ArticleButtons = styled.div`
  display: flex;
  justify-content: space-around;
  text-decoration: none;
  button {
    text-align: center;
    padding: 5px 36px;
    margin-bottom: 16px;
    border: none;
    border-radius: 20px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.09);
    }

    img {
      border: none;
      width: 16px;
      height: 16px;
      margin-right: 6px;
    }
  }
`;

export default Publications;
