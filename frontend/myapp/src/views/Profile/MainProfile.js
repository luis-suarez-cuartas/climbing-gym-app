import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getUserPublications } from '../../services/publication';
import moment from 'moment';

const MainProfile = () => {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    getUserPublications()
      .then(data => {
        setPublications(data);
      })
      .catch(error => {
        console.error('Error fetching user publications:', error);
      });
  }, []);

  return (
    <Container>
      {publications && Array.isArray(publications) && publications.length > 0 ? (
        publications.map(pub => (
          <Article key={pub.id}>
            <SharedActor>
              <button>
                <img src="/imagenes/profile.jpg" alt="Profile" />
                <div>
                  <h3>
                    {pub.user_name || 'Unknown User'}
                    <br />
                    <div>
                      <img src="/imagenes/clock.png" alt="Clock" />
                      <span>{moment(pub.created_at).fromNow()}</span>
                      <img src={pub.is_public ? "/imagenes/language.png" : "/imagenes/unlock.png"} alt={pub.is_public ? "Public" : "Private"} />
                      <span>{pub.is_public ? "Public" : "Just me"}</span>
                    </div>
                  </h3>
                </div>
              </button>
            </SharedActor>
            <MessageBox>
              <span>{pub.training_name || 'No content available'}</span>
            </MessageBox>
            <ActionsPub>
              <div>
                <img src="/imagenes/like.png" alt="Like" />
                <span>
                  <b>0</b> likes
                </span>
              </div>
            </ActionsPub>
            <ArticleButtons>
              <button>
                <img src="/imagenes/like.png" alt="Like" />
                <span>Like</span>
              </button>
              <button>
                <img src="/imagenes/comente.png" alt="Comment" />
                <span>Comment</span>
              </button>
              <div>
                  <span>0 comments</span>
                  <span>0 shares</span>
                </div>
            </ArticleButtons>
          </Article>
        ))
      ) : (
        <p>No publications available</p>
      )}
    </Container>
  );
};

const Container = styled.div`
  grid-area: main;
  background-color: #FFFFFF;  /* Fondo gris oscuro */
  padding: 20px;  /* Añadido padding para un mejor aspecto */
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #FFFFFF;  /* Color naranja brillante */
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 0 0 rgb(0, 0, 0, 0.20);
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 18px 0 18px;
  overflow: visible;
  background-color: #E5E8E8;
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  button {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;
    justify-content: space-between;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
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
        color: #000;  /* Nombre del usuario en negro */
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

const ArticleButtons = styled.div`
  display: flex;
  justify-content: space-around;
  text-decoration: none;
  button {
    text-align: center;
    padding: 5px 36px;
    margin-bottom: 16px;
     
    background-color: #FF9966;
    border: none;
    border-radius: 20px;
    &:hover {
      background-color: #005582;
    }

    img {
      border: none;
      width: 16px;
      height: 16px;
      margin-right: 6px;
    }
  }
`;

export default MainProfile;
